/*
 * DESIGN: Florida Coastal Luxury
 * Why Choose Us: Similar to VersaHomes "What makes us stress free" section.
 * Left: feature grid with icons. Right: descriptive text + images.
 * Below images: Gold CTA button linking to the Lot Feasibility tool page.
 */
import { useEffect, useRef, useState } from "react";
import { DollarSign, Headphones, CalendarCheck, Camera, Wrench, ThumbsUp, MapPin, ArrowRight } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Honest, upfront pricing with no hidden costs or surprise fees.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Direct communication with our team throughout your entire project.",
  },
  {
    icon: CalendarCheck,
    title: "On-Time Delivery",
    description: "We commit to timelines and deliver your project when promised.",
  },
  {
    icon: Camera,
    title: "Progress Updates",
    description: "Regular photo and video updates so you always know the status.",
  },
  {
    icon: Wrench,
    title: "Quality Craftsmanship",
    description: "Every detail is executed with precision and the highest standards.",
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guaranteed",
    description: "We don't stop until you're completely happy with the result.",
  },
];

export default function WhyChooseSection() {
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
    <section ref={ref} className="relative bg-white py-24 lg:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Features Grid */}
          <div>
            <p
              className="text-gold text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700"
              style={{ fontFamily: "'Outfit', sans-serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
            >
              Why Choose Us
            </p>
            <h2
              className="text-charcoal text-3xl sm:text-4xl lg:text-5xl leading-tight mb-12 transition-all duration-700"
              style={{ fontFamily: "'DM Serif Display', serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "150ms" }}
            >
              What Makes Us <span className="text-gold italic">Different</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="group transition-all duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${300 + i * 100}ms`,
                  }}
                >
                  <div className="w-14 h-14 rounded-full border-2 border-sand flex items-center justify-center mb-4 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3
                    className="text-charcoal text-lg mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-slate text-sm leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content + Images */}
          <div
            className="transition-all duration-1000"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transitionDelay: "400ms" }}
          >
            <h3
              className="text-charcoal text-2xl lg:text-3xl mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              A Building Experience <span className="text-gold italic">You Can Trust.</span>
            </h3>
            <div className="gold-divider mb-6" />
            <p
              className="text-slate text-base leading-relaxed mb-6"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.75 }}
            >
              Matlock Custom Homes will take care of your project from start to finish. From design to construction, we take care of everything so you can focus on what matters most to you.
            </p>
            <p
              className="text-slate text-base leading-relaxed mb-8"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.75 }}
            >
              Avoid common project pitfalls that can derail your schedule with delays, miscommunication, and inflated costs. Our proven process and expert team are dedicated to delivering your project <strong className="text-charcoal font-medium">on-time and on-budget</strong>.
            </p>

            {/* Two Images */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="overflow-hidden rounded-sm">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/NAVAtmSzCiCuIpvd.jpeg"
                  alt="Matlock Custom Homes team reviewing blueprints on site"
                  className="w-full h-48 lg:h-56 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-sm">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/kDhujZfRzNPRFtGx.jpeg"
                  alt="Byron Matlock and the Matlock Custom Homes construction crew"
                  className="w-full h-48 lg:h-56 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Lot Feasibility CTA Button */}
            <a
              href="/tools/lot-feasibility"
              className="group block rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #2A2520 0%, #3A3530 100%)",
                border: "1px solid rgba(197,165,90,0.25)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <div className="px-6 py-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(197,165,90,0.15)", border: "1px solid rgba(197,165,90,0.3)" }}
                >
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-white text-base mb-0.5"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    Can You Build on Your Lot?
                  </h4>
                  <p
                    className="text-white/45 text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                  >
                    Free preliminary feasibility check with permitting insights
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </div>
              {/* Gold accent bar at bottom */}
              <div className="h-0.5" style={{ background: "linear-gradient(90deg, #C5A55A, rgba(197,165,90,0.3), #C5A55A)" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
