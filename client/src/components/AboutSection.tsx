/*
 * DESIGN: Florida Coastal Luxury
 * About: Cream background, asymmetric two-column layout.
 * Left: construction image. Right: text content with gold accents.
 * Decorative roofline SVG in top-right corner.
 */
import { useEffect, useRef, useState } from "react";
import { Shield, Award, Users } from "lucide-react";

const ABOUT_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/6y9fRzFq5GsB9uHfgUiCJi/sandbox/b3yWrbK3BjDTJ6lUpEefON-img-2_1771267584000_na1fn_bWF0bG9jay1hYm91dC1zZWN0aW9u.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnk5ZlJ6RnE1R3NCOXVIZmdVaUNKaS9zYW5kYm94L2IzeVdyYkszQmpEVEo2bFVwRWVmT04taW1nLTJfMTc3MTI2NzU4NDAwMF9uYTFmbl9iV0YwYkc5amF5MWhZbTkxZEMxelpXTjBhVzl1LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=U~Q48g3pedoqHH-0u9CSk8srm16gCJuBKGthBFKlx340Hh0aSWHKY~6LMK9UkJBmvflz8hGpKB6p0xO89Fpqk20Ps8zf8i0aN4TzAhFiwi7CPeoxTPc7kQId98JBT6x7JGlB3yyMbwR3jJK-kRkkg-0TX8xvA2j-83qJtpRScK5mXbXpbCzmoI9TwTKhU2BuXtJ2szvxsmqg21RDyWHVtZwWAvuQsxhLexsBQOHzfZWsMPxJ3ZLYO3yDXKY2nEKwtpszBM2ymt09GG7J~MGWxD84Fg7~mgMkFmEASTtZnDsYUXPgodxfEkmPkY2N7DB-zwfvCUlAt7mVnMFqnVO-oQ__";

const stats = [
  { icon: Shield, label: "Licensed & Insured", value: "Florida Certified" },
  { icon: Award, label: "Years of Experience", value: "6+" },
  { icon: Users, label: "Satisfied Clients", value: "100+" },
];

/* Decorative roofline SVG — mimics the angled lines from the Matlock logo */
function RooflineDecor() {
  return (
    <svg
      className="absolute top-8 right-8 lg:top-12 lg:right-12 w-32 h-24 lg:w-48 lg:h-36 opacity-[0.12]"
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main roof peak */}
      <path d="M10 120 L100 20 L190 120" stroke="#C5A55A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Second inner line */}
      <path d="M30 120 L100 40 L170 120" stroke="#C5A55A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Third innermost line */}
      <path d="M50 120 L100 58 L150 120" stroke="#C5A55A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function AboutSection() {
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
    <section id="about" ref={ref} className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      {/* Decorative roofline in top-right corner */}
      <RooflineDecor />

      <div className="container relative z-10">
        {/* Section Label */}
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
            About Us
          </p>
          <h2 className="text-charcoal text-3xl sm:text-4xl lg:text-5xl leading-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Making Your House <span className="text-gold italic">a Home</span>
          </h2>
          <div className="gold-divider mt-6" />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className="relative transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={ABOUT_IMG}
                alt="Matlock Custom Homes construction team reviewing blueprints on a Florida job site"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
              {/* Gold accent border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold/30 rounded-sm -z-10" />
            </div>
          </div>

          {/* Content */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transitionDelay: "400ms",
            }}
          >
            <p className="text-charcoal-light text-lg leading-relaxed mb-6" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
              Matlock Custom Homes is a professional company with many years of experience in building top-of-the-line homes, and restoring and refurbishing existing homes of any kind. We have an experienced and qualified team with the abilities and skills to get any job done right.
            </p>
            <p className="text-charcoal-light text-lg leading-relaxed mb-8" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.75 }}>
              From the first blueprint to the final walk-through, every step is guided by <strong className="text-charcoal font-medium">craftsmanship, attention to detail, and exceptional service</strong>. We look forward to working with you and making your house a home.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white rounded-sm shadow-sm transition-all duration-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${600 + i * 150}ms`,
                  }}
                >
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-charcoal font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
                  <p className="text-slate text-xs mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
