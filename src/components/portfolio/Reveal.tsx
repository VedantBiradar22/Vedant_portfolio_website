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

export function SectionHeading({
  index,
  kicker,
  title,
  aside,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="mb-14 grid gap-6 border-t border-border pt-8 md:grid-cols-[200px_1fr] md:gap-10">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
        <span className="text-primary">// {index}</span> {kicker}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-3xl text-4xl leading-[1.05] md:text-6xl">{title}</h2>
        {aside}
      </div>
    </Reveal>
  );
}

/** Accent words inside headings. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}
