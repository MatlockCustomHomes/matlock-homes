/*
 * DESIGN: Florida Coastal Luxury
 * Warranty Page: "Matlock Shield" warranty program with 25-year coverage.
 * Dark background, gold accents, editorial layout.
 */
import { useEffect, useState } from "react";
import { Shield, CheckCircle, Clock, Home, Wrench, Building, Hammer, Droplets, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const coverageAreas = [
  {
    icon: Wrench,
    title: "Workmanship & Materials",
    description: "All labor and materials used in your custom home are covered for defects, ensuring the quality and precision of every detail from day one.",
    items: [
      "All labor and workmanship defects",
      "Material defects and failures",
      "Plumbing, electrical, and HVAC systems",
      "Interior finishes and fixtures",
      "Exterior paint and sealants",
    ],
  },
  {
    icon: Home,
    title: "Building Envelope",
    description: "Complete protection for the exterior shell of your home — roofing, windows, doors, and weather barriers — keeping your family safe from the elements.",
    items: [
      "Roofing systems and waterproofing",
      "Exterior wall assemblies",
      "Window and door installations",
      "Water intrusion protection",
      "Weather barrier and flashing systems",
    ],
  },
  {
    icon: Building,
    title: "Structural Integrity",
    description: "The core stability and strength of your home is protected for the full 25 years — foundation, framing, and load-bearing elements.",
    items: [
      "Foundation and footings",
      "Load-bearing walls and framing",
      "Structural beams and columns",
      "Floor and roof trusses",
      "Structural concrete and masonry",
    ],
  },
];

const benefits = [
  {
    title: "25 Years of Protection",
    desc: "Our warranty extends far beyond the typical industry terms, providing a quarter-century of confidence in your investment.",
  },
  {
    title: "Transparent Terms",
    desc: "No hidden surprises or exclusions buried in the fine print. You'll know exactly what's covered from day one.",
  },
  {
    title: "Superior Aftercare",
    desc: "Responsive service and dependable solutions whenever you need us. We're just a phone call away.",
  },
  {
    title: "Full Accountability",
    desc: "Your builder should stand behind every detail of your home. We back our warranty directly — not through a third-party provider.",
  },
];

export default function Warranty() {
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
        {/* Hero */}
        <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(197,165,90,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(197,165,90,0.2) 0%, transparent 50%)" }} />
          </div>

          <div
            className="relative max-w-4xl mx-auto text-center transition-all duration-1000"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-8">
              <Shield className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Matlock Shield
              </span>
            </div>

            <h1
              className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              25 Years of
              <br />
              <span className="text-gold italic">Warranty Protection</span>
            </h1>

            <p
              className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              When building a custom home, a warranty should feel like protection — not a list of excuses. Matlock Shield is our promise that your home will be protected with the same precision and dedication it was built with.
            </p>

            {/* 25 Year Badge */}
            <div className="mt-12 inline-flex items-center gap-4 bg-gold/10 border border-gold/30 rounded-2xl px-8 py-5">
              <span
                className="text-gold text-5xl lg:text-6xl font-bold"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                25
              </span>
              <div className="text-left">
                <span className="text-gold text-lg font-semibold block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Year Warranty
                </span>
                <span className="text-white/40 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Comprehensive Coverage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 lg:p-12">
              <h2
                className="text-white text-2xl sm:text-3xl mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                The Problem with <span className="text-gold italic">Standard Warranties</span>
              </h2>
              <p
                className="text-white/50 text-base leading-relaxed mb-6"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                Typical warranties are designed with the builder in mind, not the homeowner. Many offer coverage that ends just as risks begin to surface, hidden clauses that limit what's actually protected, and slow or inconsistent responses when problems arise.
              </p>
              <p
                className="text-white/50 text-base leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                These gaps leave families vulnerable. You deserve more than minimal coverage — you deserve confidence that lasts. That's why we created <span className="text-gold font-medium">Matlock Shield</span> with a full 25 years of protection.
              </p>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-16 lg:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Your 25-Year Warranty with Matlock Homes
              </p>
              <h2
                className="text-white text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Comprehensive <span className="text-gold italic">Coverage</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {coverageAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="relative bg-gradient-to-b from-gold/20 to-gold/5 border border-gold/30 rounded-2xl p-8 lg:p-10 transition-all duration-700 hover:border-gold/50"
                    style={{
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: `${300 + i * 200}ms`,
                    }}
                  >
                    {/* Icon and title */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3 py-1">
                        <Shield className="w-3 h-3 text-gold" />
                        <span className="text-gold text-xs tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          25 Years
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-white text-xl mb-2"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {area.title}
                    </h3>

                    <p
                      className="text-white/40 text-sm leading-relaxed mb-6"
                      style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                    >
                      {area.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-gold text-xs tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                        What's Covered
                      </p>
                      {area.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span
                            className="text-white/60 text-sm"
                            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24 px-4 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-white text-3xl sm:text-4xl"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Coverage That Goes <span className="text-gold italic">Beyond</span> the Industry Standard
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {benefits.map((benefit, i) => (
                <div
                  key={benefit.title}
                  className="bg-white/[0.03] border border-white/10 rounded-xl p-6 lg:p-8 hover:border-gold/20 transition-all duration-300"
                >
                  <h3
                    className="text-white text-lg mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-white/40 text-sm leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                  >
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Quote */}
        <section className="py-16 lg:py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-white text-2xl sm:text-3xl mb-8"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              How Are We Able to Offer <span className="text-gold italic">25 Years?</span>
            </h2>

            <blockquote className="relative">
              <div className="text-gold/30 text-6xl absolute -top-4 left-0" style={{ fontFamily: "'DM Serif Display', serif" }}>"</div>
              <p
                className="text-white/60 text-base sm:text-lg leading-relaxed italic pl-8 pr-4"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                Because we're confident in the homes we build. Matlock Custom Homes goes further than other builders. While most custom home warranties stop at 2-5-10 years of coverage, we stand behind our work for a full 25 years. That level of protection is backed directly by us — not an outside provider — because we know our builds can stand the test of time.
              </p>
              <p
                className="text-white/60 text-base sm:text-lg leading-relaxed italic pl-8 pr-4 mt-4"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                Matlock Custom Homes is committed to using premium-quality materials and applying expert building practices that meet the highest standards. Our craftsmanship is designed to last, and Matlock Shield is proof of that confidence.
              </p>
            </blockquote>

            <div className="mt-8">
              <p className="text-gold text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                — Matlock Custom Homes Team
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-white text-3xl sm:text-4xl mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Ready to Build with <span className="text-gold italic">Confidence?</span>
            </h2>
            <p
              className="text-white/50 text-base mb-8"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              Every Matlock Custom Homes project includes our Matlock Shield 25-year warranty at no additional cost.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/#contact";
                }}
                className="btn-gold px-8 py-3.5 rounded-sm text-base tracking-wider"
              >
                Get in Touch
              </a>
              <a
                href="tel:7279991959"
                className="flex items-center gap-2 text-white/80 hover:text-gold px-6 py-3.5 border border-white/20 hover:border-gold/50 rounded-sm transition-all duration-300 text-base tracking-wider"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Clock className="w-4 h-4" />
                Call (727) 999-1959
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
