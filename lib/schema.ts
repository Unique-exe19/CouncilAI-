import { z } from "zod";

export const RiskItemSchema = z.object({
  risk: z.string(),
  severity: z.enum(["Low", "Medium", "High"]),
  mitigation: z.string(),
});

export const AgentStanceSchema = z.object({
  agent: z.enum(["CEO", "CFO", "CTO", "CMO"]),
  stance: z.enum(["Support", "Oppose", "Conditional"]),
  keyPoint: z.string(),
});

export const ActionItemSchema = z.object({
  task: z.string(),
  owner: z.enum(["CEO", "CFO", "CTO", "CMO"]),
  timeline: z.string(),
  priority: z.enum(["High", "Medium", "Low"]),
});

export const ExecutiveReportSchema = z.object({
  decisionSummary: z.string(),
  verdict: z.enum(["Go", "No-Go", "Conditional Go"]),
  confidenceScore: z.number().min(0).max(100),
  consensusSummary: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  risks: z.array(RiskItemSchema),
  agentStances: z.array(AgentStanceSchema),
  actionItems: z.array(ActionItemSchema),
  nextStep: z.string(),
});

export type ExecutiveReport = z.infer<typeof ExecutiveReportSchema>;
export type RiskItem = z.infer<typeof RiskItemSchema>;
export type AgentStance = z.infer<typeof AgentStanceSchema>;
export type ActionItem = z.infer<typeof ActionItemSchema>;
