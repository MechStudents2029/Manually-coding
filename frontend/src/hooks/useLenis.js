import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState, progressMV, lenisRef } from "../lib/scrollStore";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      scrollState.progress = p;
      progressMV.set(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
