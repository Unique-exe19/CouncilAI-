import { describe, it, expect } from "vitest";
import { cn } from "../lib/utils";

describe("cn Utility Function", () => {
  it("combines class names and merges tailwind duplicates", () => {
    const result = cn("px-2 py-1", "bg-red-500", "px-4");
    expect(result).toContain("bg-red-500");
    expect(result).toContain("px-4");
    expect(result).not.toContain("px-2");
  });
});
