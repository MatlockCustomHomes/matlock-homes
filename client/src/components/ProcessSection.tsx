/*
 * DESIGN: Florida Coastal Luxury
 * Process: Cream background. 4 compact steps in a single row,
 * then 3 construction photos in a row underneath (3rd is before/after).
 */
import { useEffect, useRef, useState } from "react";
import { ClipboardList, Ruler, HardHat, KeyRound } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Consultation",
    description: "We understand your vision, needs, and budget to create a plan that works.",
  },
  {
    icon: Ruler,
    number: "02",
    title: "Design & Planning",
    description: "Detailed plans, blueprints, permitting, and all the paperwork handled for you.",
  },
  {
    icon: HardHat,
    number: "03",
    title: "Construction",
    description: "Precision craftsmanship with regular updates every step of the way.",
  },
  {
    icon: KeyRound,
    number: "04",
    title: "Final Walkthrough",
    description: "Thorough inspection ensuring every detail meets our high standards.",
  },
];

const photos = [
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/UNNVfejseuGJLUrW.jpeg",
    alt: "Matlock Custom Homes team handshake with homeowners",
    type: "single" as const,
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/KwqNxLlWYhqvrOPT.png",
    alt: "Active construction site with crane and block walls",
    type: "single" as const,
  },
  {
    type: "before-after" as const,
    before: {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/IBUVnvIOFPQXgexb.jpg",
      alt: "Before — newly constructed home with bare yard",
    },
    after: {
      src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/BXhcBEvSnOMXhxkW.png",
      alt: "After — completed home with landscaping and driveway",
    },
  },
];

function BeforeAfterCard({ before, after, visible, delay }: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  visible: boolean;
  delay: number;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updateSlider(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="relative group rounded-xl overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s ease",
        transitionDelay: `${delay}ms`,
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div
        ref={containerRef}
        className="aspect-[4/3] relative select-none cursor-col-resize overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* After image (full background) */}
        <img
          src={after.src}
          alt={after.alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={before.src}
            alt={before.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%", maxWidth: "none" }}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)", boxShadow: "0 0 6px rgba(0,0,0,0.4)" }}
        />

        {/* Slider handle */}
        <div
          className="absolute top-1/2 z-20 w-8 h-8 -translate-y-1/2 rounded-full bg-white shadow-lg flex items-center justify-center"
          style={{ left: `${sliderPos}%`, transform: "translate(-50%, -50%)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 2L1 7L4 12" stroke="#9A7B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 2L13 7L10 12" stroke="#9A7B3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Labels */}
        <span
          className="absolute top-3 left-3 z-10 text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded bg-black/50 text-white"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Before
        </span>
        <span
          className="absolute top-3 right-3 z-10 text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded bg-black/50 text-white"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          After
        </span>
      </div>

      {/* Subtle gold border on hover */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-gold/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={ref} className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
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

        {/* 4 Steps — single horizontal row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s ease",
                transitionDelay: `${300 + i * 120}ms`,
              }}
            >
              {/* Icon circle */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
                <step.icon className="w-6 h-6 text-gold" />
              </div>

              {/* Step number */}
              <span
                className="text-gold text-xs tracking-[0.2em] uppercase mb-1 block"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Step {step.number}
              </span>

              {/* Title */}
              <h3
                className="text-charcoal text-lg mb-2"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-slate text-sm leading-relaxed max-w-[220px] mx-auto"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.7 }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Photos — row underneath */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {photos.map((photo, i) => {
            if (photo.type === "before-after") {
              return (
                <BeforeAfterCard
                  key={i}
                  before={photo.before!}
                  after={photo.after!}
                  visible={visible}
                  delay={800 + i * 150}
                />
              );
            }
            return (
              <div
                key={i}
                className="relative group rounded-xl overflow-hidden"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.8s ease",
                  transitionDelay: `${800 + i * 150}ms`,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src!}
                    alt={photo.alt!}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                {/* Subtle gold border on hover */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-gold/20 transition-colors duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
