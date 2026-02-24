/*
 * DESIGN: Florida Coastal Luxury — Bright Service Pages
 * ServicePageLayout: Reusable layout for individual service detail pages.
 * Light warm background with white cards, gold accents for attention-grabbing design.
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

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

interface ServicePageProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  heroDescription: string;
  heroImage: string;
  heroVideo?: string;
  features: ServiceFeature[];
  processSteps: ProcessStep[];
  galleryImages?: GalleryImage[];
  additionalContent?: React.ReactNode;
}

export default function ServicePageLayout({
  icon: Icon,
  title,
  subtitle,
  heroDescription,
  heroImage,
  heroVideo,
  features,
  processSteps,
  galleryImages,
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
        {/* Hero — keeps dark cinematic feel */}
        <section className="relative py-20 lg:py-28 px-4 overflow-hidden" style={{ backgroundColor: "#1a1714" }}>
          <div className="absolute inset-0">
            {heroVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            ) : (
              <img
                src={heroImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-charcoal/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-transparent to-charcoal/70" />
          </div>

          <div
            className="max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >

            <h1
              className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {title.split(" ").slice(0, -1).join(" ")}
              <br />
              <span className="text-gold italic">{title.split(" ").slice(-1)}</span>
            </h1>

            <p
              className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10"
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

        {/* Features Grid — BRIGHT warm background */}
        <section className="py-20 lg:py-28 px-4" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F3EDE4 100%)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-sm tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}
              >
                What We Offer
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                Our <span className="italic" style={{ color: "#9A7B3C" }}>Capabilities</span>
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="rounded-xl p-7 transition-all duration-500 group hover:-translate-y-1"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease",
                    transitionDelay: `${200 + i * 100}ms`,
                    background: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 mb-4 group-hover:scale-110 transition-transform" style={{ color: "#9A7B3C" }} />
                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps — slightly darker warm tone */}
        <section className="py-20 lg:py-28 px-4" style={{ background: "linear-gradient(180deg, #F3EDE4 0%, #EDE7DC 100%)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-sm tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}
              >
                Our Process
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                How It <span className="italic" style={{ color: "#9A7B3C" }}>Works</span>
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
            </div>

            <div className="space-y-6">
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
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: "2px solid rgba(154,123,60,0.3)",
                      background: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: "'DM Serif Display', serif", color: "#9A7B3C" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1 pb-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Construction Gallery */}
        {galleryImages && galleryImages.length > 0 && (
          <section className="py-20 lg:py-28 px-4" style={{ background: "linear-gradient(180deg, #EDE7DC 0%, #FAF7F2 100%)" }}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <p
                  className="text-sm tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}
                >
                  Our Work
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                >
                  From the <span className="italic" style={{ color: "#9A7B3C" }}>Job Site</span>
                </h2>
                <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl overflow-hidden"
                    style={{
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? "translateY(0)" : "translateY(20px)",
                      transition: "all 0.7s ease",
                      transitionDelay: `${200 + i * 120}ms`,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4"
                      style={{ background: "linear-gradient(transparent, rgba(42,37,32,0.85))" }}
                    >
                      <p
                        className="text-white text-sm"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400 }}
                      >
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Additional Content (optional) */}
        {additionalContent}

        {/* CTA Section — dark contrast block */}
        <section className="py-20 lg:py-28 px-4" style={{ background: "#EDE7DC" }}>
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl p-8 lg:p-12 text-center"
              style={{
                background: "linear-gradient(135deg, #2A2520 0%, #3A3530 100%)",
                border: "1px solid rgba(154,123,60,0.25)",
              }}
            >
              <h2
                className="text-white text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Ready to Get <span className="italic" style={{ color: "#C5A55A" }}>Started?</span>
              </h2>
              <p
                className="text-base mb-8 max-w-lg mx-auto"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}
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
