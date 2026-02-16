/*
 * DESIGN: Florida Coastal Luxury
 * ServicePageLayout: Reusable layout for individual service detail pages.
 * Hero with icon + title, features list, process steps, CTA.
 */
import { useEffect, useState } from "react";
import { ArrowRight, Phone, CheckCircle2, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceFeature {
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServicePageProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  heroDescription: string;
  heroImage: string;
  features: ServiceFeature[];
  processSteps: ProcessStep[];
  additionalContent?: React.ReactNode;
}

export default function ServicePageLayout({
  icon: Icon,
  title,
  subtitle,
  heroDescription,
  heroImage,
  features,
  processSteps,
  additionalContent,
}: ServicePageProps) {
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
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/85" />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
          </div>

          <div
            className="max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-8">
              <Icon className="w-4 h-4 text-gold" />
              <span
                className="text-gold text-sm tracking-wider uppercase"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {subtitle}
              </span>
            </div>

            <h1
              className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {title.split(" ").slice(0, -1).join(" ")}
              <br />
              <span className="text-gold italic">{title.split(" ").slice(-1)}</span>
            </h1>

            <p
              className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              {heroDescription}
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
                Get a Free Quote
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
        </section>

        {/* Features Grid */}
        <section className="py-20 lg:py-28 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-gold text-sm tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                What We Offer
              </p>
              <h2
                className="text-white text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Our <span className="text-gold italic">Capabilities</span>
              </h2>
              <div className="gold-divider mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-7 hover:border-gold/20 transition-all duration-500 group"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease",
                    transitionDelay: `${200 + i * 100}ms`,
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-gold mb-4 group-hover:scale-110 transition-transform" />
                  <h3
                    className="text-white text-lg mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-white/50 text-sm leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 lg:py-28 px-4 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-gold text-sm tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Our Process
              </p>
              <h2
                className="text-white text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                How It <span className="text-gold italic">Works</span>
              </h2>
              <div className="gold-divider mx-auto mt-6" />
            </div>

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-6 items-start group"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateX(0)" : "translateX(-20px)",
                    transition: "all 0.7s ease",
                    transitionDelay: `${300 + i * 150}ms`,
                  }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                    <span
                      className="text-gold text-lg font-bold"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1 pb-8 border-b border-white/5 last:border-0">
                    <h3
                      className="text-white text-xl mb-2"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-white/50 text-sm leading-relaxed"
                      style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Content (optional) */}
        {additionalContent}

        {/* CTA Section */}
        <section className="py-20 lg:py-28 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/[0.03] border border-gold/20 rounded-2xl p-8 lg:p-12 text-center">
              <h2
                className="text-white text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Ready to Get <span className="text-gold italic">Started?</span>
              </h2>
              <p
                className="text-white/50 text-base mb-8 max-w-lg mx-auto"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                Contact us today for a free consultation and quote. We'll walk you through every step of the process.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#contact";
                  }}
                  className="btn-gold px-8 py-3.5 rounded-sm text-base tracking-wider inline-flex items-center gap-2"
                >
                  Contact Us <ArrowRight className="w-4 h-4" />
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
