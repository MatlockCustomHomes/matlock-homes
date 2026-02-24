/*
 * DESIGN: Florida Coastal Luxury — Warranty Page (Bright variant)
 * Light warm background so content stands out.
 * 5-10 Year Builder's Warranty.
 */
import { useEffect, useState } from "react";
import { Shield, CheckCircle, Clock, Wrench, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const warrantyTiers = [
  {
    years: 5,
    label: "Five-Year",
    title: "Workmanship & Materials",
    icon: Wrench,
    description:
      "Our 5-year warranty covers all workmanship and materials used in the construction of your home. From the foundation to the finishing touches, this ensures that every element of your home meets the highest standards of quality and durability. If any defect arises due to faulty workmanship or substandard materials within the first five years, we'll make it right — no questions asked.",
    covers: [
      "All labor and workmanship defects",
      "Material defects and failures",
      "Plumbing, electrical, and HVAC systems",
      "Interior finishes including paint, trim, and fixtures",
      "Exterior finishes, sealants, and coatings",
      "Cabinetry, countertops, and built-in features",
      "Flooring installation and materials",
      "Doors, windows, and hardware operation",
    ],
  },
  {
    years: 10,
    label: "Ten-Year",
    title: "Structural Defects",
    icon: Building,
    description:
      "Our 10-year structural warranty provides long-term protection for the core integrity of your home. This covers the essential load-bearing components that form the backbone of your home's construction. If any structural defect compromises the safety or stability of your home within the first decade, we stand behind our work and will resolve it at our expense.",
    covers: [
      "Foundation and footings",
      "Load-bearing walls and framing",
      "Structural beams, columns, and headers",
      "Floor and roof trusses and rafters",
      "Structural concrete and masonry",
      "Retaining walls and structural supports",
      "Roof structure and decking",
      "Structural subfloor systems",
    ],
  },
];

const benefits = [
  {
    title: "5-10 Year Coverage",
    desc: "Far beyond the industry-standard 1-2 years. Your investment is protected for the long haul.",
  },
  {
    title: "Transparent Terms",
    desc: "No hidden exclusions. You'll know exactly what's covered from day one.",
  },
  {
    title: "Responsive Aftercare",
    desc: "Our dedicated warranty team is one call away, ready to address concerns promptly.",
  },
  {
    title: "Direct Accountability",
    desc: "We back our warranty ourselves — not through a third party — because we stand behind our work.",
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
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2" }}>
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero — warm light background */}
        <section
          className="relative py-20 lg:py-28 px-4 overflow-hidden"
          style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F3EDE4 100%)" }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(154,123,60,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(154,123,60,0.15) 0%, transparent 50%)" }} />
          </div>

          <div
            className="relative max-w-4xl mx-auto text-center transition-all duration-1000"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8" style={{ background: "rgba(154,123,60,0.1)", border: "1px solid rgba(154,123,60,0.25)" }}>
              <Shield className="w-4 h-4" style={{ color: "#9A7B3C" }} />
              <span className="text-sm tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}>
                Matlock Shield
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
            >
              5-10 Year
              <br />
              <span className="italic" style={{ color: "#9A7B3C" }}>Builder's Warranty</span>
            </h1>

            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#6A6058" }}
            >
              When building a custom home, a warranty should feel like protection — not a list of excuses. Matlock Shield is our promise that your home will be protected with the same precision and dedication it was built with.
            </p>

            {/* Warranty Badges */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="inline-flex items-center gap-4 rounded-2xl px-8 py-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(154,123,60,0.3)", boxShadow: "0 4px 20px rgba(154,123,60,0.08)" }}>
                <span
                  className="text-5xl lg:text-6xl font-bold"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#9A7B3C" }}
                >
                  5
                </span>
                <div className="text-left">
                  <span className="text-lg font-semibold block" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}>
                    Year Warranty
                  </span>
                  <span className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#8A8078" }}>
                    Workmanship & Materials
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-4 rounded-2xl px-8 py-5" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(154,123,60,0.3)", boxShadow: "0 4px 20px rgba(154,123,60,0.08)" }}>
                <span
                  className="text-5xl lg:text-6xl font-bold"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#9A7B3C" }}
                >
                  10
                </span>
                <div className="text-left">
                  <span className="text-lg font-semibold block" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}>
                    Year Warranty
                  </span>
                  <span className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#8A8078" }}>
                    Structural Defects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 lg:py-20 px-4" style={{ background: "#F3EDE4" }}>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl p-8 lg:p-12" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(154,123,60,0.12)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <h2
                className="text-2xl sm:text-3xl mb-6"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                The Problem with <span className="italic" style={{ color: "#9A7B3C" }}>Standard Warranties</span>
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
              >
                Most builder warranties are short, vague, and full of exclusions. Coverage often ends before real issues appear, and getting a response can be a challenge. You deserve better than the bare minimum — that's why we created <span style={{ color: "#9A7B3C", fontWeight: 500 }}>Matlock Shield</span>: 5 years on workmanship and materials, 10 years on structural integrity, backed directly by us.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Tiers */}
        <section className="py-16 lg:py-24 px-4" style={{ background: "linear-gradient(180deg, #F3EDE4 0%, #EDE7DC 100%)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}>
                Your Warranty with Matlock Homes
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                Two Tiers of <span className="italic" style={{ color: "#9A7B3C" }}>Protection</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {warrantyTiers.map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.years}
                    className="relative rounded-2xl p-8 lg:p-10 transition-all duration-700"
                    style={{
                      background: "rgba(255,255,255,0.85)",
                      border: "1px solid rgba(154,123,60,0.2)",
                      boxShadow: "0 8px 30px rgba(154,123,60,0.06)",
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: `${300 + i * 200}ms`,
                    }}
                  >
                    {/* Year badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: "rgba(154,123,60,0.1)", border: "1px solid rgba(154,123,60,0.2)" }}>
                        <Icon className="w-7 h-7" style={{ color: "#9A7B3C" }} />
                      </div>
                      <div>
                        <span
                          className="text-4xl font-bold"
                          style={{ fontFamily: "'DM Serif Display', serif", color: "#9A7B3C" }}
                        >
                          {tier.years}
                        </span>
                        <span className="text-sm ml-1" style={{ fontFamily: "'Outfit', sans-serif", color: "#8A8078" }}>
                          Years
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-2xl mb-3"
                      style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                    >
                      {tier.title}
                    </h3>

                    <p
                      className="text-base leading-relaxed mb-8"
                      style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
                    >
                      {tier.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-xs tracking-wider uppercase mb-4" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#9A7B3C" }}>
                        What's Covered
                      </p>
                      {tier.covers.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#9A7B3C" }} />
                          <span
                            className="text-sm"
                            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
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
        <section className="py-16 lg:py-24 px-4" style={{ background: "#EDE7DC" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                Coverage That Goes <span className="italic" style={{ color: "#9A7B3C" }}>Beyond</span> the Industry Standard
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl p-6 lg:p-8 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(154,123,60,0.12)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  <h3
                    className="text-lg mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#6A6058" }}
                  >
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Quote */}
        <section className="py-16 lg:py-24 px-4" style={{ background: "linear-gradient(180deg, #EDE7DC 0%, #F3EDE4 100%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-2xl sm:text-3xl mb-8"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
            >
              Why We Stand Behind <span className="italic" style={{ color: "#9A7B3C" }}>Our Work</span>
            </h2>

            <blockquote className="relative">
              <div className="text-6xl absolute -top-4 left-0" style={{ fontFamily: "'DM Serif Display', serif", color: "rgba(154,123,60,0.2)" }}>"</div>
              <p
                className="text-base sm:text-lg leading-relaxed italic pl-8 pr-4"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
              >
                Matlock Custom Homes is committed to using premium-quality materials and applying expert building practices that meet the highest standards. Our craftsmanship is designed to last, and Matlock Shield is proof of that confidence.
              </p>
            </blockquote>

            <div className="mt-8">
              <p className="text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}>
                — Matlock Custom Homes Team
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 px-4" style={{ background: "#F3EDE4" }}>
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="rounded-2xl p-8 lg:p-12"
              style={{
                background: "linear-gradient(135deg, #2A2520 0%, #3A3530 100%)",
                border: "1px solid rgba(154,123,60,0.25)",
              }}
            >
              <h2
                className="text-white text-3xl sm:text-4xl mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Ready to Build with <span className="italic" style={{ color: "#C5A55A" }}>Confidence?</span>
              </h2>
              <p
                className="text-base mb-8 max-w-lg mx-auto"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}
              >
                Every Matlock Custom Homes project includes our Matlock Shield 5-10 year builder's warranty at no additional cost.
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
                  href="tel:7274855996"
                  className="flex items-center gap-2 text-white/80 hover:text-gold px-6 py-3.5 border border-white/20 hover:border-gold/50 rounded-sm transition-all duration-300 text-base tracking-wider"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Clock className="w-4 h-4" />
                  Call (727) 485-5996
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
