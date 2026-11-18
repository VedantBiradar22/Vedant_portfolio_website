import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/vedant-portrait.jpg";
import { profile } from "./data";
import { usePrefersReducedMotion, useTypewriter } from "./hooks";

function AnimatedWord({ word, start }: { word: string; start: number }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((ch, i) => (
        <span
          key={i}
          className="animate-letter"
          style={{ "--delay": `${start + i * 45}ms` } as CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function SliceCounter() {
  const [n, setN] = useState(1);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let d = 1;
    const id = setInterval(() => {
      setN((v) => {
        if (v + d > 24 || v + d < 1) d = -d;
        return v + d;
      });
    }, 210);
    return () => clearInterval(id);
  }, [reduced]);
  return <>{String(n).padStart(2, "0")} / 24</>;
}

const chips = [
  { label: "TensorFlow", pos: "-left-6 top-[18%]", delay: 0 },
  { label: "Computer Vision", pos: "-right-8 top-[42%]", delay: 1200 },
  { label: "Python", pos: "-left-4 bottom-[16%]", delay: 2400 },
];

export function Hero() {
  const role = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative flex min-h-screen items-center pt-24 pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-40 size-[520px] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-[420px] rounded-full bg-warm/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div
            className="animate-rise mb-8 inline-flex items-center gap-3 rounded-full border border-border glass py-1.5 pr-4 pl-2 text-sm"
            style={{ "--delay": "100ms" } as CSSProperties}
          >
            <span className="relative flex items-center gap-2 rounded-full bg-warm/15 px-2.5 py-0.5 font-mono text-xs text-warm">
              <span className="animate-pulse-ring size-1.5 rounded-full bg-warm" />
              NOW
            </span>
            <span className="text-muted-foreground">
              {profile.role} at <span className="text-foreground">{profile.companyShort}</span>
            </span>
          </div>

          <h1 className="text-[clamp(3.2rem,9vw,7rem)] leading-[0.95] font-semibold">
            <AnimatedWord word={profile.firstName} start={200} />
            <br />
            <span className="animate-letter" style={{ "--delay": "520ms" } as CSSProperties}>
              <span className="text-gradient">{profile.lastName}</span>
            </span>
          </h1>

          <p
            className="animate-rise mt-8 flex h-8 items-center font-mono text-lg text-primary md:text-xl"
            style={{ "--delay": "900ms" } as CSSProperties}
            aria-label={profile.roles.join(", ")}
          >
            <span className="mr-2 text-muted-foreground">&gt;</span>
            <span aria-hidden="true">{role}</span>
            <span className="animate-blink ml-0.5 inline-block h-6 w-2.5 bg-primary" aria-hidden="true" />
          </p>

          <p
            className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={{ "--delay": "1050ms" } as CSSProperties}
          >
            B.Tech CSE (AI &amp; ML) graduate who builds and ships{" "}
            <span className="text-foreground">end-to-end ML solutions</span> — from medical imaging
            that helps detect cancer to vision models that sort waste. Now engineering production
            software at Technomold.
          </p>

          <div
            className="animate-rise mt-10 flex flex-wrap gap-3"
            style={{ "--delay": "1200ms" } as CSSProperties}
          >
            <Button asChild variant="hero" size="xl">
              <a href="#projects">
                View my work <ArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={profile.resume} download>
                <Download /> Download resume
              </a>
            </Button>
          </div>

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-5 text-sm text-muted-foreground"
            style={{ "--delay": "1350ms" } as CSSProperties}
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-primary">
              <Github className="size-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-primary">
              <Linkedin className="size-5" />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-primary">
              <Mail className="size-5" />
            </a>
            <span className="h-4 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" /> {profile.location}
            </span>
          </div>
        </div>

        {/* Portrait in an "MRI scanner" frame */}
        <div
          className="animate-rise relative mx-auto w-full max-w-[380px]"
          style={{ "--delay": "500ms" } as CSSProperties}
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-glow">
            <img
              src={portrait}
              alt="Portrait of Vedant Biradar"
              className="absolute inset-0 size-full object-cover"
              width={900}
              height={1125}
              fetchPriority="high"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[repeating-linear-gradient(0deg,color-mix(in_oklab,var(--primary)_9%,transparent)_0_1px,transparent_1px_12px)]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div
              aria-hidden="true"
              className="scan-sweep absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_24px_8px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
            />
            {/* corner brackets */}
            {["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute size-6 border-primary ${c}`} />
            ))}
            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between font-mono text-[11px] text-primary">
              <span className="rounded bg-background/80 px-2 py-1">
                SLICE <SliceCounter />
              </span>
              <span className="rounded bg-background/80 px-2 py-1">AUC 0.879</span>
            </div>
          </div>

          {chips.map((c) => (
            <span
              key={c.label}
              className={`animate-float glass absolute hidden rounded-full border border-border px-3.5 py-1.5 font-mono text-xs text-foreground shadow-glow sm:block ${c.pos}`}
              style={{ "--delay": `${c.delay}ms` } as CSSProperties}
            >
              <span className="mr-1.5 text-primary">●</span>
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase transition-colors hover:text-primary md:flex"
      >
        Scroll
        <ArrowDown className="animate-float size-4" />
      </a>
    </section>
  );
}
