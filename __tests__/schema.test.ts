import { describe, it, expect } from "vitest";
import { ExecutiveReportSchema } from "../lib/schema";

describe("ExecutiveReportSchema", () => {
  it("validates a complete executive consensus report correctly", () => {
    const validReport = {
      decisionSummary: "Pivot B2B SaaS from permanent free tier to 14-day free trial",
      verdict: "Conditional Go",
      confidenceScore: 88,
      consensusSummary: "Executive team agreed to a hybrid trial model.",
      pros: ["Higher conversion intent", "Reduced server load"],
      cons: ["Temporary signup friction"],
      risks: [
        {
          risk: "User churn during transition",
          severity: "Medium",
          mitigation: "Automated onboarding emails",
        },
      ],
      agentStances: [
        { agent: "CEO", stance: "Support", keyPoint: "Drives ARR growth" },
        { agent: "CFO", stance: "Conditional", keyPoint: "Payback must stay < 6 months" },
        { agent: "CTO", stance: "Support", keyPoint: "1 sprint implementation" },
        { agent: "CMO", stance: "Oppose", keyPoint: "Preserve organic virality" },
      ],
      actionItems: [
        { task: "Build trial banner", owner: "CMO", timeline: "3 Days", priority: "High" },
      ],
      nextStep: "Launch Sprint 14 for 14-day Pro trial gating",
    };

    const parsed = ExecutiveReportSchema.parse(validReport);
    expect(parsed.verdict).toBe("Conditional Go");
    expect(parsed.confidenceScore).toBe(88);
  });

  it("fails validation when confidenceScore is outside 0-100", () => {
    const invalidReport = {
      decisionSummary: "Test decision",
      verdict: "Go",
      confidenceScore: 150,
      consensusSummary: "Summary",
      pros: [],
      cons: [],
      risks: [],
      agentStances: [],
      actionItems: [],
      nextStep: "Step",
    };

    expect(() => ExecutiveReportSchema.parse(invalidReport)).toThrow();
  });
});
