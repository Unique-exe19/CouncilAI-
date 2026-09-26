import { describe, it, expect } from "vitest";
import { DEMO_SCRIPTS } from "../lib/demoScript";

describe("DEMO_SCRIPTS", () => {
  it("contains 12 structured messages across 3 debate rounds", () => {
    const script = DEMO_SCRIPTS.default;
    expect(script).toBeDefined();
    expect(script.messages.length).toBe(12);

    const round1 = script.messages.filter((m) => m.round === 1);
    const round2 = script.messages.filter((m) => m.round === 2);
    const round3 = script.messages.filter((m) => m.round === 3);

    expect(round1.length).toBe(4);
    expect(round2.length).toBe(4);
    expect(round3.length).toBe(4);
  });

  it("includes (assumption) labels and math chains in CFO messages", () => {
    const script = DEMO_SCRIPTS.default;
    const cfoRound1 = script.messages.find((m) => m.agentId === "CFO" && m.round === 1);
    expect(cfoRound1?.text).toContain("(assumption)");
    expect(cfoRound1?.text).toContain("×");
  });
});
