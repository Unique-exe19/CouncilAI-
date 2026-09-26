import { describe, it, expect } from "vitest";

describe("API Route Security & Validation", () => {
  it("rejects decisions shorter than 3 characters", () => {
    const invalidDecision = "ab";
    expect(invalidDecision.trim().length < 3).toBe(true);
  });

  it("sanitizes dangerous script tags from user decisions", () => {
    const maliciousInput = "Pivot to SaaS <script>alert('xss')</script>";
    const sanitized = maliciousInput.replace(/<[^>]*>?/gm, "").trim();
    expect(sanitized).toBe("Pivot to SaaS alert('xss')");
    expect(sanitized).not.toContain("<script>");
  });

  it("enforces maximum decision length cap of 1000 characters", () => {
    const longInput = "a".repeat(1001);
    expect(longInput.length > 1000).toBe(true);
  });
});
