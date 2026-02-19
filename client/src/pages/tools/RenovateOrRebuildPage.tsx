/*
 * Dedicated "Is It Better to Renovate or Rebuild?" tool page
 * Gold-themed full-page experience with the cost calculator
 */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RenovateOrRebuild from "@/components/RenovateOrRebuild";
import { Hammer, ArrowLeft } from "lucide-react";

export default function RenovateOrRebuildPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero Banner */}
        <section className="relative py-16 lg:py-24 px-4 overflow-hidden">
          {/* Gold gradient background */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, #2A2520 0%, #1E1A16 40%, #2A2520 70%, #332D26 100%)",
          }} />
          {/* Subtle gold accent lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(197,165,90,0.3), transparent)" }} />
            <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(197,165,90,0.3), transparent)" }} />
            {/* Decorative corner accents */}
            <svg className="absolute top-8 right-8 w-32 h-32 opacity-[0.06]" viewBox="0 0 100 100" fill="none">
              <path d="M10 90 L50 10 L90 90" stroke="#C5A55A" strokeWidth="2" />
              <path d="M20 90 L50 25 L80 90" stroke="#C5A55A" strokeWidth="1.5" />
              <path d="M30 90 L50 40 L70 90" stroke="#C5A55A" strokeWidth="1" />
            </svg>
            <svg className="absolute bottom-8 left-8 w-24 h-24 opacity-[0.04] rotate-180" viewBox="0 0 100 100" fill="none">
              <path d="M10 90 L50 10 L90 90" stroke="#C5A55A" strokeWidth="2" />
              <path d="M20 90 L50 25 L80 90" stroke="#C5A55A" strokeWidth="1.5" />
            </svg>
          </div>

          <div
            className="max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            {/* Back link */}
            <a
              href="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-gold text-sm mb-8 transition-colors duration-300"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>

            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-8">
              <Hammer className="w-4 h-4 text-gold" />
              <span
                className="text-gold text-sm tracking-wider uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Free Cost Calculator
              </span>
            </div>

            <h1
              className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Is It Better to{" "}
              <span className="text-gold italic">Renovate or Rebuild?</span>
            </h1>

            <p
              className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              A common question for Florida homeowners. Enter your home details and get a side-by-side cost comparison with our expert recommendation.
            </p>

            <div className="w-16 h-px mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
          </div>
        </section>

        {/* Tool Section — warm gold-toned background */}
        <section className="py-16 lg:py-24 px-4" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F3EDE4 100%)" }}>
          <div className="max-w-xl mx-auto">
            {/* Gold-bordered card wrapper */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(197,165,90,0.25)",
                boxShadow: "0 8px 40px rgba(154,123,60,0.1), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <RenovateOrRebuild />
            </div>

            {/* Trust indicators */}
            <div className="mt-10 text-center">
              <p
                className="text-sm mb-4"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#9A7B3C" }}
              >
                Helping Tampa Bay homeowners make informed decisions
              </p>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>500+</p>
                  <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}>Estimates Given</p>
                </div>
                <div className="w-px h-10" style={{ background: "rgba(154,123,60,0.2)" }} />
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>15+</p>
                  <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}>Years Experience</p>
                </div>
                <div className="w-px h-10" style={{ background: "rgba(154,123,60,0.2)" }} />
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>100%</p>
                  <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}>Free & No Obligation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 lg:py-20 px-4" style={{ background: "#F3EDE4" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                What We <span className="italic" style={{ color: "#9A7B3C" }}>Consider</span>
              </h2>
              <div className="w-16 h-px mx-auto" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Home Age & Condition",
                  description: "Older homes often need extensive electrical, plumbing, and insulation upgrades that can make renovation costs approach rebuild prices.",
                },
                {
                  title: "Scope of Changes",
                  description: "The size of your desired addition relative to the existing home significantly impacts whether renovation or rebuilding is more cost-effective.",
                },
                {
                  title: "Florida Code Compliance",
                  description: "Major renovations may trigger requirements to bring the entire home up to current Florida Building Code, adding unexpected costs.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 transition-all duration-500 group hover:-translate-y-1"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(154,123,60,0.12)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "rgba(197,165,90,0.1)", border: "1px solid rgba(197,165,90,0.2)" }}
                  >
                    <span className="text-lg font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "#9A7B3C" }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
