/*
 * DESIGN: Florida Coastal Luxury
 * Our Story: Light cream background, bordered photo of Byron,
 * compact side-by-side layout.
 */
import { useEffect, useRef, useState } from "react";
import { Hammer, Heart, Star } from "lucide-react";

const BYRON_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/pBkSURVwQmQuOnkN.jpg";

export default function OurStorySection() {
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
    <section
      ref={ref}
      className="relative py-14 lg:py-20 px-4"
      style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F3EDE4 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div
          className="text-center mb-8 lg:mb-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}
          >
            Our Story
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
          >
            Meet <span className="italic" style={{ color: "#9A7B3C" }}>Byron Matlock</span>
          </h2>
          <div className="w-16 h-0.5 mx-auto mt-4" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
        </div>

        {/* Two Column Layout — compact, side by side */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Photo with border */}
          <div
            className="relative transition-all duration-1000 flex justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="relative">
              {/* Outer decorative border */}
              <div
                className="absolute -inset-3 rounded-sm"
                style={{ border: "2px solid rgba(154, 123, 60, 0.35)" }}
              />
              {/* Gold corner accents */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: "#C5A55A" }} />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: "#C5A55A" }} />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: "#C5A55A" }} />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: "#C5A55A" }} />

              <img
                src={BYRON_IMG}
                alt="Byron Matlock, Founder & CEO of Matlock Custom Homes, standing in front of a luxury custom home"
                className="w-full max-w-[460px] h-auto object-cover rounded-sm"
                loading="lazy"
              />
            </div>
          </div>

          {/* Story Content */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "400ms",
            }}
          >
            <p
              className="text-xs tracking-[0.25em] uppercase mb-3"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C", fontWeight: 600 }}
            >
              Founder & CEO
            </p>

            <h3
              className="text-2xl sm:text-3xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
            >
              A Legacy Built on <span className="italic" style={{ color: "#9A7B3C" }}>Hard Work</span>
            </h3>

            <p
              className="text-base lg:text-lg leading-relaxed mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248", lineHeight: 1.75 }}
            >
              With over 20 years of experience in renovations and contracting, Byron Matlock has been immersed in the world of construction since he was a teenager, learning the trade alongside his father. What started as a family tradition became a lifelong passion — and today, Byron continues that legacy through Matlock Custom Homes.
            </p>

            <p
              className="text-base lg:text-lg leading-relaxed mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248", lineHeight: 1.75 }}
            >
              Byron isn't a sales builder, he's a <strong style={{ color: "#2A2520", fontWeight: 500 }}>structural builder</strong> who understands every phase of construction from the ground up. His hands-on approach means he's on the job site, not behind a desk. He believes in building relationships before building homes, and that philosophy is at the heart of everything Matlock Custom Homes does.
            </p>

            <p
              className="text-base lg:text-lg leading-relaxed mb-6"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248", lineHeight: 1.75 }}
            >
              Byron's unwavering commitment to excellence guides every project he undertakes across the Tampa Bay area and surrounding regions.
            </p>

            {/* Values */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Hammer, label: "20+ Years", sub: "Experience" },
                { icon: Heart, label: "Family", sub: "Legacy" },
                { icon: Star, label: "Hands-On", sub: "Builder" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="text-center p-3 rounded-sm transition-all duration-700"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(154,123,60,0.15)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${600 + i * 150}ms`,
                  }}
                >
                  <item.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: "#9A7B3C" }} />
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2A2520" }}>
                    {item.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ fontFamily: "'Outfit', sans-serif", color: "#8A8078" }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
