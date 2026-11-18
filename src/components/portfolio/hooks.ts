import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Sets data-in="true" on the element once it scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    let t0: number | undefined;
    const tick = (t: number) => {
      t0 ??= t;
      const p = Math.min((t - t0) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);
  return value;
}

/** Cycles through words with a typewriter effect. */
export function useTypewriter(words: string[], speed = 70, pause = 1800) {
  const [text, setText] = useState(words[0] ?? "");
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) {
      setText(words[0] ?? "");
      return;
    }
    let wi = 0;
    let ci = words[0]?.length ?? 0;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const word = words[wi] ?? "";
      if (deleting) {
        ci--;
        if (ci <= 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      } else {
        ci++;
        const next = words[wi] ?? "";
        if (ci >= next.length) {
          deleting = true;
          setText(next);
          timer = setTimeout(step, pause);
          return;
        }
      }
      setText((deleting ? word : (words[wi] ?? "")).slice(0, Math.max(ci, 0)));
      timer = setTimeout(step, deleting ? speed / 2 : speed);
    };
    timer = setTimeout(step, pause);
    return () => clearTimeout(timer);
  }, [words, speed, pause, reduced]);
  return text;
}

/** Cursor-tracking spotlight: writes --mx / --my on the element. */
export function spotlightHandler(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
