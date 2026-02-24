/*
 * DESIGN: Florida Coastal Luxury
 * Process: Cream background with large serif step numbers.
 * 4-step process with icons, descriptions, and real construction photos.
 */
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Ruler, HardHat, KeyRound } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Consultation",
    description: "We start by understanding your vision, needs, and budget. Our team meets with you to discuss your dream project and create a plan that works.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/sDJygKBoYnbAYgUL.jpg",
    imageAlt: "Foundation pour and site preparation",
  },
  {
    icon: Ruler,
    number: "02",
    title: "Design & Planning",
    description: "Our experts develop detailed plans and blueprints. We handle permitting, regulations, and all the paperwork so you can focus on the exciting parts.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/CUkgHfDNuiLlEZow.jpg",
    imageAlt: "Block wall construction with crew and crane",
  },
  {
    icon: HardHat,
    number: "03",
    title: "Construction",
    description: "Our skilled team brings your vision to life with precision craftsmanship. We keep you informed every step of the way with regular updates.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/SHDjuvTKBvLxGkII.jpg",
    imageAlt: "Active construction site with crane and framing",
  },
  {
    icon: KeyRound,
    number: "04",
    title: "Final Walkthrough",
    description: "We complete a thorough inspection together, ensuring every detail meets our high standards and your expectations before handing over the keys.",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/ZzDzQRWwAYHzVoJZ.jpg",
    imageAlt: "Completed exterior with roofing and stone accents",
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

        {/* Process Steps — alternating layout with photos */}
        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={step.number}
                className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: "all 0.8s ease",
                  transitionDelay: `${300 + i * 200}ms`,
                }}
              >
                {/* Text Content */}
                <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative">
                    {/* Large Background Number */}
                    <span
                      className="absolute -top-8 -left-2 text-[100px] lg:text-[140px] font-bold text-charcoal/[0.04] leading-none select-none"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {step.number}
                    </span>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-16 h-16 mb-5 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <step.icon className="w-7 h-7 text-gold" />
                      </div>

                      <h3
                        className="text-charcoal text-2xl lg:text-3xl mb-4"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-slate text-base leading-relaxed max-w-md"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photo */}
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative group rounded-xl overflow-hidden" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    {/* Gold accent border */}
                    <div className="absolute inset-0 rounded-xl" style={{ border: "1px solid rgba(154,123,60,0.15)" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
