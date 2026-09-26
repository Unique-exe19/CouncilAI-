import { describe, it, expect } from "vitest";
import { AGENTS } from "../lib/agents";

describe("AGENTS Configuration", () => {
  it("contains definitions for all 4 executives and the moderator", () => {
    expect(AGENTS.CEO).toBeDefined();
    expect(AGENTS.CFO).toBeDefined();
    expect(AGENTS.CTO).toBeDefined();
    expect(AGENTS.CMO).toBeDefined();
    expect(AGENTS.MODERATOR).toBeDefined();
  });

  it("enforces mandatory debate rules in executive system prompts", () => {
    expect(AGENTS.CFO.systemPrompt).toContain("math chain");
    expect(AGENTS.CEO.systemPrompt).toContain("ORIGINAL proposal");
    expect(AGENTS.CTO.systemPrompt).toContain("(assumption)");
    expect(AGENTS.CMO.systemPrompt).toContain("Do not concede unless");
  });
});
