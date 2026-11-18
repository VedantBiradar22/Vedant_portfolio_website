import { useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Award,
  Brain,
  Briefcase,
  Check,
  Code2,
  Copy,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  certifications,
  hackathons,
  marquee,
  profile,
  projects,
  skillGroups,
  stats,
  timeline,
  type Project,
} from "./data";
import { spotlightHandler, useCountUp, useInView } from "./hooks";
import { Reveal, SectionHeading } from "./Reveal";

/* ---------------- Stats ---------------- */
function Stat({ s, start, i }: { s: (typeof stats)[number]; start: boolean; i: number }) {
  const v = useCountUp(s.value, start);
  return (
    <div
      className="reveal bg-card/90 p-8"
      data-in={start}
      style={{ "--delay": `${i * 120}ms` } as CSSProperties}
    >
      <strong className="block font-display text-5xl font-semibold text-primary tabular-nums">
        {v.toLocaleString("en-US", {
          minimumFractionDigits: s.decimals,
          maximumFractionDigits: s.decimals,
        })}
        {s.suffix}
      </strong>
      <span className="mt-2 block text-sm text-muted-foreground">{s.label}</span>
    </div>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div
        ref={ref}
        className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((s, i) => (
          <Stat key={s.label} s={s} start={inView} i={i} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- About ---------------- */
const highlights = [
  { icon: Brain, title: "Deep learning", text: "CNNs, ResNet, BiLSTM and transfer learning." },
  { icon: Sparkles, title: "Computer vision", text: "Medical imaging and image classification." },
  { icon: Layers, title: "End-to-end", text: "From raw data to a deployed web app." },
  { icon: Trophy, title: "Fast builder", text: "Three 24-hour hackathons shipped." },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        kicker="About me"
        title={
          <>
            Engineer by role, <span className="text-gradient">AI builder</span> by passion.
          </>
        }
      />
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            I&apos;m <span className="text-foreground">Vedant Biradar</span>, an{" "}
            <span className="text-foreground">Associate Software Engineer at Technomold IT Solutions</span>{" "}
            in Hyderabad. I graduated in 2026 with a B.Tech in Computer Science &amp; Engineering
            (AI &amp; ML) from Vignan Institute of Technology and Science.
          </p>
          <p>
            My strongest work sits at the intersection of{" "}
            <span className="text-foreground">deep learning and computer vision</span> — I led a team
            that built a prostate cancer detection system on MRI scans, and trained a CNN on 22,000+
            images to automate waste sorting.
          </p>
          <p>
            I care about models that are not just accurate but usable: deployed, explainable and
            built with a team. I adapt quickly, communicate clearly, and never stop learning.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 100}>
              <div
                onMouseMove={spotlightHandler}
                className="spotlight group h-full rounded-2xl border border-border p-6 transition-transform duration-500 hover:-translate-y-1"
              >
                <h.icon className="mb-5 size-6 text-primary transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mb-1.5 font-sans text-base font-semibold tracking-normal">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience ---------------- */
const kindIcon = { work: Briefcase, intern: Sparkles, edu: GraduationCap };

export function Experience() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-32">
      <SectionHeading kicker="Journey" title="Experience & education" />
      <div ref={ref} className="relative">
        <div className="absolute top-0 bottom-0 left-[19px] w-px bg-border md:left-1/2" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="bg-gradient-primary absolute top-0 left-[19px] w-px origin-top transition-transform duration-[2000ms] ease-out md:left-1/2"
          style={{ height: "100%", transform: `scaleY(${inView ? 1 : 0})` }}
        />
        <div className="space-y-14">
          {timeline.map((t, i) => {
            const Icon = kindIcon[t.kind];
            const right = i % 2 === 1;
            return (
              <div key={t.title} className="relative grid md:grid-cols-2 md:gap-16">
                <span
                  className={cn(
                    "absolute top-6 left-0 z-10 grid size-10 place-items-center rounded-full border bg-background md:left-1/2 md:-translate-x-1/2",
                    t.current ? "animate-pulse-ring border-warm text-warm" : "border-primary/50 text-primary",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <Reveal
                  delay={100}
                  className={cn("pl-16 md:pl-0", right ? "md:col-start-2" : "md:text-right")}
                >
                  <div
                    onMouseMove={spotlightHandler}
                    className="spotlight rounded-2xl border border-border p-7 text-left"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-primary">{t.period}</span>
                      {t.current && (
                        <span className="rounded-full bg-warm/15 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-warm uppercase">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.org}</p>
                    <ul className="mt-4 space-y-2 text-[15px] text-muted-foreground">
                      {t.points.map((p) => (
                        <li key={p} className="flex gap-2.5">
                          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {(t.tags || t.link) && (
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {t.tags?.map((tag) => (
                          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                        {t.link && (
                          <a
                            href={t.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            {t.link.label} <ArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
function ProjectCard({ p }: { p: Project }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <Reveal>
      <article
        onMouseMove={(e) => {
          spotlightHandler(e);
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({
            x: ((e.clientY - r.top) / r.height - 0.5) * -3,
            y: ((e.clientX - r.left) / r.width - 0.5) * 3,
          });
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        className="spotlight group overflow-hidden rounded-3xl border border-border p-8 transition-transform duration-300 ease-out md:p-12"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-8 font-display text-[8rem] md:text-[10rem] leading-none font-semibold text-foreground/[0.04] transition-colors duration-500 group-hover:text-primary/10"
        >
          {p.index}
        </span>
        <div className="relative flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary px-3 py-0.5 font-mono text-xs font-semibold text-primary-foreground">
            Project {p.index}
          </span>
          <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
        </div>
        <h3 className="relative mt-5 text-4xl font-semibold md:text-5xl">{p.title}</h3>
        <p className="relative mt-2 text-muted-foreground">{p.subtitle}</p>
        <p className="relative mt-6 max-w-3xl text-lg leading-relaxed">{p.summary}</p>

        <div className="relative mt-10 grid gap-10 border-y border-border py-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h4 className="mb-4 font-mono text-xs tracking-[0.2em] text-primary uppercase">
              How it works
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-mono text-xs tracking-[0.2em] text-primary uppercase">Results</h4>
            <div className="grid grid-cols-3 gap-3">
              {p.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-background/40 p-4">
                  <strong className="block font-display text-2xl font-semibold text-gradient md:text-3xl">
                    {m.value}
                  </strong>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
          <Button asChild variant="glass">
            <a href={p.github} target="_blank" rel="noopener noreferrer">
              <Github /> View on GitHub
            </a>
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-32">
      <SectionHeading
        kicker="Selected work"
        title={
          <>
            Projects that turn <span className="text-gradient">pixels into decisions</span>.
          </>
        }
      />
      <div className="space-y-10">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
const skillIcon = { code: Code2, brain: Brain, wrench: Wrench, layers: Layers, sparkles: Sparkles };

export function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Toolkit" title="Skills & technologies" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = skillIcon[g.icon];
            return (
              <Reveal key={g.title} delay={i * 80} className={cn(i === 4 && "sm:col-span-2 lg:col-span-1")}>
                <div
                  onMouseMove={spotlightHandler}
                  className="spotlight h-full rounded-2xl border border-border p-7"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-sans text-base font-semibold tracking-normal">{g.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="cursor-default rounded-full border border-border bg-background/40 px-3.5 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <div className="mask-fade-x mt-20 overflow-hidden border-y border-border py-6" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-12 font-display text-3xl text-muted-foreground md:text-4xl">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              {m}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Hackathons & Certifications ---------------- */
export function Achievements() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <SectionHeading kicker="Beyond the classroom" title="Hackathons & certifications" />
      <div className="grid gap-4 md:grid-cols-3">
        {hackathons.map((h, i) => (
          <Reveal key={h.name} delay={i * 100}>
            <div
              onMouseMove={spotlightHandler}
              className="spotlight h-full rounded-2xl border border-border p-7 transition-transform duration-500 hover:-translate-y-1"
            >
              <Trophy className="mb-6 size-6 text-warm" />
              <h3 className="text-2xl font-semibold">{h.name}</h3>
              <p className="mt-1 mb-4 font-mono text-xs text-primary">{h.meta}</p>
              <p className="text-[15px] text-muted-foreground">{h.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 80}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={spotlightHandler}
              className="spotlight group flex items-center gap-5 rounded-2xl border border-border p-6"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Award className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block font-medium">{c.name}</span>
                <span className="text-sm text-muted-foreground">{c.issuer}</span>
              </span>
              <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please select the email manually");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border p-10 md:p-16">
          <div aria-hidden="true" className="bg-gradient-primary absolute -top-32 -right-32 size-96 rounded-full opacity-20 blur-3xl" />
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-50" />
          <div className="relative">
            <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-primary uppercase">
              <span className="h-px w-10 bg-primary" /> Get in touch
            </p>
            <h2 className="max-w-3xl text-5xl leading-[1.02] font-semibold md:text-7xl">
              Have a role or project in mind? <span className="text-gradient">Let&apos;s talk.</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-2xl font-semibold text-primary underline decoration-primary/40 underline-offset-8 transition-colors hover:decoration-primary md:text-4xl"
              >
                {profile.email}
              </a>
              <button
                onClick={copy}
                aria-label="Copy email address"
                className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <a href={`mailto:${profile.email}`}>
                  <Mail /> Email me
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin /> LinkedIn
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github /> GitHub
                </a>
              </Button>
              <Button asChild variant="glass" size="xl">
                <a href={profile.phoneHref}>
                  <Phone /> {profile.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Vedant Biradar · Hyderabad, India</span>
        <a href="#top" className="font-mono text-xs tracking-widest uppercase transition-colors hover:text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
