/*
 * DESIGN: Florida Coastal Luxury
 * Hero: Full-viewport with MP4 video background, dark overlay,
 * large serif heading, subtitle, and gold CTA. Scroll indicator at bottom.
 */
import { useEffect, useState, useRef } from "react";
import { ChevronDown, Phone } from "lucide-react";

const HERO_VIDEO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/nEKevTaZMfIqoelH.mp4";



export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* MP4 Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Main Heading */}
        <h1
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight max-w-5xl transition-all duration-1000 ease-out"
          style={{
            fontFamily: "'DM Serif Display', serif",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transitionDelay: "500ms",
          }}
        >
          We Build Relationships
          <br />
          <span className="text-gold">Before We Build Homes</span>
        </h1>

        {/* Gold Divider */}
        <div
          className="gold-divider my-8 transition-all duration-1000 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "scaleX(1)" : "scaleX(0)",
            transitionDelay: "800ms",
          }}
        />

        {/* Subtitle */}
        <p
          className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mb-10 transition-all duration-1000 ease-out"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1000ms",
          }}
        >
          Building custom homes and transforming existing spaces across the Tampa Bay Area
          with craftsmanship, care, and precision.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 ease-out"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "1200ms",
          }}
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-gold px-8 py-3.5 rounded-sm text-base tracking-wider"
          >
            Get Started
          </a>
          <a
            href="tel:7279991959"
            className="flex items-center gap-2 text-white/80 hover:text-gold px-6 py-3.5 border border-white/20 hover:border-gold/50 rounded-sm transition-all duration-300 text-base tracking-wider"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <Phone className="w-4 h-4" />
            (727) 999-1959
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-gold transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
