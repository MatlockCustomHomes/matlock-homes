import { Home } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import RenovateOrRebuild from "@/components/RenovateOrRebuild";

const features = [
  { title: "Fully Custom Designs", description: "Every home is designed from scratch to match your lifestyle, preferences, and lot specifications. No cookie-cutter plans — just your vision brought to life." },
  { title: "Premium Materials", description: "We source only the highest quality materials from trusted suppliers, ensuring your home is built to last with superior finishes throughout." },
  { title: "Energy Efficient", description: "Modern insulation, impact windows, energy-efficient HVAC systems, and smart home integration to reduce your utility costs and environmental footprint." },
  { title: "Florida-Ready Construction", description: "Built to withstand Florida's unique climate with hurricane-rated construction, proper drainage, and moisture-resistant materials." },
  { title: "Transparent Pricing", description: "Detailed cost breakdowns with no hidden fees. You'll know exactly where every dollar goes before construction begins." },
  { title: "Matlock Shield Warranty", description: "Every custom home includes our Matlock Shield 5-10 year builder's warranty — 5 years on workmanship and materials, plus 10 years of structural defect protection." },
];

const processSteps = [
  { number: "01", title: "Initial Consultation", description: "We meet to discuss your vision, budget, timeline, and lot details. This free consultation helps us understand exactly what you're looking for and whether we're the right fit." },
  { number: "02", title: "Design & Planning", description: "Our team works with architects and designers to create detailed blueprints and 3D renderings. You'll select materials, finishes, and fixtures during this phase." },
  { number: "03", title: "Permitting & Approvals", description: "We handle all permits, zoning requirements, and regulatory approvals. Our team is well-versed in local building codes across Tampa Bay Area." },
  { number: "04", title: "Site Preparation", description: "Lot clearing, grading, and foundation work begins. We ensure proper drainage and a solid foundation for your new home." },
  { number: "05", title: "Construction", description: "Framing, roofing, rough-ins (plumbing, electrical, HVAC), and exterior work. You'll receive regular photo and video updates throughout." },
  { number: "06", title: "Interior Finishes", description: "Drywall, flooring, cabinetry, countertops, painting, and fixture installation. This is where your home truly comes to life." },
  { number: "07", title: "Final Walkthrough & Delivery", description: "A comprehensive walkthrough to ensure every detail meets your expectations. We address any items before handing over the keys to your dream home." },
];

const renovateOrRebuildSection = (
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
);

export default function CustomHomeBuilding() {
  return (
    <ServicePageLayout
      icon={Home}
      title="Custom Home Building"
      subtitle="Our Signature Service"
      heroDescription="From the first blueprint to the final walk-through, we build custom homes designed to fit your lifestyle and vision with uncompromising craftsmanship."
      heroImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
      features={features}
      processSteps={processSteps}
      additionalContent={renovateOrRebuildSection}
    />
  );
}
