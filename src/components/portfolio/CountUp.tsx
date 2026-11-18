import { useCountUp, useInView } from "./hooks";

/**
 * Animates a metric string like "93.85%", "22K+", "0.879" or "203" from 0 up to
 * its exact value once it scrolls into view. Prefix/suffix text is kept as-is.
 */
export function parseMetric(value: string) {
  const m = value.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const num = m[2]!.replace(/,/g, "");
  const decimals = num.includes(".") ? num.split(".")[1]!.length : 0;
  return { prefix: m[1]!, target: Number(num), decimals, suffix: m[3]!, grouped: m[2]!.includes(",") };
}

export function formatMetric(n: number, decimals: number, grouped: boolean) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

export function CountUp({ value, className, duration }: { value: string; className?: string; duration?: number }) {
  const parsed = parseMetric(value);
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const v = useCountUp(parsed?.target ?? 0, inView, duration);
  if (!parsed) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true" className="tabular-nums">
        {parsed.prefix}
        {formatMetric(v, parsed.decimals, parsed.grouped)}
        {parsed.suffix}
      </span>
    </span>
  );
}
