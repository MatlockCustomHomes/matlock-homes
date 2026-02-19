/*
 * DESIGN: Florida Coastal Luxury
 * Warranty Page: "Matlock Shield" 5-10 Year Builder's Warranty.
 * 5 years workmanship & materials, 10 years structural defects.
 * Dark background, gold accents, editorial layout.
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
    color: "from-gold/20 to-gold/5",
    borderColor: "border-gold/30",
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
    color: "from-gold/30 to-gold/10",
    borderColor: "border-gold/40",
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
    title: "Longer Than Industry Standard",
    desc: "While many builders offer minimal 1-2 year warranties, our 5-10 year coverage gives you lasting peace of mind that your investment is protected well beyond the typical timeframe.",
  },
  {
    title: "Transparent Terms",
    desc: "No hidden surprises or exclusions buried in the fine print. You'll know exactly what's covered from day one, with clear documentation provided at closing.",
  },
  {
    title: "Superior Aftercare",
    desc: "Responsive service and dependable solutions whenever you need us. Our dedicated warranty team is just a phone call away, ready to address any concerns promptly.",
  },
  {
    title: "Full Accountability",
    desc: "Your builder should stand behind every detail of your home. We back our warranty directly — not through a third-party provider — because we're confident in our craftsmanship.",
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
              5-10 Year
              <br />
              <span className="text-gold italic">Builder's Warranty</span>
            </h1>

            <p
              className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              When building a custom home, a warranty should feel like protection — not a list of excuses. Matlock Shield is our promise that your home will be protected with the same precision and dedication it was built with.
            </p>

            {/* Warranty Badges */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="inline-flex items-center gap-4 bg-gold/10 border border-gold/30 rounded-2xl px-8 py-5">
                <span
                  className="text-gold text-5xl lg:text-6xl font-bold"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  5
                </span>
                <div className="text-left">
                  <span className="text-gold text-lg font-semibold block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Year Warranty
                  </span>
                  <span className="text-white/40 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Workmanship & Materials
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-4 bg-gold/10 border border-gold/30 rounded-2xl px-8 py-5">
                <span
                  className="text-gold text-5xl lg:text-6xl font-bold"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  10
                </span>
                <div className="text-left">
                  <span className="text-gold text-lg font-semibold block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Year Warranty
                  </span>
                  <span className="text-white/40 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Structural Defects
                  </span>
                </div>
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
                Typical warranties are designed with the builder in mind, not the homeowner. Many offer coverage that ends just as risks begin to surface, hidden clauses that limit what's actually protected, and slow or inconsistent responses when problems arise. Some builders offer as little as one year of coverage before walking away.
              </p>
              <p
                className="text-white/50 text-base leading-relaxed"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                These gaps leave families vulnerable. You deserve more than minimal coverage — you deserve confidence that lasts. That's why we created <span className="text-gold font-medium">Matlock Shield</span> with 5 years of workmanship and materials coverage and a full 10 years of structural protection.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Tiers */}
        <section className="py-16 lg:py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Your Warranty with Matlock Homes
              </p>
              <h2
                className="text-white text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Two Tiers of <span className="text-gold italic">Protection</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {warrantyTiers.map((tier, i) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.years}
                    className={`relative bg-gradient-to-b ${tier.color} border ${tier.borderColor} rounded-2xl p-8 lg:p-10 transition-all duration-700`}
                    style={{
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: `${300 + i * 200}ms`,
                    }}
                  >
                    {/* Year badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-gold" />
                      </div>
                      <div>
                        <span
                          className="text-gold text-4xl font-bold"
                          style={{ fontFamily: "'DM Serif Display', serif" }}
                        >
                          {tier.years}
                        </span>
                        <span className="text-white/40 text-sm ml-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Years
                        </span>
                      </div>
                    </div>

                    <h3
                      className="text-white text-2xl mb-3"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {tier.title}
                    </h3>

                    <p
                      className="text-white/50 text-base leading-relaxed mb-8"
                      style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                    >
                      {tier.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-gold text-xs tracking-wider uppercase mb-4" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                        What's Covered
                      </p>
                      {tier.covers.map((item) => (
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
              {benefits.map((benefit) => (
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
              Why We Stand Behind <span className="text-gold italic">Our Work</span>
            </h2>

            <blockquote className="relative">
              <div className="text-gold/30 text-6xl absolute -top-4 left-0" style={{ fontFamily: "'DM Serif Display', serif" }}>"</div>
              <p
                className="text-white/60 text-base sm:text-lg leading-relaxed italic pl-8 pr-4"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                We're confident in the homes we build. That's why Matlock Custom Homes offers a 5-10 year builder's warranty — 5 years covering every aspect of workmanship and materials, and a full 10 years protecting the structural integrity of your home. This protection is backed directly by us, not an outside provider, because we know our builds can stand the test of time.
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
