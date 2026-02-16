/*
 * DESIGN: Florida Coastal Luxury
 * Process: Cream background with large serif step numbers.
 * 4-step process with icons and descriptions.
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

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative text-center group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s ease",
                transitionDelay: `${300 + i * 200}ms`,
              }}
            >
              {/* Large Background Number */}
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-[120px] font-bold text-charcoal/[0.04] leading-none select-none"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {step.number}
              </span>

              {/* Icon Circle */}
              <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:shadow-gold/10 transition-all duration-500">
                <step.icon className="w-8 h-8 text-gold" />
              </div>

              {/* Connector Line (not on last item) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
              )}

              <h3
                className="text-charcoal text-xl mb-3 relative z-10"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-slate text-sm leading-relaxed max-w-xs mx-auto relative z-10"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.7 }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
