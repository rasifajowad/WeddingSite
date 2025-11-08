"use client";

import React, { useEffect, useRef } from "react";

// Brand palette
const brand = {
  bg: "#f3f2f1",
  paper: "#fdfdfb",
  green: "#284135",
  gray: "#999790",
  line: "#c3c2c0",
};

// Small helpers
const Entitled = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <div
      className="uppercase font-medium"
      style={{
        color: brand.green,
        fontSize: "0.9vw",
        lineHeight: "1.4vw",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </div>
  </div>
);

const UnderlineLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} className="relative inline-block" target="_blank" rel="noreferrer">
    <span className="relative z-[1]">{children}</span>
    <span
      aria-hidden
      className="absolute left-0 right-0 bottom-[0.25rem] h-[2px]"
      style={{ background: brand.green, opacity: 0.9 }}
    />
  </a>
);

// Simple rotating dodeca via CSS (no extra deps)
const RotatingDodeca = ({ size = 78 }: { size?: number }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg
      viewBox="0 0 234 234"
      className="absolute inset-0"
      style={{
        animation: "spin 10s linear infinite",
      }}
    >
      <polygon
        points="117,1 175,16.6 217.5,59 233,117 217.5,175 175,217.5 117,233 59,217.5 16.6,175 1,117 16.6,59 59,16.6"
        fill="none"
        stroke={brand.line}
        strokeWidth={1}
      />
    </svg>
    <svg viewBox="0 0 234 234" className="absolute inset-0">
      <polygon
        points="117,1 175,16.6 217.5,59 233,117 217.5,175 175,217.5 117,233 59,217.5 16.6,175 1,117 16.6,59 59,16.6"
        fill="none"
        stroke={brand.green}
        strokeWidth={1}
        opacity={0.7}
      />
    </svg>
    <style jsx>{`
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

export default function WeddingSite() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.background = brand.bg;

    // ---------- Smooth scroll (Lenis) ----------
    let lenis: any = null;
    let rafId: number | null = null;

    const startSmooth = async () => {
      try {
        const { default: Lenis } = await import("@studio-freight/lenis");
        lenis = new Lenis({
          lerp: 0.1, // easing strength
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          // our parallax raf also runs here
          tick();
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Fallback if lenis not present — still run our parallax tick
        const raf = () => {
          tick();
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      }
    };

    // ---------- Parallax ----------
    const items = Array.from(
      (rootRef.current || document).querySelectorAll<HTMLElement>("[data-speed]")
    );
    let lastY = -1;

    const tick = () => {
      const y = window.scrollY || 0;
      if (y === lastY) return;
      lastY = y;

      for (const el of items) {
        const speed = parseFloat(el.dataset.speed || "0");
        // Use translate3d for GPU compositing
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        el.style.willChange = "transform";
      }
    };

    startSmooth();

    // Also update on resize (layout shifts)
    const onResize = () => tick();
    window.addEventListener("resize", onResize, { passive: true });

    // Initial paint
    tick();

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy?.();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full min-h-screen overflow-x-hidden"
      style={{ color: brand.green, fontFamily: "ui-sans-serif, system-ui" }}
    >
      {/* ============== NAV ============== */}
      <nav
        id="nav"
        className="fixed inset-0 pointer-events-none select-none z-30"
        aria-label="Primary"
      >
        {/* top-left logo-ish mark */}
        <div
          id="nav-logo-w"
          className="nav-top pointer-events-auto"
          style={{ left: "2.78vw" }}
        >
          <div style={{ fontSize: "0.9vw", lineHeight: "1.4vw" }}>T / A</div>
        </div>

        {/* top-right date */}
        <div
          id="nav-date-w"
          className="nav-top pointer-events-auto"
          style={{ right: "2.61vw" }}
        >
          <div style={{ fontSize: "0.9vw", lineHeight: "1.4vw" }}>09 / Jan</div>
        </div>

        {/* rotated link rail */}

        <div className="pointer-events-auto"
          style={{
            position: "absolute",
            left: "3.39vw",
            bottom: "2.67vw",
            transform: "rotate(-90deg)",
            transformOrigin: "0 0",
            display: "flex",
            gap: "4.4vh",
            fontSize: "0.8vw",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}>
            <a href="#venue" className="hover:opacity-80">
              DHAKA
            </a>
        </div>

        <ul
          id="nav-link-w"
          className="pointer-events-auto"
          style={{
            position: "absolute",
            left: "3.39vw",
            bottom: "15vw",
            transform: "rotate(-90deg)",
            transformOrigin: "0 0",
            display: "flex",
            gap: "4.4vh",
            fontSize: "0.8vw",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          <li>
            <a href="#rsvp" className="hover:opacity-80">
              RSVP
            </a>
          </li>
          <li>
            <a href="#registry" className="hover:opacity-80">
              REGISTRY
            </a>
          </li>
          <li>
            <a href="#gallery" className="hover:opacity-80">
              GALLERY
            </a>
          </li>
        </ul>
      </nav>

      {/* ============== HERO ============== */}
      <header id="hero" className="relative h-screen select-none">
        {/* hero image (parallax: gentle) */}
        <img
          id="h-hero-img"
          data-speed="0.06"
          alt="Hero Placeholder"
          src="/wedding/hero.png"
          className="absolute object-cover"
          style={{
            right: 0,
            bottom: "20vh",
            width: "83.33vw",
            maxWidth: "130vh",
            opacity: "0.2"
          }}
        />

        {/* title (slightly stronger parallax) */}
        <h1
          data-speed="0.1"
          className="absolute z-10"
          style={{
            top: "37vh",
            left: "26.6vw",
            fontFamily: "serif",
            fontWeight: 600,
            fontSize: "7.8vw",
            lineHeight: "7.8vw",
            letterSpacing: "-0.04vw",
            color: brand.green,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <span className="block">Reception on</span>
          <span className="block">Friday.</span>
        </h1>

        {/* scroll hint */}
        <div
          className="absolute bottom-[3.5vw] right-[4.1vw] text-right overflow-hidden"
          style={{ letterSpacing: "0.04em" }}
        >
          <div className="uppercase font-medium">SCROLL DOWN</div>
        </div>

        {/* little rotating mark (bottom-left region) */}
        <div className="absolute bottom-[3.9vw] left-[20.8vw]">
          <RotatingDodeca />
        </div>
      </header>

      {/* ============== SECTION 1 (DATE / INVITE / BIG NUMBERS) ============== */}
      <section
        id="intro"
        className="relative"
        // style={{ height: "238vw", background: brand.bg }}
        style={{ height: "30vw", background: brand.bg }}
      >
        {/* THE DATE */}
        <div className="absolute" style={{ top: "3vw", left: "41.6vw" }}>
          <Entitled>THE DATE</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <h2
            className="mt-[2.05vw]"
            style={{
              fontFamily: "serif",
              fontSize: "2.66vw",
              lineHeight: "3vw",
              letterSpacing: "-0.08vw",
              color: brand.green,
            }}
          >
            <div>Friday</div>
            <div>January 09</div>
            <div>2026</div>
          </h2>
        </div>

        {/* THE INVITE */}
        <div className="absolute" style={{ top: "14.1vw", left: "62.5vw", width: "16.6vw" }}>
          <Entitled>THE INVITE</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <p className="mt-[2.33vw]" style={{ color: brand.gray, fontSize: "1.1vw", lineHeight: "1.6vw" }}>
            Join the reception of Tanisha & Ajowad as they embark on a new journey of fulfillment.
          </p>
          <div className="mt-[1vw]">
            <UnderlineLink href="#rsvp">RSVP</UnderlineLink>
          </div>
        </div>

        {/* Decorative BIG NUMBERS (parallax in opposite directions) */}
        {/* <ul
          className="absolute font-bold select-none"
          style={{
            fontSize: "22.2vw",
            lineHeight: "22.2vw",
            color: "transparent",
            WebkitTextStrokeColor: brand.line,
            WebkitTextStrokeWidth: 1 as any,
          }}
        >
          <li
            id="h-s1-no-0"
            data-speed="-0.08"
            className="absolute"
            style={{ top: "29.4vw", left: "20.38vw" }}
          >
            10
          </li>
          <li
            id="h-s1-no-1"
            data-speed="0.06"
            className="absolute"
            style={{ top: "115.94vw", right: "8.83vw" }}
          >
            14
          </li>
          <li
            id="h-s1-no-2"
            data-speed="-0.12"
            className="absolute"
            style={{ top: "151.66vw", left: "20.38vw" }}
          >
            19
          </li>
        </ul> */}

        {/* Captions (each with its own speed) */}
        {/* <ul className="absolute" style={{ fontSize: "0.9vw", lineHeight: "1.3vw", color: brand.gray }}>
          <li
            id="h-s1-caption-0"
            data-speed="-0.04"
            className="absolute"
            style={{ top: "140.1vw", left: "41.66vw" }}
          >
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>
              Sep 8, 2019
            </span>
            <span>She said he was crazy.</span>
          </li>
          <li
            id="h-s1-caption-1"
            data-speed="0.1"
            className="absolute"
            style={{ top: "88.72vw", left: "8.33vw" }}
          >
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>
              Lake Louise
            </span>
            <span>He asked her to marry him.</span>
          </li>
          <li
            id="h-s1-caption-2"
            data-speed="0.06"
            className="absolute"
            style={{ top: "168.38vw", left: "8.33vw" }}
          >
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>
              3:40PM
            </span>
            <span>She said yes.</span>
          </li>
          <li
            id="h-s1-caption-3"
            data-speed="-0.06"
            className="absolute"
            style={{ top: "211.88vw", left: "41.66vw" }}
          >
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>
              Oct 14, 2019
            </span>
            <span>We get married.</span>
          </li>
        </ul> */}

        {/* Gallery button (non-parallax) */}
        {/* <div
          id="gallery"
          className="absolute flex items-center justify-center"
          style={{ bottom: 0, left: "41.66vw", width: "13vw", height: "13vw" }}
        >
          <div className="absolute inset-0">
            <RotatingDodeca />
          </div>
          <Entitled>GALLERY</Entitled>
        </div>
        <div
          className="absolute"
          style={{
            bottom: "5.05vw",
            left: "62.5vw",
            color: brand.gray,
            width: "10vw",
            fontSize: "0.9vw",
          }}
        >
          Click & hold to see more of our adventures together.
        </div> */}
      </section>

      {/* ============== SECTION 2 (KIB / VENUE / IMAGES) ============== */}
      <section
        id="venue"
        className="relative"
        style={{ height: "80vw", background: brand.bg }}
      >
        {/* left scenic (moves faster) */}
        <img
          id="h-s2-img-0"
          data-speed="-0.12"
          className="absolute object-cover"
          style={{ top: "15.44vw", left: "5vw", width: "80.05vw", opacity: "0.2" }}
          src="/wedding/scenic-0.png"
          alt="Scenic Placeholder 0"
        />
        {/* right scenic (moves slower) */}
        <img
          id="h-s2-img-1"
          data-speed="0.06"
          className="absolute object-cover"
          style={{ top: "50.5vw", right: "54vw", width: "40vw", opacity: "0.2" }}
          src="/wedding/scenic-1.png"
          alt="Scenic Placeholder 1"
        />

        {/* Reception Title (gentle parallax) */}
        <h2
          data-speed="0.04"
          className="absolute"
          style={{
            top: "11.11vw",
            left: "41.44vw",
            fontFamily: "serif",
            fontSize: "6vw",
            lineHeight: "6vw",
            letterSpacing: "-0.3vw",
            color: brand.green,
            fontWeight: 600,
          }}
        >
          <div className="text-slate-600/40">Reception of</div>
          <div>Tanisha & Ajowad</div>
          <div className="text-slate-600/40">in Dhaka</div>
        </h2>

        {/* THE VENUE */}
        <div className="absolute" style={{ top: "39.94vw", left: "20.83vw" }}>
          <Entitled>THE VENUE</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <a href="https://www.google.com/maps/place/Krishibid+Institution+Bangladesh/@23.7591392,90.3856797,19.75z/data=!4m6!3m5!1s0x3755b8a648794c3d:0xf21993d3715834cd!8m2!3d23.7594236!4d90.385476!16s%2Fg%2F11f00cw9gf?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D" 
                target="_blank" rel="noreferrer">
            <h3
              className="mt-[2.05vw]"
              style={{
                fontFamily: "serif",
                fontSize: "2.66vw",
                lineHeight: "3vw",
                letterSpacing: "-0.08vw",
              }}
            >
              <div>KIB Complex</div>
              <div>Khamarbari Rd.</div>
              <div>Dhaka - 1215</div>
            </h3>
          </a>
          <div className="mt-[1vw]">
            <UnderlineLink href="">
              KIB Complex
            </UnderlineLink>
          </div>
        </div>

        {/* PARKING */}
        <div className="absolute" style={{ top: "51.05vw", left: "41.66vw" }}>
          <Entitled>PARKING</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <h3
            className="mt-[2.05vw]"
            style={{
              fontFamily: "serif",
              fontSize: "2.66vw",
              lineHeight: "3vw",
              letterSpacing: "-0.08vw",
            }}
          >
            <div>Available</div>
            <div>for 50+ Vehicles</div>
          </h3>
          <div className="mt-[1vw]">
            <p
            className="mt-[1vw]"
            style={{ color: brand.gray, fontSize: "0.9vw", lineHeight: "1.3vw" }}
          >
            Although the general area is congested.
            </p>
            <p
            className="mt-[1vw]"
            style={{ color: brand.gray, fontSize: "0.9vw", lineHeight: "1.3vw" }}
          >
            We Suggest Taking an Uber to Avoid the Hassle.
            </p>
          </div>
        </div>

        {/* Dress Code */}
        <div className="absolute" style={{ top: "62.16vw", left: "62.5vw", width: "16.6vw" }}>
          <Entitled>Dress Code</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <p className="mt-[2.33vw]" style={{ color: brand.gray, fontSize: "1.1vw", lineHeight: "1.6vw" }}>
            Anything Formal yet Comfortable
          </p>
          <h3
            className="mt-[1.2vw]"
            style={{
              fontFamily: "serif",
              fontSize: "2.66vw",
              lineHeight: "3vw",
              letterSpacing: "-0.08vw",
            }}
          >
            <div>Suits/Jackets</div>
            <div>Shirts/Polos</div>
            <div>Sarees</div>
          </h3>
          <div className="mt-[1vw]">
            <UnderlineLink href="">
              Just Suggestions
            </UnderlineLink>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer
        className="relative -mt-px"
        style={{ height: "40.22vw", background: brand.paper }}
      >
        <ul>
          <li className="absolute top-[8.33vw] left-[41.66vw]" id="rsvp">
            <Entitled>REMINDER</Entitled>
            <div
              className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
              style={{ background: brand.line }}
            />
            <div
              className="mt-[2.05vw]"
              style={{
                fontFamily: "serif",
                fontSize: "2.66vw",
                lineHeight: "3vw",
                letterSpacing: "-0.08vw",
              }}
            >
              <div>Friday</div>
              <div>January 09</div>
              <div>2026</div>
            </div>
            <div className="mt-[1vw]">
              <UnderlineLink href="#">RSVP</UnderlineLink>
            </div>
          </li>
        </ul>

        <div className="absolute bottom-[3.5vw] left-[41.66vw] cursor-pointer">
          <Entitled>SCROLL UP</Entitled>
        </div>
      </footer>

      {/* Inline nav CSS to match reference placements */}
      <style jsx global>{`
        #nav {
          position: fixed;
          z-index: 3;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .nav-top {
          position: absolute;
          top: 2.78vw;
          text-align: center;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
