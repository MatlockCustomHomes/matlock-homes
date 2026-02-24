/*
 * DESIGN: Florida Coastal Luxury — Single Service Showcase
 * Services: Custom Home Building — New Builds & Full Rebuilds
 * Full-width hero header, two approach cards, and a CTA.
 */
import { useEffect, useRef, useState } from "react";
import { Home, Hammer, ArrowRight, Ruler, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

const approaches = [
  {
    icon: Home,
    title: "New Construction",
    description: "Build your dream home from the ground up. From concept to completion, we create homes that feel uniquely yours. ",
    highlights: ["Fully custom floor plans", "Premium materials & finishes", "Energy-efficient systems", "Florida hurricane-rated"],
  },
  {
    icon: Hammer,
    title: "Full Home Rebuilds",
    description: "Start over, without starting somewhere else. Turn your property into a one-of-a-kind home designed specifically for you. ",
    highlights: ["Complete demolition & rebuild", "Modern code compliance", "New structural systems", "Keep your existing lot"],
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="relative overflow-hidden">
      {/* Hero-style header with background image */}
      <div className="relative py-28 lg:py-36 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Luxury custom home exterior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,26,22,0.75), rgba(30,26,22,0.85))" }} />
        <div className="container relative z-10 text-center">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#C5A55A", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            What We Do
          </p>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-5xl leading-tight transition-all duration-700"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "150ms" }}
          >
            Custom Home <span className="italic" style={{ color: "#C5A55A" }}>Building</span>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }} />
          <p
            className="text-white/70 mt-6 max-w-2xl mx-auto text-lg transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "300ms" }}
          >
            We specialize in high-quality custom residences and comprehensive rebuilds across Tampa Bay, delivering refined results at every stage.
          </p>
        </div>
      </div>

      {/* Two approach cards on light background */}
      <div className="relative py-20 lg:py-28" style={{ background: "#F3EDE4" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A55A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container relative z-10">
          {/* Approach Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {approaches.map((approach, i) => (
              <div
                key={approach.title}
                className="group relative rounded-xl p-8 lg:p-10 hover:-translate-y-1 transition-all duration-500"
                style={{
                  background: "white",
                  border: "1px solid rgba(197, 165, 90, 0.12)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.7s ease",
                  transitionDelay: `${400 + i * 150}ms`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(197, 165, 90, 0.15)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(197, 165, 90, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(197, 165, 90, 0.12)";
                }}
              >
                <approach.icon className="w-8 h-8 mb-5" style={{ color: "#9A7B3C" }} />
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                >
                  {approach.title}
                </h3>
                <p
                  className="leading-relaxed mb-6"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.8, color: "#5C5549", fontSize: "1rem" }}
                >
                  {approach.description}
                </p>
                <ul className="space-y-2">
                  {approach.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#5C5549" }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C5A55A" }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom highlights bar */}
          <div
            className="max-w-5xl mx-auto rounded-xl p-8 lg:p-10 grid sm:grid-cols-3 gap-8 text-center"
            style={{
              background: "linear-gradient(135deg, #2A2520 0%, #3A3530 100%)",
              border: "1px solid rgba(197,165,90,0.2)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.7s",
            }}
          >
            <div>
              <Ruler className="w-6 h-6 mx-auto mb-3" style={{ color: "#C5A55A" }} />
              <p className="text-white text-sm font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Fully Custom Designs</p>
              <p className="text-white/50 text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>No cookie-cutter plans</p>
            </div>
            <div>
              <ShieldCheck className="w-6 h-6 mx-auto mb-3" style={{ color: "#C5A55A" }} />
              <p className="text-white text-sm font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Matlock Shield Warranty</p>
              <p className="text-white/50 text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>5-10 year builder's warranty</p>
            </div>
            <div>
              <Home className="w-6 h-6 mx-auto mb-3" style={{ color: "#C5A55A" }} />
              <p className="text-white text-sm font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Florida-Ready</p>
              <p className="text-white/50 text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>Hurricane-rated construction</p>
            </div>
          </div>

          {/* CTA */}
          <div
            className="text-center mt-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.9s",
            }}
          >
            <a
              href="/services/custom-home-building"
              onClick={(e) => {
                e.preventDefault();
                setLocation("/services/custom-home-building");
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-2 text-sm tracking-wider uppercase hover:gap-3 transition-all duration-300 px-8 py-3.5 rounded-sm"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                color: "#2A2520",
                background: "#C5A55A",
              }}
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
