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
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <div
            className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pr-4 pl-3 text-sm shadow-soft"
            style={d(0)}
          >
            <span className="animate-ping-soft size-2 rounded-full bg-success" />
            <span className="text-muted-foreground">
              {profile.role} at{" "}
              <span className="font-medium text-foreground">{profile.companyShort}</span>
            </span>
          </div>

          <h1 className="animate-rise mt-8 text-[clamp(3.25rem,8vw,6.5rem)] leading-[0.95]" style={d(120)}>
            Vedant
            <br />
            Biradar<span className="text-primary">.</span>
          </h1>

          <p className="animate-rise mt-6 font-display text-3xl leading-tight md:text-4xl" style={d(240)}>
            Building{" "}
            <span className="relative inline-block">
              <em key={word} className="animate-word inline-block text-primary italic">
                {word}
              </em>
            </span>{" "}
            software with AI.
          </p>

          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground" style={d(360)}>
            Associate Software Engineer and B.Tech CSE (AI &amp; ML) graduate. I build end-to-end
            ML solutions, from MRI-based cancer detection to vision models that sort waste, and I
            now ship production software at Technomold.
          </p>

          <div className="animate-rise mt-10 flex flex-wrap gap-3" style={d(480)}>
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
            className="animate-rise mt-10 flex flex-wrap items-center gap-5 text-sm text-muted-foreground"
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
                className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" /> {profile.location}
            </span>
          </div>
        </div>

        {/* Portrait */}
        <div className="animate-rise relative mx-auto w-full max-w-[400px] lg:mr-0" style={d(200)}>
          <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-muted shadow-lift">
            <img
              src={portrait}
              alt="Portrait of Vedant Biradar"
              className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              width={900}
              height={1125}
              fetchPriority="high"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:-left-8">
            <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
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
