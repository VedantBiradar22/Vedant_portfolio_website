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
import { useCountUp, useInView } from "./hooks";
import { Em, Reveal, SectionHeading } from "./Reveal";

/* ---------------- Stats ---------------- */
function Stat({ s, start, i }: { s: (typeof stats)[number]; start: boolean; i: number }) {
  const v = useCountUp(s.value, start);
  return (
    <div
      className="reveal bg-card p-7 md:p-8"
      data-in={start}
      style={{ "--delay": `${i * 100}ms` } as CSSProperties}
    >
      <strong className="block font-display text-5xl font-normal tabular-nums md:text-6xl">
        {v.toLocaleString("en-US", {
          minimumFractionDigits: s.decimals,
          maximumFractionDigits: s.decimals,
        })}
        <span className="text-primary">{s.suffix}</span>
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
        className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-soft sm:grid-cols-2 lg:grid-cols-4"
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
  { icon: Layers, title: "End-to-end delivery", text: "From raw data to a deployed web app." },
  { icon: Trophy, title: "Builds fast", text: "Three 24-hour hackathons shipped." },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <SectionHeading
        index="01"
        kicker="About"
        title={
          <>
            Engineer by role, <Em>AI builder</Em> by passion.
          </>
        }
      />
      <div className="grid gap-12 md:grid-cols-[200px_1fr] md:gap-10">
        <div className="hidden md:block" />
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I&apos;m <span className="text-foreground">Vedant Biradar</span>, an{" "}
              <span className="text-foreground">
                Associate Software Engineer at Technomold IT Solutions
              </span>{" "}
              in Hyderabad. I graduated in 2026 with a B.Tech in Computer Science &amp; Engineering
              (AI &amp; ML) from Vignan Institute of Technology and Science.
            </p>
            <p>
              My strongest work sits where{" "}
              <span className="text-foreground">deep learning meets computer vision</span>: I led
              a team that built a prostate cancer detection system on MRI scans, and trained a CNN
              on 22,000+ images to automate waste sorting.
            </p>
            <p>
              I care about models that are not just accurate but usable, meaning deployed,
              explainable and built with a team. I adapt quickly, communicate clearly, and keep
              learning.
            </p>
          </Reveal>
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="card-lift h-full rounded-2xl border border-border p-5">
                  <h.icon className="mb-4 size-5 text-primary" />
                  <h3 className="mb-1 font-sans text-[15px] font-medium tracking-normal">
                    {h.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience ---------------- */
const kindIcon = { work: Briefcase, intern: Sparkles, edu: GraduationCap };

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="02"
        kicker="Experience"
        title={
          <>
            Experience &amp; <Em>education</Em>
          </>
        }
      />
      <div className="divide-y divide-border border-y border-border">
        {timeline.map((t, i) => {
          const Icon = kindIcon[t.kind];
          return (
            <Reveal key={t.title} delay={i * 60}>
              <article className="group grid gap-4 py-10 md:grid-cols-[200px_1fr] md:gap-10">
                <div className="flex items-start gap-3 md:flex-col md:gap-4">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-full border",
                      t.current
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{t.period}</p>
                    {t.current && (
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                        <span className="size-1.5 rounded-full bg-success" /> Current role
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl transition-colors group-hover:text-primary md:text-4xl">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-muted-foreground">{t.org}</p>
                  <ul className="mt-5 max-w-3xl space-y-2.5 text-[15px] text-muted-foreground">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {(t.tags || t.link) && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {t.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {t.link && (
                        <a
                          href={t.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline ml-2 inline-flex items-center gap-1 text-sm text-primary"
                        >
                          {t.link.label} <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */
function ProjectCard({ p }: { p: Project }) {
  return (
    <Reveal>
      <article className="card-lift group overflow-hidden rounded-3xl border border-border">
        <div className="grid lg:grid-cols-[1.35fr_1fr]">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="text-primary">{p.index}</span>
              <span className="h-px w-8 bg-border" />
              <span>{p.year}</span>
            </div>
            <h3 className="mt-5 text-4xl md:text-5xl">{p.title}</h3>
            <p className="mt-2 text-muted-foreground">{p.subtitle}</p>
            <p className="mt-6 text-lg leading-relaxed">{p.summary}</p>
            <ul className="mt-8 space-y-3 text-[15px] text-muted-foreground">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-8 border-t border-border bg-muted p-8 md:p-12 lg:border-t-0 lg:border-l">
            <div>
              <p className="mb-5 font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
                Results
              </p>
              <div className="space-y-5">
                {p.metrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between border-b border-border pb-4">
                    <span className="text-sm text-muted-foreground">{m.label}</span>
                    <strong className="font-display text-4xl font-normal">{m.value}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Button asChild variant="glass">
                <a href={p.github} target="_blank" rel="noopener noreferrer">
                  <Github /> View on GitHub
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="03"
        kicker="Selected work"
        title={
          <>
            Projects that turn <Em>pixels into decisions</Em>.
          </>
        }
        aside={
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            All repositories <ArrowUpRight className="size-4" />
          </a>
        }
      />
      <div className="space-y-8">
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
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          kicker="Toolkit"
          title={
            <>
              Skills &amp; <Em>technologies</Em>
            </>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = skillIcon[g.icon];
            return (
              <Reveal key={g.title} delay={i * 70} className={cn(i === 4 && "sm:col-span-2 lg:col-span-1")}>
                <div className="card-lift h-full rounded-2xl border border-border p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-primary-soft text-primary">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="font-sans text-[15px] font-medium tracking-normal">{g.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm text-foreground/80"
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
        <div className="animate-marquee flex w-max gap-10 font-display text-3xl text-muted-foreground italic md:text-4xl">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m}
              <span className="text-xl text-primary not-italic">·</span>
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
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        index="05"
        kicker="Recognition"
        title={
          <>
            Hackathons &amp; <Em>certifications</Em>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {hackathons.map((h, i) => (
          <Reveal key={h.name} delay={i * 80}>
            <div className="card-lift h-full rounded-2xl border border-border p-7">
              <div className="mb-8 flex items-center justify-between">
                <Trophy className="size-5 text-primary" />
                <span className="font-mono text-xs text-muted-foreground">{h.meta}</span>
              </div>
              <h3 className="text-3xl">{h.name}</h3>
              <p className="mt-3 text-[15px] text-muted-foreground">{h.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 60}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift group flex items-center gap-4 rounded-2xl border border-border p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                <Award className="size-4" />
              </span>
              <span className="flex-1">
                <span className="block font-medium">{c.name}</span>
                <span className="text-sm text-muted-foreground">{c.issuer}</span>
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
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
      toast.error("Couldn't copy. Please select the email manually.");
    }
  };

  return (
    <section id="contact" className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] text-ink-muted uppercase">
            06 / Contact
          </p>
          <h2 className="mt-8 max-w-4xl text-5xl leading-[1.02] md:text-7xl">
            Have a role or project in mind? <em className="italic text-ink-muted">Let&apos;s talk.</em>
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="link-underline font-display text-3xl md:text-5xl"
            >
              {profile.email}
            </a>
            <button
              onClick={copy}
              aria-label="Copy email address"
              className="grid size-10 place-items-center rounded-full border border-ink-border text-ink-muted transition-colors hover:border-ink-foreground/60 hover:text-ink-foreground"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Button asChild variant="ink" size="xl">
              <a href={`mailto:${profile.email}`}>
                <Mail /> Email me
              </a>
            </Button>
            <Button asChild variant="inkOutline" size="xl">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin /> LinkedIn
              </a>
            </Button>
            <Button asChild variant="inkOutline" size="xl">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github /> GitHub
              </a>
            </Button>
            <Button asChild variant="inkOutline" size="xl">
              <a href={profile.phoneHref}>
                <Phone /> {profile.phone}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink text-ink-muted">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm">
        <span>© {new Date().getFullYear()} Vedant Biradar · Hyderabad, India</span>
        <a href="#top" className="link-underline transition-colors hover:text-ink-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
