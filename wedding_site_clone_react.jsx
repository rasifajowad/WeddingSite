import { useEffect } from "react";
import { motion } from "framer-motion";

// Palette
const brand = {
  bg: "#f3f2f1",
  paper: "#fdfdfb",
  green: "#284135",
  gray: "#999790",
  line: "#c3c2c0",
};

// Simple helper components
const Entitled = ({ children }: { children: React.ReactNode }) => (
  <div className="relative" style={{ transform: "translateZ(0)" }}>
    <div
      className="uppercase tracking-[0.04em] font-medium"
      style={{
        color: brand.green,
        fontSize: "0.9vw",
        lineHeight: "1.4vw",
        letterSpacing: "0.02vw",
      }}
    >
      {children}
    </div>
  </div>
);

const UnderlineLink = ({ href, children }: any) => (
  <a
    href={href}
    className="relative inline-block"
    target="_blank"
    rel="noreferrer"
  >
    <span className="relative z-[1]">{children}</span>
    <span
      aria-hidden
      className="absolute left-0 right-0 bottom-[0.25rem] h-[2px]"
      style={{ background: brand.green, opacity: 0.9 }}
    />
  </a>
);

const RotatingDodeca = ({ size = 200 }: { size?: number }) => (
  <div
    className="relative"
    style={{ width: size, height: size }}
  >
    <motion.svg
      viewBox="0 0 234 234"
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    >
      <polygon
        points="117,1 175,16.6 217.5,59 233,117 217.5,175 175,217.5 117,233 59,217.5 16.6,175 1,117 16.6,59 59,16.6"
        fill="none"
        stroke={brand.line}
        strokeWidth={1}
      />
    </motion.svg>
    <svg viewBox="0 0 234 234" className="absolute inset-0">
      <polygon
        points="117,1 175,16.6 217.5,59 233,117 217.5,175 175,217.5 117,233 59,217.5 16.6,175 1,117 16.6,59 59,16.6"
        fill="none"
        stroke={brand.green}
        strokeWidth={1}
        opacity={0.7}
      />
    </svg>
  </div>
);

export default function WeddingSiteClone() {
  useEffect(() => {
    // Lock scroll snapping feel similar to the reference
    document.body.style.background = brand.bg;
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: brand.bg, color: brand.green, fontFamily: "ui-sans-serif, system-ui" }}>
      {/* NAV */}
      <nav className="fixed inset-0 pointer-events-none select-none z-30">
        <div className="absolute top-[2.8vw] left-[2.8vw] text-center text-[0.9vw] leading-[1.4vw] font-medium pointer-events-auto px-[1.1vw] py-[0.6vw]">
          <span>A</span> <span>/</span> <span>G</span>
        </div>
        <div className="absolute top-[2.8vw] right-[2.6vw] text-center pointer-events-auto px-[1.1vw] py-[0.6vw]" style={{ color: brand.green }}>
          <div className="text-[0.9vw] leading-[1.4vw]">10 / 14</div>
        </div>
        <div className="absolute left-[3.4vw] bottom-[2.6vw] origin-left -rotate-90 flex gap-[4.4vh] text-[0.8vw] font-medium">
          <a href="#venue" className="pointer-events-auto">HOMEWOOD, CA</a>
          <a href="#rsvp" className="pointer-events-auto">RSVP</a>
          <a href="#registry" className="pointer-events-auto">REGISTRY</a>
          <a href="#gallery" className="pointer-events-auto">GALLERY</a>
        </div>
        <div className="absolute bottom-[3.9vw] left-[20.8vw] pointer-events-auto">
          <RotatingDodeca size={78} />
        </div>
        <div className="absolute left-[22.7vw] bottom-[5.7vw] w-[0.55vw] h-[4.27vw] overflow-hidden">
          <motion.div
            className="w-full h-full"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
          >
            <svg viewBox="0 0 10 77" className="w-full h-full fill-current" style={{ color: brand.green }}>
              <polygon points="8.5,71.3 5.5,74.3 5.5,0 4.5,0 4.5,74.3 1.5,71.3 0.8,72 4.3,75.5 5,76.2 5.7,75.5 9.2,72 "></polygon>
            </svg>
          </motion.div>
        </div>
        <div className="absolute bottom-[3.5vw] right-[4.1vw] text-right overflow-hidden">
          <div className="uppercase tracking-[0.04em] font-medium">SCROLL DOWN</div>
        </div>
      </nav>

      {/* HERO */}
      <header id="hero" className="relative h-screen select-none">
        <img
          alt="Hero"
          className="absolute right-0 bottom-[20vh] object-cover"
          src="https://images.unsplash.it/photo-1511735111819-9a3f7709049c?w=1600&auto=format&fit=crop&q=60"
          style={{ width: "83vw", maxWidth: "130vh" }}
        />
        <motion.h1
          className="absolute z-10"
          style={{ top: "37vh", left: "41.6vw", fontFamily: "serif", fontWeight: 600, fontSize: "7.8vw", lineHeight: "7.8vw", letterSpacing: "-0.3vw", color: brand.green }}
          initial={{ opacity: 0, rotateX: 90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block">Marry</span>
          <span className="block">Monday.</span>
        </motion.h1>
      </header>

      {/* SECTION S1: DATE + INVITE + CAPTIONS + GALLERY BTN */}
      <section id="intro" className="relative" style={{ height: "238vw", background: brand.bg }}>
        {/* THE DATE */}
        <div className="absolute" style={{ top: "3vw", left: "41.6vw" }}>
          <Entitled>THE DATE</Entitled>
          <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
          <h2 className="mt-[2.05vw]" style={{ fontFamily: "serif", fontSize: "2.66vw", lineHeight: "3vw", letterSpacing: "-0.08vw", color: brand.green }}>
            <div>Monday</div>
            <div>October 14</div>
            <div>2019</div>
          </h2>
        </div>

        {/* THE INVITE */}
        <div className="absolute" style={{ top: "14.1vw", left: "62.5vw", width: "16.6vw" }}>
          <Entitled>THE INVITE</Entitled>
          <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
          <p className="mt-[2.33vw] text-[1.1vw] leading-[1.6vw]" style={{ color: brand.gray }}>
            Join the celebration on the shores of a beautiful lake. Swap in your details here.
          </p>
          <div className="mt-[1vw]"><UnderlineLink href="#rsvp">RSVP</UnderlineLink></div>
        </div>

        {/* Decorative BIG NUMBERS */}
        <ul className="absolute text-[22.2vw] leading-[22.2vw] font-bold opacity-70 select-none" style={{ color: "transparent", WebkitTextStrokeColor: brand.line, WebkitTextStrokeWidth: 1 }}>
          <li className="absolute" style={{ top: "29.4vw", left: "20.38vw" }}>10</li>
          <li className="absolute" style={{ top: "115.94vw", right: "8.83vw" }}>14</li>
          <li className="absolute" style={{ top: "151.66vw", left: "20.38vw" }}>19</li>
        </ul>

        {/* Captions */}
        <ul className="absolute text-[0.9vw] leading-[1.3vw]" style={{ color: brand.gray }}>
          <li className="absolute" style={{ top: "140.1vw", left: "41.66vw" }}>
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>Sep 8, 2019</span>
            <span>She said he was crazy.</span>
          </li>
          <li className="absolute" style={{ top: "88.72vw", left: "8.33vw" }}>
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>Lake Louise</span>
            <span>He asked her to marry him.</span>
          </li>
          <li className="absolute" style={{ top: "168.38vw", left: "8.33vw" }}>
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>3:40PM</span>
            <span>She said yes.</span>
          </li>
          <li className="absolute" style={{ top: "211.88vw", left: "41.66vw" }}>
            <span className="mr-[2.7vw]" style={{ color: brand.green }}>Oct 14, 2019</span>
            <span>We get married.</span>
          </li>
        </ul>

        {/* Gallery button */}
        <div id="gallery" className="absolute flex items-center justify-center" style={{ bottom: 0, left: "41.66vw", width: "13vw", height: "13vw" }}>
          <div className="absolute inset-0">
            <RotatingDodeca />
          </div>
          <Entitled>GALLERY</Entitled>
        </div>
        <div className="absolute text-[0.9vw]" style={{ bottom: "5.05vw", left: "62.5vw", color: brand.gray, width: "10vw" }}>
          Click & hold to see more of our adventures together.
        </div>
      </section>

      {/* SECTION S2: TAHOE DETAILS */}
      <section id="venue" className="relative" style={{ height: "152.44vw", background: brand.bg }}>
        <img
          className="absolute object-cover"
          style={{ top: "64.44vw", left: 0, width: "31.05vw" }}
          src="https://images.unsplash.it/photo-1549880187-8a8c1e2ade22?w=900&auto=format&fit=crop&q=60"
          alt="scenic-0"
        />
        <img
          className="absolute object-cover"
          style={{ top: "99.5vw", right: 0, width: "56.38vw" }}
          src="https://images.unsplash.it/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=60"
          alt="scenic-1"
        />

        <h2 className="absolute font-serif" style={{ top: "11.11vw", left: "41.44vw", fontSize: "7.8vw", lineHeight: "7.8vw", letterSpacing: "-0.3vw", color: brand.green }}>
          <div>Lake</div>
          <div>Tahoe,</div>
          <div>Ca</div>
        </h2>

        {/* THE VENUE */}
        <div className="absolute" style={{ top: "39.94vw", left: "20.83vw" }}>
          <Entitled>THE VENUE</Entitled>
          <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            <h3 className="mt-[2.05vw] font-serif" style={{ fontSize: "2.66vw", lineHeight: "3vw", letterSpacing: "-0.08vw" }}>
              <div>5160 W. Lake</div>
              <div>Homewood,</div>
              <div>CA 96141</div>
            </h3>
          </a>
          <div className="mt-[1vw]"><UnderlineLink href="https://www.westshorecafe.com/">West Shore Cafe</UnderlineLink></div>
        </div>

        {/* THE AIRPORT */}
        <div className="absolute" style={{ top: "51.05vw", left: "41.66vw" }}>
          <Entitled>THE AIRPORT</Entitled>
          <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
          <h3 className="mt-[2.05vw] font-serif" style={{ fontSize: "2.66vw", lineHeight: "3vw", letterSpacing: "-0.08vw" }}>
            <div>Reno</div>
            <div>International</div>
            <div>Airport</div>
          </h3>
          <div className="mt-[1vw]"><UnderlineLink href="https://google.com/flights">Book A Flight</UnderlineLink></div>
          <p className="mt-[1vw] text-[0.9vw] leading-[1.3vw]" style={{ color: brand.gray }}>
            SFO / OAK might have cheaper ticket options but are both a 3-5hr drive from Tahoe.
          </p>
        </div>

        {/* THE LODGING */}
        <div className="absolute" style={{ top: "62.16vw", left: "62.5vw", width: "16.6vw" }}>
          <Entitled>THE LODGING</Entitled>
          <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
          <p className="mt-[2.33vw] text-[1.1vw] leading-[1.6vw]" style={{ color: brand.gray }}>
            We recommend staying near King's Beach on the north shore, or swap with your own hotel.
          </p>
          <h3 className="mt-[1.2vw] font-serif" style={{ fontSize: "2.66vw", lineHeight: "3vw", letterSpacing: "-0.08vw" }}>
            <div>Tahoe</div>
            <div>Vistana</div>
            <div>Inn</div>
          </h3>
          <div className="mt-[1vw]"><UnderlineLink href="https://www.tahoevistanainn.net/">Book A Room</UnderlineLink></div>
        </div>

        {/* ACTIVITIES */}
        <div className="absolute" style={{ top: "88.55vw", left: "41.66vw" }}>
          <Entitled>ACTIVITIES</Entitled>
          <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
          <h3 className="mt-[2.05vw] font-serif" style={{ fontSize: "2.66vw", lineHeight: "3vw", letterSpacing: "-0.08vw" }}>
            <div>Pack</div>
            <div>Layers</div>
          </h3>
          <div className="mt-[1vw] flex flex-wrap gap-x-6 gap-y-2 text-[1.1vw]">
            <UnderlineLink href="#">Hiking</UnderlineLink>
            <UnderlineLink href="#">Paddle Boarding</UnderlineLink>
            <UnderlineLink href="#">Kayaking</UnderlineLink>
            <UnderlineLink href="#">Canoeing</UnderlineLink>
            <UnderlineLink href="#">Boating</UnderlineLink>
            <UnderlineLink href="#">Biking</UnderlineLink>
            <UnderlineLink href="#">Sightseeing</UnderlineLink>
          </div>
        </div>

        {/* FOOD & DRINK */}
        <div className="absolute" style={{ top: "99.5vw", left: "20.83vw" }}>
          <Entitled>FOOD & DRINK</Entitled>
          <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
          <h3 className="mt-[2.05vw] font-serif" style={{ fontSize: "2.66vw", lineHeight: "3vw", letterSpacing: "-0.08vw" }}>
            <div>A Few</div>
            <div>Favorites</div>
          </h3>
          <div className="mt-[1vw] flex flex-wrap gap-x-6 gap-y-2 text-[1.1vw]">
            <UnderlineLink href="#">Truckee Tavern & Grill</UnderlineLink>
            <UnderlineLink href="#">Cottonwood</UnderlineLink>
            <UnderlineLink href="#">River Grill</UnderlineLink>
            <UnderlineLink href="#">Pete N’ Peters</UnderlineLink>
            <UnderlineLink href="#">Gar Woods Grill & Pier</UnderlineLink>
            <UnderlineLink href="#">Jason’s Beachside Grill</UnderlineLink>
            <UnderlineLink href="#">Log Cabin Caffe</UnderlineLink>
            <UnderlineLink href="#">Full Belly Deli</UnderlineLink>
          </div>
          <p className="mt-[1.2vw] text-[0.9vw] leading-[1.3vw]" style={{ color: brand.gray }}>
            Message us for activity recommendations. We know Tahoe well and have a long list!
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative -mt-px" style={{ height: "47.22vw", background: brand.paper }}>
        <ul>
          <li className="absolute top-[8.33vw] left-[20.83vw]">
            <Entitled>CREDITS</Entitled>
            <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
            <div className="mt-[1.6vw] space-y-[0.6vw] text-[0.9vw] leading-[1.3vw]" style={{ color: brand.gray }}>
              <div>
                Development — <UnderlineLink href="https://www.aristidebenoist.com/">Aristide Benoist</UnderlineLink>
              </div>
              <div>
                Design — <UnderlineLink href="https://dribbble.com/geneross">Gene Ross</UnderlineLink>
              </div>
            </div>
          </li>
          <li className="absolute top-[8.33vw] left-[41.66vw]" id="rsvp">
            <Entitled>REMINDER</Entitled>
            <div className="mt-[1vw] w-[1.66vw] h-[0.22vw]" style={{ background: brand.line }} />
            <div className="mt-[2.05vw] font-serif" style={{ fontSize: "2.66vw", lineHeight: "3vw", letterSpacing: "-0.08vw" }}>
              <div>Monday</div>
              <div>October 14</div>
              <div>2019</div>
            </div>
            <div className="mt-[1vw]"><UnderlineLink href="#">RSVP</UnderlineLink></div>
          </li>
        </ul>
        <div className="absolute bottom-[3.5vw] left-[41.66vw] cursor-pointer">
          <Entitled>SCROLL UP</Entitled>
        </div>
      </footer>
    </div>
  );
}
