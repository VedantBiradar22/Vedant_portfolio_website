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
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
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
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled ? "glass border-border" : "border-transparent",
      )}
    >
      <div
        className="absolute bottom-0 left-0 h-px bg-primary"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid size-9 place-items-center rounded-lg border border-primary/50 bg-primary-soft font-mono text-sm font-semibold text-primary">
            VB
          </span>
          <span className="text-[15px] font-medium">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={cn(
                  "font-mono text-[13px] transition-colors",
                  active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="hero" size="sm" className="h-9 px-4">
            <a href={profile.resume} download>
              <Download /> Resume
            </a>
          </Button>
        </div>

        <button
          className="grid size-10 place-items-center rounded-full border border-border bg-card md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden bg-background transition-[max-height] duration-500 md:hidden",
          open ? "max-h-96 border-b border-border" : "max-h-0",
        )}
      >
        <ul className="flex flex-col px-6 py-3">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-3 font-display text-xl"
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} download className="block py-3 text-primary">
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
