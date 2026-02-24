/*
 * DESIGN: Florida Coastal Luxury
 * Process: Cream background with large serif step numbers.
 * 4-step process with icons and descriptions (no photos).
 */
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Ruler, HardHat, KeyRound } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Consultation",
    description: "We start by understanding your vision, needs, and budget. Our team meets with you to discuss your dream project and create a plan that works.",
  },
  {
    icon: Ruler,
    number: "02",
    title: "Design & Planning",
    description: "Our experts develop detailed plans and blueprints. We handle permitting, regulations, and all the paperwork so you can focus on the exciting parts.",
  },
  {
    icon: HardHat,
    number: "03",
    title: "Construction",
    description: "Our skilled team brings your vision to life with precision craftsmanship. We keep you informed every step of the way with regular updates.",
  },
  {
    icon: KeyRound,
    number: "04",
    title: "Final Walkthrough",
    description: "We complete a thorough inspection together, ensuring every detail meets our high standards and your expectations before handing over the keys.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={ref} className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p
            className="text-gold text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            Our Process
          </p>
          <h2
            className="text-charcoal text-3xl sm:text-4xl lg:text-5xl leading-tight transition-all duration-700"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "150ms" }}
          >
            How We <span className="text-gold italic">Build</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }} />
        </div>

        {/* Process Steps — 2x2 grid layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl p-8 lg:p-10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s ease",
                transitionDelay: `${300 + i * 150}ms`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Large Background Number */}
              <span
                className="absolute top-4 right-6 text-[80px] lg:text-[100px] font-bold text-charcoal/[0.04] leading-none select-none"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {step.number}
              </span>

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 mb-5 rounded-full bg-cream flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-gold" />
                </div>

                <h3
                  className="text-charcoal text-xl lg:text-2xl mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-slate text-base leading-relaxed"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
