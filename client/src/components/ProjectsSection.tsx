/*
 * DESIGN: Florida Coastal Luxury
 * Projects: Dark background with image gallery showcasing work.
 * Horizontal scrolling on mobile, grid on desktop.
 */
import { useEffect, useRef, useState } from "react";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/6y9fRzFq5GsB9uHfgUiCJi/sandbox/b3yWrbK3BjDTJ6lUpEefON-img-1_1771267569000_na1fn_bWF0bG9jay1oZXJvLW92ZXJsYXk.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnk5ZlJ6RnE1R3NCOXVIZmdVaUNKaS9zYW5kYm94L2IzeVdyYkszQmpEVEo2bFVwRWVmT04taW1nLTFfMTc3MTI2NzU2OTAwMF9uYTFmbl9iV0YwYkc5amF5MW9aWEp2TFc5MlpYSnNZWGsuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rySwnzK5iLXL22x2iKIB7DMyM3y7qGpPOWu5Uc8TCqtfkqBZuubWR~or~X2tbYE8R~L73vis1h1bvxv4yuyEsxXeVQ2UeUeqnPJgYO~-PdK3hulTzEgnvSAcdQMSjalbMujhTV~bw03cY7LeulwuE8gYOqTeJUUGcBo~jZgXGBhEi-qxEaHt0MAJI5xEl0~-GmM38mSIPbyrxPEF-4HY-X8beOClKdXnRsi7G8nvwH~HAmZLRLp~DF3DBklMzvHNk2E-VjTMoXydV-hK3BC2iOrJZd90A4GDWiIi7EhbH9cN1FmfUGzrGyFwcEP7-6aSBbbOa91EnKBt8NM6tATCng__";
const CTA_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/6y9fRzFq5GsB9uHfgUiCJi/sandbox/b3yWrbK3BjDTJ6lUpEefON-img-5_1771267578000_na1fn_bWF0bG9jay1jdGEtYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNnk5ZlJ6RnE1R3NCOXVIZmdVaUNKaS9zYW5kYm94L2IzeVdyYkszQmpEVEo2bFVwRWVmT04taW1nLTVfMTc3MTI2NzU3ODAwMF9uYTFmbl9iV0YwYkc5amF5MWpkR0V0WW1jLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=iBZSVoV~MXwnQHVkACpoqll-WIEeIURA4JY4kTaLV8vFl~-EPCsEWa52ej82pnN9O5sk9mB3VBdXJHasMBthb4BCm6BtRVRJsb9fo7deyizyru3hPjuM50dI2ZIqR4q8c0cKAPwgojzHD3TwqE7AKINN1eueNnI05~jMzqF2xY2yhKkdHY9dp0xS82paLHjkAZAgHgLAkgHLnhYDSBzxfXrqLro9cvj6JeJVLskVWXFWBTvXJXyfoFhR~I6FoV36BkTTEFPtGwYDhfAcqdpvpXgpv2trVObrJVleM0vKUGEeTHRXVxvzO88UXIPp3rZvl5gXnPpydhzecdwwDGXA2w__";

const projects = [
  {
    title: "Luxury Estate",
    category: "Custom Home",
    image: HERO_IMG,
  },
  {
    title: "Modern Coastal Villa",
    category: "Custom Home",
    image: CTA_IMG,
  },
  {
    title: "Kitchen Transformation",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=80",
  },
  {
    title: "Spa-Inspired Bathroom",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  },
  {
    title: "Contemporary Living",
    category: "Custom Home",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    title: "Outdoor Oasis",
    category: "Renovation",
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
            Featured <span className="text-gold italic">Work</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.3s" }} />
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s ease",
                transitionDelay: `${300 + i * 100}ms`,
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category} by Matlock Custom Homes`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {project.category}
                </p>
                <h3 className="text-white text-xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
