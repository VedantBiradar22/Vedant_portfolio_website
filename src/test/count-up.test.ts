import { describe, expect, it } from "vitest";
import { formatMetric, parseMetric } from "@/components/portfolio/CountUp";

// The count-up animation must finish on the exact number shown in the resume.
describe("count-up metrics stop at the exact value", () => {
  for (const value of ["93.85%", "22K+", "0.879", "203", "3", "2"]) {
    it(`ends on ${value}`, () => {
      const p = parseMetric(value)!;
      expect(`${p.prefix}${formatMetric(p.target, p.decimals, p.grouped)}${p.suffix}`).toBe(value);
    });
  }

  it("starts from zero with the same decimals", () => {
    const p = parseMetric("0.879")!;
    expect(formatMetric(0, p.decimals, p.grouped)).toBe("0.000");
  });
});
