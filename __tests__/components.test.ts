import { describe, it, expect } from "vitest";
import { AGENTS } from "../lib/agents";

describe("C-Suite & Legal Persona Component Integrity", () => {
  it("provides valid colors and badge styles for each advisor persona", () => {
    Object.values(AGENTS).forEach((agent) => {
      expect(agent.id).toBeDefined();
      expect(agent.name).toBeDefined();
      expect(agent.title).toBeDefined();
      expect(agent.color.primary).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it("assigns appropriate icons for legal and executive roles", () => {
    expect(AGENTS.CEO.iconName).toBe("Crown");
    expect(AGENTS.CFO.iconName).toBe("Coins");
    expect(AGENTS.CTO.iconName).toBe("Zap");
    expect(AGENTS.CMO.iconName).toBe("Megaphone");
    expect(AGENTS.MODERATOR.iconName).toBe("Landmark");
  });
});
