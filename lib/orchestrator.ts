import { GoogleGenerativeAI } from "@google/generative-ai";
import { AGENTS } from "./agents";
import { ExecutiveReportSchema, ExecutiveReport } from "./schema";

export interface TurnContext {
  decision: string;
  agentId: "CEO" | "CFO" | "CTO" | "CMO";
  round: 1 | 2 | 3;
  transcript: { agentId: string; role: string; text: string }[];
}

/**
 * Extracts all valid API keys from environment variables (comma-separated or single)
 */
function getApiKeys(): string[] {
  const keysStr = `${process.env.GEMINI_API_KEYS || ""},${process.env.GEMINI_API_KEY || ""}`;
  return keysStr
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 5);
}

/**
 * Standard, 100% verified Gemini API models (prioritizing active models like gemini-3.6-flash & gemini-3.5-flash)
 */
function getCandidateModels(): string[] {
  const envModel = process.env.GEMINI_MODEL?.trim();
  const baseModels = [
    "gemini-3.5-flash",
    "gemini-3.6-flash",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ];
  if (envModel) {
    return Array.from(new Set([envModel, ...baseModels]));
  }
  return baseModels;
}

export async function generateAgentTurnStream(
  context: TurnContext,
  onToken: (token: string) => void
): Promise<string> {
  const keys = getApiKeys();
  if (keys.length === 0) {
    throw new Error("No valid GEMINI_API_KEY found in environment variables.");
  }

  const agent = AGENTS[context.agentId];

  const prompt = `
[DECISION UNDER DEBATE]: "${context.decision}"
[CURRENT DEBATE STAGE]: Round ${context.round} of 3 (${
    context.round === 1
      ? "Opening pitch"
      : context.round === 2
      ? "Rebuttals & pushback on specific points made by other executives"
      : "Final verdict stance (Support / Oppose / Conditional)"
  })

[BOARDROOM TRANSCRIPT SO FAR]:
${
  context.transcript.length === 0
    ? "No previous statements. You are giving the opening pitch."
    : context.transcript
        .map((t) => `${t.role} (${t.agentId}): ${t.text}`)
        .join("\n\n")
}

Now provide your Round ${context.round} statement as ${agent.name} (${agent.title}).
Keep it under 65 words, conversational, sharp, and address other agents by name where applicable.

[CRITICAL BOARDROOM RULES]:
1. ROUND 3 STANCE: If this is Round 3, your statement MUST explicitly declare your stance on the ORIGINAL proposal (Support / Oppose / Conditional). If you propose an alternative, state your stance on the original proposal FIRST before describing the alternative.
2. CONCESSIONS & CHANGING MIND: Do NOT concede or change your position unless another executive raised a NEW argument or specific data point. You MUST explicitly name who and what changed your mind (e.g. "Because Arthur pointed out the payback delay...").
3. NUMBERS & ASSUMPTIONS: Any numeric metric (percentage, dollar figure, multiplier, headcount, timeline) you cite MUST be explicitly labeled with "(assumption)" (e.g., "$350 CAC (assumption)", "12% conversion (assumption)") UNLESS it was given in the original user decision text. Numbers must be internally consistent with prior transcript statements.
${
  context.agentId === "CFO"
    ? "4. CFO MANDATORY MATH CHAIN: As CFO (Arthur Sterling), you MUST state your explicit financial math chain (signups × conversion × price) before stating your conclusion."
    : "4. FINANCIAL ACCOUNTABILITY: Respect financial data cited by CFO (Arthur Sterling)."
}
5. DISSENT IN ROUND 3: ${
  context.round === 3
    ? "Maintain executive independence. At least one agent in this boardroom MUST remain Oppose or Conditional in Round 3."
    : "Debate vigorously with your peers."
}
`;

  let lastError: Error | null = null;

  // Key rotation loop
  for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
    const apiKey = keys[keyIdx];

    // Model fallback loop
    const candidateModels = getCandidateModels();
    for (const modelName of candidateModels) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: agent.systemPrompt,
        });

        const responseStream = await model.generateContentStream(prompt);
        let fullText = "";

        // Consume stream inside try block
        for await (const chunk of responseStream.stream) {
          const textChunk = chunk.text();
          fullText += textChunk;
          onToken(textChunk);
        }

        if (fullText.trim().length > 0) {
          return fullText;
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        lastError = err instanceof Error ? err : new Error(errMsg);
        console.warn(`Key #${keyIdx + 1} model ${modelName} failed: ${errMsg.substring(0, 90)}. Fallback...`);
      }
    }
  }

  throw lastError || new Error("All Gemini API keys and models exhausted.");
}

export async function generateExecutiveReport(
  decision: string,
  transcript: { agentId: string; role: string; text: string }[]
): Promise<ExecutiveReport> {
  const keys = getApiKeys();
  if (keys.length === 0) {
    throw new Error("No valid GEMINI_API_KEY found in environment variables.");
  }

  const prompt = `
You are the Boardroom Moderator. Analyze the following 3-round multi-agent debate and synthesize a final Executive Consensus Report in strict JSON format.

[DECISION ANALYZED]: "${decision}"

[BOARDROOM DEBATE TRANSCRIPT]:
${transcript.map((t) => `${t.role} (${t.agentId}): ${t.text}`).join("\n\n")}

Respond ONLY with a JSON object conforming to this exact schema:
{
  "decisionSummary": "string describing the decision",
  "verdict": "Go" | "No-Go" | "Conditional Go",
  "confidenceScore": number (0 to 100),
  "consensusSummary": "1-2 paragraph executive summary of the consensus reached",
  "pros": ["bullet 1", "bullet 2", "bullet 3"],
  "cons": ["bullet 1", "bullet 2"],
  "risks": [
    { "risk": "risk description", "severity": "Low"|"Medium"|"High", "mitigation": "mitigation plan" }
  ],
  "agentStances": [
    { "agent": "CEO", "stance": "Support"|"Oppose"|"Conditional", "keyPoint": "core point" },
    { "agent": "CFO", "stance": "Support"|"Oppose"|"Conditional", "keyPoint": "core point" },
    { "agent": "CTO", "stance": "Support"|"Oppose"|"Conditional", "keyPoint": "core point" },
    { "agent": "CMO", "stance": "Support"|"Oppose"|"Conditional", "keyPoint": "core point" }
  ],
  "actionItems": [
    { "task": "task title", "owner": "CEO"|"CFO"|"CTO"|"CMO", "timeline": "e.g. 1 Week", "priority": "High"|"Medium"|"Low" }
  ],
  "nextStep": "Immediate single actionable next step"
}
`;

  let lastError: Error | null = null;

  for (let keyIdx = 0; keyIdx < keys.length; keyIdx++) {
    const apiKey = keys[keyIdx];

    const candidateModels = getCandidateModels();
    for (const modelName of candidateModels) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const jsonModel = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: "application/json" },
        });

        const response = await jsonModel.generateContent(prompt);
        const text = response.response.text();
        const parsedJson = JSON.parse(text);
        return ExecutiveReportSchema.parse(parsedJson);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        lastError = err instanceof Error ? err : new Error(errMsg);
        console.warn(`Report generation Key #${keyIdx + 1} (${modelName}) failed: ${errMsg.substring(0, 90)}`);
      }
    }
  }

  throw lastError || new Error("Failed to synthesize report across all Gemini keys and models.");
}
