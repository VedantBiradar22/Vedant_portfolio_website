import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./hooks";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: Props) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-in={inView}
      className={cn("reveal", className)}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ kicker, title }: { kicker: string; title: ReactNode }) {
  return (
    <Reveal className="mb-14">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-primary uppercase">
        <span className="h-px w-10 bg-primary" />
        {kicker}
      </p>
      <h2 className="max-w-3xl text-4xl leading-[1.05] font-semibold md:text-6xl">{title}</h2>
    </Reveal>
  );
}
