import type { CSSProperties } from "react";
import { ArrowRight, Briefcase, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/vedant-portrait.jpg";
import { profile } from "./data";
import { useRotatingIndex } from "./hooks";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const wi = useRotatingIndex(profile.heroWords.length);
  const word = profile.heroWords[wi] ?? profile.heroWords[0];

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div aria-hidden="true" className="cyber-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="glow-orb pointer-events-none absolute -top-40 right-0 size-[640px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.35fr_1fr] lg:gap-20">
        {/* Text — left */}
        <div className="order-2 md:order-1">
          <div
            className="animate-rise inline-flex items-center gap-2.5 rounded-md border border-border bg-card/80 py-1.5 pr-3.5 pl-3 font-mono text-xs"
            style={d(0)}
          >
            <span className="animate-ping-soft size-2 rounded-full bg-success" />
            <span className="text-muted-foreground">
              status: <span className="text-success">online</span> · {profile.role} @{" "}
              <span className="text-foreground">{profile.companyShort}</span>
            </span>
          </div>

          <h1 className="animate-rise mt-7 text-[clamp(3rem,7vw,5.75rem)] leading-[0.95]" style={d(120)}>
            Vedant
            <br />
            <span className="text-primary">Biradar</span>
            <span className="text-muted-foreground">_</span>
          </h1>

          <p className="animate-rise mt-6 font-mono text-lg md:text-xl" style={d(240)}>
            <span className="text-muted-foreground">&gt; building </span>
            <span key={word} className="animate-word inline-block text-primary">
              {word}
            </span>
            <span className="text-muted-foreground"> software with AI</span>
          </p>

          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground" style={d(360)}>
            Associate Software Engineer and B.Tech CSE (AI &amp; ML) graduate. I build end-to-end
            ML solutions, from MRI-based cancer detection to vision models that sort waste, and I
            now ship production software at Technomold.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap gap-3" style={d(480)}>
            <Button asChild variant="hero" size="xl">
              <a href="#projects">
                View my work <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={profile.resume} download>
                <Download /> Resume
              </a>
            </Button>
          </div>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            style={d(600)}
          >
            {[
              { href: profile.github, label: "GitHub", Icon: Github, ext: true },
              { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin, ext: true },
              { href: `mailto:${profile.email}`, label: "Email", Icon: Mail, ext: false },
            ].map(({ href, label, Icon, ext }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-10 place-items-center rounded-lg border border-border bg-card transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <MapPin className="size-4" /> {profile.location}
            </span>
          </div>
        </div>

        {/* Portrait — right */}
        <div
          className="animate-rise relative order-1 mx-auto w-full max-w-[300px] md:order-2 md:mr-0 md:max-w-[380px]"
          style={d(200)}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-primary/30 bg-muted shadow-lift">
            <img
              src={portrait}
              alt="Portrait of Vedant Biradar"
              className="size-full object-cover object-top"
              width={900}
              height={1125}
              fetchPriority="high"
            />
          </div>

          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-soft sm:-left-6">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary">
              <Briefcase className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                Currently
              </p>
              <p className="text-sm font-medium">{profile.companyShort}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
