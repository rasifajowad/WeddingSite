"use client";

import { RefObject, useEffect } from "react";

type Options = {
  isMobile: boolean;
  prefersReduced: boolean;
};

export default function useSmoothParallax(
  rootRef: RefObject<HTMLElement>,
  { isMobile, prefersReduced }: Options
) {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number | null = null;

    const startSmooth = async () => {
      try {
        const { default: Lenis } = await import("@studio-freight/lenis");
        lenis = new Lenis({
          lerp: isMobile ? 0.12 : 0.1,
          smoothWheel: true,
          wheelMultiplier: isMobile ? 0.6 : 0.9,
        } as any);

        const raf = (time: number) => {
          lenis?.raf(time);
          tick();
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        const raf = () => {
          tick();
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }
    };

    const rootEl: HTMLElement | Document = rootRef.current || document;
    let items = Array.from(
      (rootEl as any).querySelectorAll<HTMLElement>("[data-speed]")
    );
    let lastY = -1;
    const scale = prefersReduced ? 0 : isMobile ? 0.4 : 1;

    const tick = () => {
      const y = window.scrollY || 0;
      if (y === lastY) return;
      lastY = y;

      for (const el of items) {
        const base = parseFloat(el.dataset.speed || "0");
        el.style.transform = `translate3d(0, ${y * base * scale}px, 0)`;
        el.style.willChange = "transform";
      }
    };

    startSmooth();

    const onResize = () => tick();
    const onScroll = () => tick();
    window.addEventListener("resize", onResize, { passive: true } as any);
    window.addEventListener("scroll", onScroll, { passive: true } as any);
    // Refresh item list shortly after mount to capture any late-mounted nodes
    const refreshTimer = setTimeout(() => {
      items = Array.from((rootEl as any).querySelectorAll<HTMLElement>("[data-speed]"));
      tick();
    }, 50);
    tick();

    return () => {
      window.removeEventListener("resize", onResize as any);
      window.removeEventListener("scroll", onScroll as any);
      clearTimeout(refreshTimer);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy?.();
    };
  }, [rootRef, isMobile, prefersReduced]);
}
