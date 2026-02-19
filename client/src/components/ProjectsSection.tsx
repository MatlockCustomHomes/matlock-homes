/*
 * DESIGN: Florida Coastal Luxury
 * Projects: 3 finished custom home showcases on dark background.
 */
import { useEffect, useRef, useState } from "react";
import { MapPin, Home, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "The Coastal Modern",
    location: "New Port Richey, FL",
    sqft: "3,200",
    beds: 4,
    baths: 3,
    description: "A stunning contemporary coastal home featuring open-concept living, floor-to-ceiling windows, and a chef's kitchen with premium finishes.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    title: "The Mediterranean Estate",
    location: "Trinity, FL",
    sqft: "4,500",
    beds: 5,
    baths: 4,
    description: "An elegant Mediterranean-inspired estate with a grand foyer, resort-style pool, and custom millwork throughout every room.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    title: "The Craftsman Retreat",
    location: "Tarpon Springs, FL",
    sqft: "2,800",
    beds: 3,
    baths: 3,
    description: "A warm craftsman-style home blending rustic charm with modern luxury, featuring a wrap-around porch and custom stone accents.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
];

export default function ProjectsSection() {
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
    <section id="projects" ref={ref} className="relative bg-charcoal py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-gold text-sm tracking-[0.3em] uppercase mb-3 transition-all duration-700"
            style={{ fontFamily: "'Outfit', sans-serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
          >
            Our Projects
          </p>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-5xl leading-tight transition-all duration-700"
            style={{ fontFamily: "'DM Serif Display', serif", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: "150ms" }}
          >
            Custom Homes <span className="text-gold italic">Delivered</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }} />
        </div>

        {/* 3 Project Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group relative bg-[#2A2520] rounded-sm overflow-hidden transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${300 + i * 150}ms`,
              }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - Custom Home by Matlock Custom Homes in ${project.location}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span
                    className="text-gold/80 text-xs tracking-wider uppercase"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {project.location}
                  </span>
                </div>

                <h3
                  className="text-white text-xl mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {project.title}
                </h3>

                <p
                  className="text-white/60 text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                >
                  {project.description}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-gold/70" />
                    <span className="text-white/70 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {project.sqft} sq ft
                    </span>
                  </div>
                  <span className="text-white/30">|</span>
                  <span className="text-white/70 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {project.beds} Bed / {project.baths} Bath
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "800ms" }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-gold hover:text-white text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Start Your Custom Home
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
