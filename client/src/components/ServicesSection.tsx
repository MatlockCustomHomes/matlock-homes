/*
 * DESIGN: Florida Coastal Luxury — Bright tone
 * Services: Light warm background, service cards with hover effects.
 * Features: Custom Homes, Renovations, Kitchen, Bathroom, Demolition, Flooring.
 * Learn More links route to individual service pages.
 */
import { useEffect, useRef, useState } from "react";
import { Home, Hammer, ChefHat, Bath, Building2, Layers, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

const RENOVATION_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/6y9fRzFq5GsB9uHfgUiCJi/sandbox/b3yWrbK3BjDTJ6lUpEefON-img-3_1771267584000_na1fn_bWF0bG9jay1yZW5vdmF0aW9uLXNob3djYXNl.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnk5ZlJ6RnE1R3NCOXVIZmdVaUNKaS9zYW5kYm94L2IzeVdyYkszQmpEVEo2bFVwRWVmT04taW1nLTNfMTc3MTI2NzU4NDAwMF9uYTFmbl9iV0YwYkc5amF5MXlaVzV2ZG1GMGFXOXVMWE5vYjNkallYTmwuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=SiINyIuLlbHw-vJB0MaqIf~3NpiJ1Zh~Kxys~0jQc4-gJXctd9t5SnJB2shBkDp4tyEBwULvxyGBrp1OPL3849iLEIl~aRIZo1s4wADaSBjRb6fv7K3~XFW~sizQCMI58B3DTYNWd~fUVfsxdEkI7TiYXHyceuIbE7l7nTREEU8-eQ5QRY5u--CEAfmpn2v8isykZqQVD49BJJpYS5hwxM99N5vLzTigeIByM0YIT9Ee8aaz6H1n7779jpE-GtS9e-GoPTsK448wmVwonmni7P4bfjx3UgwfixdY-4lCcYNcf8Jyi6EvQraA6fVeU2OjB3amGGGev-XuKihPbTn8Jg__";

const services = [
  {
    icon: Home,
    title: "Custom Home Building",
    description: "We specialize in building custom, high-quality new homes designed to fit your lifestyle and vision. From the first blueprint to the final walk-through, every step is guided by craftsmanship and exceptional service.",
    number: "01",
    href: "/services/custom-home-building",
  },
  {
    icon: Hammer,
    title: "Home Renovations",
    description: "Taking what is already there and customizing it exactly to your liking. We take the old and make it modern, fix what is broken and make it new, and bring your ideas to reality.",
    number: "02",
    href: "/services/home-renovations",
  },
  {
    icon: ChefHat,
    title: "Kitchen Remodeling",
    description: "Turn your vision of the perfect kitchen into reality. From backsplashes to full kitchen overhauls, we upgrade appliances, countertops, cabinetry, and much more.",
    number: "03",
    href: "/services/kitchen-remodeling",
  },
  {
    icon: Bath,
    title: "Bathroom Renovations",
    description: "The bathroom is one of the most used rooms in any home. At Matlock Homes, we renovate nearly every aspect of it to create a space that is both beautiful and functional.",
    number: "04",
    href: "/services/bathroom-renovations",
  },
  {
    icon: Building2,
    title: "Demolition Services",
    description: "Commercial and residential demolition with precision and professionalism. From site assessment to debris removal, we safely and efficiently dismantle structures for new developments.",
    number: "05",
    href: "/services/demolition-services",
  },
  {
    icon: Layers,
    title: "Flooring Services",
    description: "Expert floor planning, removal, and installation services. From hardwood and tile to luxury vinyl, we deliver beautiful, durable floors that transform every room in your home.",
    number: "06",
    href: "/services/flooring-services",
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
    <section
      id="services"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#F3EDE4" }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A55A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            Our Services
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight transition-all duration-700"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "150ms" }}
          >
            What We <span className="italic" style={{ color: "#9A7B3C" }}>Offer</span>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }} />
        </div>

        {/* Before/After Showcase */}
        <div
          className="mb-20 overflow-hidden rounded-xl transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: "300ms", boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
        >
          <img
            src={RENOVATION_IMG}
            alt="Before and after kitchen renovation by Matlock Custom Homes"
            className="w-full h-[300px] lg:h-[400px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.number}
              className="group relative rounded-xl p-8 hover:-translate-y-1 transition-all duration-500"
              style={{
                background: "white",
                border: "1px solid rgba(197, 165, 90, 0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s ease",
                transitionDelay: `${400 + i * 100}ms`,
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
              {/* Number */}
              <span
                className="absolute top-4 right-4 text-6xl font-bold transition-colors duration-500"
                style={{ fontFamily: "'DM Serif Display', serif", color: "rgba(197, 165, 90, 0.08)" }}
              >
                {service.number}
              </span>

              <service.icon className="w-8 h-8 mb-5" style={{ color: "#9A7B3C" }} />
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                {service.title}
              </h3>
              <p
                className="leading-relaxed mb-5"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.8, color: "#5C5549", fontSize: "1rem" }}
              >
                {service.description}
              </p>
              <a
                href={service.href}
                onClick={(e) => {
                  e.preventDefault();
                  setLocation(service.href);
                  window.scrollTo(0, 0);
                }}
                className="inline-flex items-center gap-2 text-sm tracking-wider uppercase hover:gap-3 transition-all duration-300"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, color: "#9A7B3C" }}
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
