/*
 * DESIGN: Florida Coastal Luxury
 * Testimonial: Full-width image background with overlay, quote, and CTA.
 */
import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

const BG_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/6y9fRzFq5GsB9uHfgUiCJi/sandbox/b3yWrbK3BjDTJ6lUpEefON-img-4_1771267573000_na1fn_bWF0bG9jay1wcm9jZXNzLWJn.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnk5ZlJ6RnE1R3NCOXVIZmdVaUNKaS9zYW5kYm94L2IzeVdyYkszQmpEVEo2bFVwRWVmT04taW1nLTRfMTc3MTI2NzU3MzAwMF9uYTFmbl9iV0YwYkc5amF5MXdjbTlqWlhOekxXSm4uanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Gk3mgKYeRg-LMUyVRfMWjXfcX3V1I5WdbLEreyA~0~X1zO2nX4NIh2MWtncr0Dzjv0FgP3j6J0O-ZcGepfIV~zwTCU2WmulobD70KynXY20Y-osRyOeb4fiVLXa1aKEko-6AQH25AB8fkEk1Rv9VR5aFn8V6LFj63DkJk-RVd~OV8uRX9iIeK1bkBEwQFZmAlf-lXLnpqPPecrW57tfJhQhBDcCjN9wup1aR-vF5xhxmSx658IBGXPRPHuMF9e~YY2Eo7QRbgzG~2sgYio1okSPsCx2LO1mKM3dx2OsDjvqzpxoLiVRRo8JM41noKuXuPCrowtTnY8nsykOIADALhw__";

export default function TestimonialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={BG_IMG} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Quote Icon */}
          <Quote
            className="w-12 h-12 text-gold/40 mx-auto mb-8 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          />

          {/* Testimonial Text */}
          <blockquote
            className="text-white text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-8 transition-all duration-700"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            "Matlock Custom Homes exceeded our expectations at every turn. Their attention to detail and commitment to quality made our dream home a reality. We couldn't be happier."
          </blockquote>

          <div className="gold-divider mx-auto mb-6" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.5s" }} />

          {/* Attribution */}
          <p
            className="text-gold text-sm tracking-[0.2em] uppercase transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, opacity: visible ? 1 : 0, transitionDelay: "600ms" }}
          >
            Satisfied Homeowner
          </p>
          <p
            className="text-white/50 text-sm mt-1 transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, opacity: visible ? 1 : 0, transitionDelay: "700ms" }}
          >
            New Port Richey, FL
          </p>
        </div>
      </div>
    </section>
  );
}
