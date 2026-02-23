import { Hammer, ArrowRight } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  { title: "Complete Home Remodels", description: "Full-scale interior and exterior transformations that modernize every aspect of your home — from the foundation to the finishes — while preserving the character you love." },
  { title: "Structural Reconfiguration", description: "Open up floor plans, remove or add walls, raise ceilings, and completely reconfigure your home's layout to create the flow and functionality of a modern build." },
  { title: "Full System Upgrades", description: "Comprehensive electrical rewiring, plumbing replacement, HVAC modernization, and insulation upgrades to bring your entire home up to current building standards." },
  { title: "Complete Exterior Overhaul", description: "New siding, stucco, windows, roofing, and outdoor living spaces — a total exterior transformation that boosts curb appeal and protects your investment for decades." },
  { title: "Modern Living Redesign", description: "Reimagine your entire living space with contemporary open-concept layouts, updated kitchens, renovated bathrooms, and cohesive design throughout every room." },
  { title: "Aging-in-Place Conversions", description: "Full-home accessibility upgrades including wider doorways, walk-in showers, grab bars, single-floor living modifications, and universal design principles applied throughout." },
];

const processSteps = [
  { number: "01", title: "Whole-Home Assessment", description: "We conduct a thorough evaluation of your entire property — structure, systems, layout, and condition — to understand the full scope of the remodel and identify opportunities." },
  { number: "02", title: "Design & Master Plan", description: "A comprehensive remodel plan is developed covering every room, system, and finish. You'll approve the full design, materials, and project timeline before work begins." },
  { number: "03", title: "Permitting & Engineering", description: "We handle all necessary permits, structural engineering, and inspections required by local authorities, ensuring your remodel meets all current building codes." },
  { number: "04", title: "Demolition & Preparation", description: "Controlled demolition of existing interiors and structures with proper containment and debris removal. We prepare the entire home for its transformation." },
  { number: "05", title: "Construction & Build-Out", description: "Expert construction across every trade — framing, electrical, plumbing, HVAC, drywall, flooring, cabinetry, and finishes — with regular progress updates throughout." },
  { number: "06", title: "Final Walkthrough & Handover", description: "A detailed walkthrough of your fully remodeled home ensures every detail is perfect. We clean up completely and hand you the keys to what feels like a brand-new home." },
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
            See the whole-home transformations we deliver. Every remodel starts with a vision and ends with a home that feels brand new.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Whole Home Before & After */}
          <div className="group relative overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/nBZGddAndSoWnTtO.jpeg"
              alt="Whole home remodel — complete interior transformation"
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
                Complete Interior Transformation
              </p>
              <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                A dated home completely reimagined with modern finishes, open-concept layout, and updated systems throughout.
              </p>
            </div>
          </div>

          {/* Exterior Overhaul */}
          <div className="group relative overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
            <img
              src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80"
              alt="Whole home remodel — complete exterior and interior overhaul"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs tracking-wider uppercase"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, background: "rgba(197, 165, 90, 0.9)", color: "#1E1A16" }}
                >
                  Full Remodel
                </span>
              </div>
              <p className="text-white text-xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Whole-Home Modernization
              </p>
              <p className="text-white/70 text-sm mt-1" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                A complete top-to-bottom remodel transforming an outdated property into a modern, move-in-ready home.
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
      title="Whole Home Remodels"
      subtitle="Transform Your Entire Home"
      heroDescription="We specialize in complete home remodels — transforming your existing property from top to bottom. Not a patch here or a fix there, but a full-scale renovation that makes your home feel brand new."
      heroImage="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&q=80"
      features={features}
      processSteps={processSteps}
      additionalContent={
        <>
          <BeforeAfterGallery />
          <section className="py-20 lg:py-28 px-4" style={{ background: "#EDE7DC" }}>
            <div className="max-w-3xl mx-auto text-center">
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
                Not Sure Whether to <span className="italic" style={{ color: "#9A7B3C" }}>Renovate or Rebuild?</span>
              </h2>
              <p
                className="text-base max-w-2xl mx-auto mb-8"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
              >
                Many Florida homeowners face this decision. Use our free calculator to get a side-by-side cost comparison and expert recommendation.
              </p>
              <div className="w-16 h-px mx-auto mb-10" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />

              {/* Gold CTA Card */}
              <a
                href="/tools/renovate-or-rebuild"
                className="group inline-flex items-center gap-4 rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 text-left max-w-lg mx-auto"
                style={{
                  background: "linear-gradient(135deg, #2A2520 0%, #3A3530 100%)",
                  border: "1px solid rgba(197,165,90,0.3)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  padding: "20px 28px",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: "rgba(197,165,90,0.15)", border: "1px solid rgba(197,165,90,0.3)" }}
                >
                  <Hammer className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-white text-lg mb-1"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    Renovate or Rebuild Calculator
                  </h4>
                  <p
                    className="text-white/45 text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                  >
                    Get instant cost estimates for both options
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </a>
            </div>
          </section>
        </>
      }
    />
  );
}
