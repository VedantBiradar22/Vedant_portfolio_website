import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems, profile } from "./data";

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-border/60" : "border-b border-transparent",
      )}
    >
      <div
        className="bg-gradient-primary absolute top-0 left-0 h-0.5"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid size-9 place-items-center rounded-xl border border-primary/40 font-display text-sm font-semibold text-primary transition-transform duration-500 group-hover:rotate-[360deg]">
            VB
          </span>
          <span className="font-display text-lg font-semibold">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {n.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-500",
                    active === n.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="glass" size="sm" className="h-9 px-4">
            <a href={profile.resume} download>
              <Download /> Resume
            </a>
          </Button>
        </div>

        <button
          className="grid size-10 place-items-center rounded-full border border-border md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "glass overflow-hidden border-b border-border transition-[max-height] duration-500 md:hidden",
          open ? "max-h-96" : "max-h-0 border-transparent",
        )}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-lg font-display hover:bg-muted"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} download className="block px-3 py-3 text-primary">
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
