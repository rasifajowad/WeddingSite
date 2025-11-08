"use client";

import React, { useEffect, useRef, useState } from "react";
import Entitled from "./ui/Entitled";
import UnderlineLink from "./ui/UnderlineLink";
import RotatingDodeca from "./ui/RotatingDodeca";
import useIsMobile from "../hooks/useIsMobile";
import useSmoothParallax from "../hooks/useSmoothParallax";
import RSVPModal from "./ui/RSVPModal";

// Brand palette
const brand = {
  bg: "#f3f2f1",
  paper: "#fdfdfb",
  green: "#284135",
  gray: "#999790",
  line: "#c3c2c0",
};

export default function WeddingSite() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile(768);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [rsvpOpen, setRsvpOpen] = useState(false);

  useEffect(() => {
    document.body.style.background = brand.bg;
  }, []);

  useSmoothParallax(rootRef as any, { isMobile, prefersReduced });

  useEffect(() => {
    const el = document.documentElement;
    if (rsvpOpen) {
      const prev = el.style.overflow;
      el.style.overflow = "hidden";
      return () => { el.style.overflow = prev; };
    }
  }, [rsvpOpen]);

  const openRSVP: React.MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    setRsvpOpen(true);
  };

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
        {/* rotated link rail */}

        <div id="nav-rail" className="pointer-events-auto"
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
        {/* rotated single RSVP link centered on left */}
        <div
          id="nav-rsvp"
          className="pointer-events-auto"
          style={{
            position: "absolute",
            left: "3.39vw",
            top: "50%",
            transform: "rotate(-90deg) translateX(-50%)",
            transformOrigin: "0 0",
            display: "flex",
            gap: "2vh",
            fontSize: "0.8vw",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          <a href="#rsvp" onClick={openRSVP} className="hover:opacity-80">RSVP</a>
        </div>
      </nav>

      {/* Floating/fixed marks, outside nav */}
      <div id="marks" className="fixed inset-0 pointer-events-none z-30">
        <div id="mark-logo" className="text-center overflow-hidden" style={{ position: "absolute", top: "2.78vw", left: "2.78vw" }}>
          <img src="./favicon.ico" style={{maxWidth: "50px"}} />
          {/* <div className="nav-logo-text">T/A</div> */}
        </div>
        <div id="mark-date" className="text-center overflow-hidden" style={{ position: "absolute", top: "2.78vw", right: "2.61vw" }}>
          <div className="nav-logo-text">09/Jan</div>
        </div>
      </div>

      {/* Mobile floating RSVP button */}
      <a id="rsvp-fab" href="#rsvp" onClick={openRSVP}>
        RSVP
      </a>

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
        {/* Title + subtitle wrapper to maintain stacking on mobile */}
        <div
          id="hero-title-wrap"
          data-speed="0.1"
          className="absolute z-10"
          style={{
            top: "37vh",
            left: "26.6vw",
            color: brand.green,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <h1 className="hero-title heading-serif heading-xl">
            <span className="block">Reception on</span>
            <span className="block">Friday.</span>
          </h1>

          {/* hero subtitle date (brand-styled) */}
          <div id="hero-date" className="hero-date">
            <span className="hero-date-chip">Jan 9</span>
            <span className="hero-date-sep" aria-hidden>
              •
            </span>
            <span className="hero-date-year">2026</span>
          </div>
        </div>

        {/* scroll hint */}
        <div
          className="scroll-hint absolute bottom-[3.5vw] right-[4.1vw] text-right overflow-hidden"
          style={{ letterSpacing: "0.04em" }}
        >
          <div className="uppercase font-medium">SCROLL DOWN</div>
        </div>

        {/* little rotating mark (bottom-left region) */}
        <div className="absolute bottom-[3.9vw] left-[20.8vw]">
          <RotatingDodeca size={isMobile ? 48 : 78} />
        </div>
      </header>

      {/* ============== SECTION 1 (DATE / INVITE / BIG NUMBERS) ============== */}
      <section
        id="intro"
        className="relative"
        style={{ height: "43vw", background: brand.bg }}
      >
        
        {/* THE DATE */}
        <div id="intro-date" className="absolute" style={{ top: 0, left: "41.6vw" }}>
          <Entitled>THE DATE</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <h2 className="mt-[2.05vw] font-extrabold heading-serif heading-md" style={{ color: brand.green }}>
            <div>Friday</div>
            <div>January 09</div>
            <div>2026</div>
          </h2>
        </div>

        {/* Background Arabic verse (brand-styled, parallax) */}
        <div
          id="intro-bg-ar"
          aria-hidden
          data-speed="-0.06"
          className="arabic-bg"
          style={{
            position: "absolute",
            top: "21vw",
            left: "55vw",
            color: brand.green,
            opacity: 0.06,
            pointerEvents: "none",
            zIndex: 0,
            width: "88vw",
            maxWidth: "40vw",
            lineHeight: 1.2,
            fontFamily:
              "var(--brand-arabic, Amiri, 'Scheherazade New', 'Noto Naskh Arabic', 'Arabic Typesetting', serif)",
          }}
        >
          وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا
        </div>

        {/* Quranic Verse (between date and invite) */}
        <div id="verse" data-speed="0.02" className="absolute" style={{ top: "20vw", left: "20vw", width: "30vw" }}>
          <h3 className="heading-serif heading-md" style={{ color: brand.green }}>Comfort of Our Eyes</h3>
          <p className="mt-[1vw] body-text" style={{ fontStyle: "italic" }}>
            “Our Lord, gift us—through our spouses and our children—coolness to our eyes, and make us leaders among the righteous.”
          </p>
          <div className="verse-ribbon">Surah Al-Furqan — Qur’an 25:74</div>
        </div>

        {/* THE INVITE */}
        <div id="invite" className="absolute" style={{ top: "32.1vw", left: "58.5vw", width: "16.6vw" }}>
          <Entitled>THE INVITE</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <p className="mt-[2.33vw] body-text leading-3">
            You are cordially invited to the Walima (Reception) of <span className="font-bold" style={{ color: brand.green }}>Tanisha</span> & <span className="font-bold" style={{ color: brand.green }}>Ajowad</span>, as we share in their joy and offer our blessings.
          </p>
          <div className="mt-[1vw] py-4">
            <a href="#rsvp" className="cta-rsvp" onClick={openRSVP}>RSVP</a>
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
          className="absolute heading-serif heading-xl"
          style={{ top: "11.11vw", left: "41.44vw", color: brand.green }}
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
            <h3 className="mt-[2.05vw] heading-serif heading-md">
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
        <div id="parking" className="absolute" style={{ top: "51.05vw", left: "41.66vw" }}>
          <Entitled>PARKING</Entitled>
          <div
            className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
            style={{ background: brand.line }}
          />
          <h3 className="mt-[2.05vw] heading-serif heading-md">
            <div>Available</div>
            <div>for 50+ Vehicles</div>
          </h3>
          <div className="mt-[1vw]">
            <p className="mt-[1vw] body-text small">
              Although the general area is congested.
            </p>
            <p className="mt-[1vw] body-text small">
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
          <p className="mt-[2.33vw] body-text">
            Anything Formal yet Comfortable
          </p>
          <h3 className="mt-[1.2vw] heading-serif heading-md">
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
        <ul className="footer-grid">
          {/* Itinerary (desktop right; mobile stacks on top) */}
          <li id="itinerary">
            <Entitled>ITINERARY</Entitled>
            <div
              className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
              style={{ background: brand.line }}
            />
            <div className="mt-[2.05vw] body-text small itinerary-content">
              <div> <span className="font-bold">6:00 PM</span> — Guests arrive</div>
              <div>7:00 PM — Couple walk‑in</div>
              <div>8:00 PM — Dinner opens</div>
              <div>9:30 PM — Last Service</div>
              <div>10:00 PM — Goodbyes & Farewell</div>
            </div>
          </li>

          <li id="rsvp">
            <Entitled>REMINDER</Entitled>
            <div
              className="mt-[1vw] w-[1.66vw] h-[0.22vw]"
              style={{ background: brand.line }}
            />
            <div className="mt-[2.05vw] heading-serif heading-md">
              <div>Friday</div>
              <div>January 09</div>
              <div>2026</div>
            </div>
            <div className="mt-[1vw]">
              <a href="#rsvp" className="cta-rsvp" onClick={openRSVP}>RSVP</a>
            </div>
          </li>
        </ul>

        <div className="absolute bottom-[3.5vw] left-[41.66vw] cursor-pointer">
          <Entitled>SCROLL UP</Entitled>
        </div>
      </footer>

      {/* Inline nav CSS + responsive tokens for better proportions */}
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

        /* Shared tokens/classes */
        :root { --brand-serif: 'YourBrandSerif', ui-serif, Georgia, 'Times New Roman', Times, serif; --brand-arabic: 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Arabic Typesetting', serif; }
        .entitled { color: ${brand.green}; font-size: clamp(12px, 3.5vw, 14px); line-height: 1.35; letter-spacing: 0.04em; }
        .underline-accent { background: ${brand.green}; opacity: 0.9; }
        .cta-rsvp {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0.7rem 1.1rem; border: 1px solid ${brand.green};
          background: ${brand.green}; color: ${brand.paper};
          text-decoration: none; font-weight: 700; letter-spacing: 0.02em;
          border-radius: 0; transition: filter 180ms ease, opacity 180ms ease;
        }
        .cta-rsvp:hover { filter: brightness(0.96); }
        .nav-logo-text { font-size: 0.9vw; line-height: 1.4vw; font-weight: 700; }
        /* Soft-left fade for all inline images to avoid hard edges */
        img {
          -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0, #000 10%, #000 100%);
          mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0, #000 10%, #000 100%);
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
        }
        .heading-serif { font-family: var(--brand-serif, serif); letter-spacing: -0.02em; }
        .heading-md { font-size: clamp(22px, 6vw, 48px); line-height: 1.15; }
        .heading-xl { font-weight: 700; font-size: clamp(36px, 8.5vw, 120px); line-height: 1.04; letter-spacing: -0.02em; }
        .arabic-bg { font-family: var(--brand-arabic, serif); }
        #hero-title-wrap .hero-date { margin-top: 0.9rem; }
        /* Hero date styling */
        .hero-date { display: inline-flex; align-items: center; gap: 0.6rem; color: ${brand.green}; }
        .hero-date-chip { text-transform: uppercase; letter-spacing: 0.14em; font-weight: 700; font-size: clamp(12px, 1vw, 14px); padding: 0.35rem 0.55rem; border: 1px solid ${brand.line}; background: ${brand.paper}; }
        .hero-date-sep { opacity: 0.5; font-size: 0.9rem; }
        .hero-date-year { letter-spacing: 0.08em; color: ${brand.green}; font-weight: 600; font-size: clamp(12px, 0.9vw, 14px); }
        /* Verse ribbon */
        .verse-ribbon { display: inline-block; margin-top: 1vw; padding: 0.35rem 0.6rem; border: 1px solid ${brand.line}; background: ${brand.paper}; color: ${brand.green}; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; font-size: clamp(11px, 0.9vw, 13px); }
        .body-text { color: ${brand.gray}; font-size: clamp(15px, 4vw, 20px); line-height: 1.6; }
        .body-text.small { font-size: clamp(14px, 3.6vw, 18px); line-height: 1.5; }

        /* Invite: introduce comfortable inner spacing and consistent gaps */
        #invite { padding-top: clamp(8px, 1vw, 16px); padding-bottom: clamp(8px, 1vw, 16px); }
        #invite > * + * { margin-top: clamp(8px, 1.2vw, 18px); }

        /* Date: mirror spacing for readability */
        #intro-date { padding-top: clamp(8px, 1vw, 16px); padding-bottom: clamp(8px, 1vw, 16px); }
        #intro-date > * + * { margin-top: clamp(8px, 1.2vw, 18px); }

        /* Desktop: enforce floating absolute blocks in intro */
        @media (min-width: 769px) {
          #intro > #intro-date,
          #intro > #verse,
          #intro > #invite { position: absolute !important; z-index: 1; }
          #intro-bg-ar { font-size: clamp(22px, 3vw, 54px); line-height: 1.2; max-width: 88vw; }
        }

        /* Mobile layout: reflow absolute content and adjust sizes */
        /* Hide RSVP floating button by default (desktop/tablet) */
        #rsvp-fab { display: none; }

        /* Footer grid to prevent overlap on desktop */
        .footer-grid { position: absolute; top: 8.33vw; left: 0; right: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 6vw; padding: 0 10vw; align-items: start; }
        .footer-grid > li { position: static; }
        /* Limit itinerary content width on desktop */
        footer li#itinerary .itinerary-content { max-width: 18vw; }
        /* Spacing between itinerary items */
        footer li#itinerary .itinerary-content > * + * { margin-top: clamp(6px, 0.8vw, 12px); }

        @media (max-width: 768px) {
          /* Footer grid stacks on mobile */
          .footer-grid { position: static !important; display: grid !important; grid-template-columns: 1fr !important; gap: 10vw !important; padding: 0 6vw !important; }
          /* Prevent horizontal scroll and scale media safely */
          html, body { overflow-x: hidden !important; }
          img, video { max-width: 100% !important; height: auto !important; }
          /* Hide rotated rails on mobile */
          #nav-rail, #nav-rsvp { display: none !important; }

          /* Marks stack centered above hero (in flow, not fixed) */
          #marks {
            position: static !important;
            inset: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 2.6vw !important;
            width: 100% !important;
            margin: 3.5vw 0 2.5vw 0 !important;
            pointer-events: none !important;
          }
          #mark-logo, #mark-date { position: static !important; text-align: center !important; }
          #mark-logo .nav-logo-text, #mark-date .nav-logo-text {
            color: ${brand.green} !important;
            font-family: var(--brand-serif, serif) !important;
            font-weight: 700 !important;
            letter-spacing: -0.01em !important;
            font-size: clamp(16px, 5vw, 20px) !important;
            line-height: 1.2 !important;
          }

          /* Hero */
          #hero {
            /* Denser hero: max 60% of screen */
            height: 60dvh !important;
            min-height: 56dvh !important;
            overflow: hidden !important;
          }
          #h-hero-img {
            /* Oversized landscape image that fully covers hero */
            left: 0 !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            max-width: none !important;
            opacity: 0.15 !important;
          }
          /* Title wrapper positioning on mobile */
          #hero-title-wrap { top: 5vh !important; left: 6vw !important; right: 6vw !important; }
          #hero-title-wrap .hero-title { font-size: clamp(34px, 14.5vw, 96px) !important; line-height: 1.02 !important; letter-spacing: -0.02em !important; }
          #hero-title-wrap .hero-date { margin-top: 3.5vw !important; }
          #hero-date .hero-date-chip { font-size: clamp(12px, 3.6vw, 16px) !important; padding: 0.4rem 0.6rem !important; }
          #hero-date .hero-date-year { font-size: clamp(12px, 3.4vw, 16px) !important; }
          /* Hide scroll hint on small screens to save vertical space */
          #hero .scroll-hint { display: none !important; }

          /* Make other sections denser; aim under ~60% visual height */
          #intro, #venue, footer {
            height: auto !important;
            padding: 8vw 5vw !important;
          }
          #intro > div,
          #venue > div {
            margin: 5vw 0 !important;
          }

          /* Sections become auto-height with padding; absolute blocks go static */
          #intro, #venue, footer {
            height: auto !important;
            padding: 14vw 6vw !important;
          }
          #intro > div,
          #venue > div {
            position: static !important;
            width: auto !important;
            margin: 7vw 0 !important;
            max-width: 100% !important;
          }

          /* Stronger vertical rhythm for Invite and Date */
          #invite { padding-top: clamp(12px, 4vw, 24px) !important; padding-bottom: clamp(12px, 4vw, 24px) !important; }
          #invite > * + * { margin-top: clamp(12px, 4vw, 24px) !important; }
          #intro-date { padding-top: clamp(12px, 4vw, 24px) !important; padding-bottom: clamp(12px, 4vw, 24px) !important; }
          #intro-date > * + * { margin-top: clamp(12px, 4vw, 24px) !important; }

          /* Keep Arabic background absolutely positioned and scaled behind */
          #intro-bg-ar {
            position: absolute !important;
            top: 4vw !important;
            left: 6vw !important;
            font-size: clamp(18px, 6.2vw, 32px) !important;
            line-height: 1.25 !important;
            opacity: 0.08 !important;
            pointer-events: none !important;
            z-index: 0 !important;
            width: calc(100% - 12vw) !important;
            max-width: 92vw !important;
          }
          #intro > div:not(#intro-bg-ar) { position: relative !important; z-index: 1 !important; }

          /* Mobile alignment: keep within viewport */
          #invite { left: 2vw !important; padding-right: 0 !important; width: 100% !important; max-width: 100% !important; margin-left: 0 !important; margin-right: 0 !important; }
          #parking { padding-left: clamp(10px, 6vw, 36px) !important; max-width: 100% !important; }
          #verse { left: 3vw !important; padding-right: 0 !important; width: 100% !important; max-width: 100% !important; margin-left: auto !important; margin-right: auto !important; text-align: center !important; top: 5vw !important; }
          #verse .body-text { overflow-wrap: anywhere; word-break: break-word; }

          /* Typography scaling */
          #intro h2, #venue h3 { letter-spacing: -0.02em !important; }

          /* Venue title becomes inline flow */
          #venue h2 {
            position: static !important;
            font-size: clamp(28px, 10vw, 88px) !important;
            line-height: 1.05 !important;
            letter-spacing: -0.02em !important;
            margin: 8vw 0 6vw !important;
          }

          /* Scenic images soften & expand */
          #h-s2-img-0,
          #h-s2-img-1 {
            width: 120vw !important;
            opacity: 0.15 !important;
            left: -10vw !important;
            right: auto !important;
          }
          #h-s2-img-0 { top: 10vh !important; }
          #h-s2-img-1 { top: 35vh !important; }

          /* Footer */
          footer {
            padding-top: 16vw !important;
          }
          footer li#rsvp {
            position: static !important;
            text-align: center !important;
          }
          footer li#itinerary { position: static !important; text-align: center !important; margin-bottom: 6vw !important; }
          footer li#itinerary .itinerary-content { max-width: none !important; margin-left: auto !important; margin-right: auto !important; text-align: center !important; }
          footer li#itinerary .itinerary-content > * + * { margin-top: clamp(8px, 3vw, 18px) !important; }
          /* Center the rule after the Entitled label in footer */
          footer li#rsvp .entitled + div { margin-left: auto !important; margin-right: auto !important; }
          footer li#itinerary .entitled + div { margin-left: auto !important; margin-right: auto !important; }

          /* Floating RSVP button */
          #rsvp-fab {
            position: fixed !important;
            right: 5vw !important;
            bottom: 5vw !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 3.6vw 5.2vw !important;
            border-radius: 0 !important;
            background: ${brand.green} !important;
            color: ${brand.paper} !important;
            font-weight: 600 !important;
            font-size: clamp(14px, 4.2vw, 18px) !important;
            box-shadow: 0 6px 24px rgba(0,0,0,0.12) !important;
            pointer-events: auto !important;
            z-index: 40 !important;
          }

          /* Force hero subtitle below title in flow on mobile */
          #hero-date {
            position: relative !important;
            z-index: 10 !important;
            top: auto !important;
            left: auto !important;
            margin-left: 6vw !important;
            margin-top: calc(5vh + 34vw) !important;
          }
        }

        /* Respect reduced motion: stop transforms and animations */
        @media (prefers-reduced-motion: reduce) {
          [data-speed] {
            transform: none !important;
          }
          #hero svg {
            animation: none !important;
          }
        }
      `}</style>

      <RSVPModal
        open={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        brand={{ green: brand.green, paper: brand.paper, line: brand.line, gray: brand.gray }}
      />
    </div>
  );
}
