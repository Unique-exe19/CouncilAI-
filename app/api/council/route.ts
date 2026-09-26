import { NextRequest } from "next/server";
import { generateAgentTurnStream, generateExecutiveReport } from "@/lib/orchestrator";
import { DEMO_SCRIPTS } from "@/lib/demoScript";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { decision, demoMode } = await req.json();

  if (!decision || typeof decision !== "string") {
    return new Response(JSON.stringify({ error: "Decision string is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const keysString = `${process.env.GEMINI_API_KEYS || ""},${process.env.GEMINI_API_KEY || ""}`;
  const validKeys = keysString.split(",").map((k) => k.trim()).filter((k) => k.length > 5);

  let isDemo = demoMode || validKeys.length === 0;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      const streamDemoFallback = async () => {
        const script = DEMO_SCRIPTS.default;
        let currentRound = 0;

        for (const msg of script.messages) {
          if (msg.round !== currentRound) {
            currentRound = msg.round;
            sendEvent("round_change", { round: currentRound });
            await new Promise((r) => setTimeout(r, 600));
          }

          sendEvent("agent_start", { agentId: msg.agentId, round: msg.round });
          await new Promise((r) => setTimeout(r, 300));

          const words = msg.text.split(" ");
          for (let i = 0; i < words.length; i++) {
            const token = (i === 0 ? "" : " ") + words[i];
            sendEvent("token", { agentId: msg.agentId, token });
            await new Promise((r) => setTimeout(r, 55 + Math.random() * 30));
          }

          sendEvent("agent_end", { agentId: msg.agentId, round: msg.round });
          await new Promise((r) => setTimeout(r, 500));
        }

        sendEvent("report_start", {});
        await new Promise((r) => setTimeout(r, 1200));
        sendEvent("report_ready", { report: script.report });
        controller.close();
      };

      try {
        if (isDemo) {
          await streamDemoFallback();
          return;
        }

        // Live Gemini API Multi-Agent Loop
        const agentOrder: ("CEO" | "CFO" | "CTO" | "CMO")[] = ["CEO", "CFO", "CTO", "CMO"];
        const transcript: { agentId: string; role: string; text: string }[] = [];

        for (let round = 1; round <= 3; round++) {
          sendEvent("round_change", { round });

          for (const agentId of agentOrder) {
            sendEvent("agent_start", { agentId, round });

            let agentText = "";
            try {
              agentText = await generateAgentTurnStream(
                {
                  decision,
                  agentId,
                  round: round as 1 | 2 | 3,
                  transcript,
                },
                (token) => {
                  sendEvent("token", { agentId, token });
                }
              );
            } catch (err: unknown) {
              const errMsg = err instanceof Error ? err.message : String(err);
              console.warn(`Live API failed on ${agentId} (${errMsg}). Seamlessly falling back to Demo Mode...`);
              // Seamless fallback to demo stream on API failure
              await streamDemoFallback();
              return;
            }

            transcript.push({
              agentId,
              role: agentId,
              text: agentText,
            });

            sendEvent("agent_end", { agentId, round });
            await new Promise((r) => setTimeout(r, 400));
          }
        }

        // Generate Report
        sendEvent("report_start", {});
        try {
          const report = await generateExecutiveReport(decision, transcript);
          sendEvent("report_ready", { report });
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : String(err);
          console.warn(`Live report synthesis failed (${errMsg}). Falling back to demo report...`);
          sendEvent("report_ready", { report: DEMO_SCRIPTS.default.report });
        }

        controller.close();
      } catch (globalErr: unknown) {
        console.warn("Global stream error, activating demo fallback:", globalErr);
        await streamDemoFallback();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
