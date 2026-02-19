import { Hammer } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import RenovateOrRebuild from "@/components/RenovateOrRebuild";

const features = [
  { title: "Whole-Home Remodels", description: "Complete interior and exterior transformations that modernize your living space while preserving the character and charm you love." },
  { title: "Room Additions", description: "Expand your living space with seamlessly integrated additions — from extra bedrooms to sunrooms, home offices, and in-law suites." },
  { title: "Structural Modifications", description: "Open up floor plans, remove or add walls, raise ceilings, and reconfigure layouts to create the flow and functionality you need." },
  { title: "Exterior Upgrades", description: "New siding, stucco, windows, roofing, and outdoor living spaces that boost curb appeal and protect your investment." },
  { title: "Electrical & Plumbing Updates", description: "Bring your home's systems up to modern standards with updated wiring, panel upgrades, re-piping, and fixture replacements." },
  { title: "Aging-in-Place Modifications", description: "Accessible design features including wider doorways, walk-in showers, grab bars, and single-floor living modifications." },
];

const processSteps = [
  { number: "01", title: "Assessment & Consultation", description: "We visit your home to assess the current condition, discuss your goals, and identify opportunities. We'll provide honest recommendations on what's possible within your budget." },
  { number: "02", title: "Design & Scope Definition", description: "Detailed plans are drawn up outlining every aspect of the renovation. You'll approve materials, finishes, and the project timeline before any work begins." },
  { number: "03", title: "Permitting", description: "We handle all necessary permits and inspections required by local authorities, ensuring your renovation meets all building codes." },
  { number: "04", title: "Demolition & Prep", description: "Careful demolition of existing structures with proper dust containment and debris removal. We protect the areas of your home not being renovated." },
  { number: "05", title: "Construction & Finishing", description: "Expert construction with regular progress updates. We coordinate all trades to keep the project on schedule and minimize disruption to your daily life." },
  { number: "06", title: "Final Inspection & Handover", description: "A thorough walkthrough ensures every detail is perfect. We clean up completely and leave your renovated space ready to enjoy." },
];

function BeforeAfterGallery() {
  return (
    <section className="py-20 lg:py-28 px-4" style={{ background: "#F3EDE4" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}
          >
            Real Results
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
          >
            Before & <span className="italic" style={{ color: "#9A7B3C" }}>After</span>
          </h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
          <p
            className="mt-6 max-w-2xl mx-auto text-lg"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5C5549" }}
          >
            See the transformations we deliver. Every project starts with a vision and ends with a space you'll love.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Kitchen Before & After */}
          <div className="group relative overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/nBZGddAndSoWnTtO.jpeg"
              alt="Kitchen renovation before and after — from outdated to modern white kitchen"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs tracking-wider uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, background: "rgba(197, 165, 90, 0.9)", color: "#1E1A16" }}
                >
                  Before & After
                </span>
              </div>
              <p className="text-white text-xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Complete Kitchen Transformation
              </p>
              <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                From worn-out walls and dated tile to a sleek, modern kitchen with new cabinetry, countertops, and appliances.
              </p>
            </div>
          </div>

          {/* Bathroom Before & After */}
          <div className="group relative overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
            <img
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80"
              alt="Bathroom renovation before and after — from outdated to modern spa-like bathroom"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs tracking-wider uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, background: "rgba(197, 165, 90, 0.9)", color: "#1E1A16" }}
                >
                  Renovation
                </span>
              </div>
              <p className="text-white text-xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Spa-Inspired Bathroom Remodel
              </p>
              <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                A dated bathroom transformed into a modern spa retreat with new tile, vanity, fixtures, and a walk-in shower.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeRenovations() {
  return (
    <ServicePageLayout
      icon={Hammer}
      title="Home Renovations"
      subtitle="Transform Your Space"
      heroDescription="Taking what is already there and customizing it exactly to your liking. We take the old and make it modern, fix what is broken and make it new."
      heroImage="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&q=80"
      features={features}
      processSteps={processSteps}
      additionalContent={
        <>
          <BeforeAfterGallery />
          <section className="py-20 lg:py-28 px-4" style={{ background: "#EDE7DC" }}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p
                  className="text-sm tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}
                >
                  Free Calculator
                </p>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                >
                  Is It Better to <span className="italic" style={{ color: "#9A7B3C" }}>Renovate or Rebuild?</span>
                </h2>
                <p
                  className="text-base max-w-2xl mx-auto"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
                >
                  Many Florida homeowners face this decision. Enter your home details below and we'll show you a side-by-side cost comparison to help you decide.
                </p>
                <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
              </div>
              <div className="max-w-xl mx-auto">
                <RenovateOrRebuild />
              </div>
            </div>
          </section>
        </>
      }
    />
  );
}
