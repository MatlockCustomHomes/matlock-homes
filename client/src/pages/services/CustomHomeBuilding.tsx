import { Home } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  { title: "Fully Custom Designs", description: "Every home is designed from scratch to match your lifestyle, preferences, and lot specifications. No cookie-cutter plans — just your vision brought to life." },
  { title: "Premium Materials", description: "We source only the highest quality materials from trusted suppliers, ensuring your home is built to last with superior finishes throughout." },
  { title: "Energy Efficient", description: "Modern insulation, impact windows, energy-efficient HVAC systems, and smart home integration to reduce your utility costs and environmental footprint." },
  { title: "Florida-Ready Construction", description: "Built to withstand Florida's unique climate with hurricane-rated construction, proper drainage, and moisture-resistant materials." },
  { title: "Transparent Pricing", description: "Detailed cost breakdowns with no hidden fees. You'll know exactly where every dollar goes before construction begins." },
  { title: "Matlock Shield Warranty", description: "Every custom home includes our industry-leading 3-6-11 year warranty covering workmanship, building envelope, and structural integrity." },
];

const processSteps = [
  { number: "01", title: "Initial Consultation", description: "We meet to discuss your vision, budget, timeline, and lot details. This free consultation helps us understand exactly what you're looking for and whether we're the right fit." },
  { number: "02", title: "Design & Planning", description: "Our team works with architects and designers to create detailed blueprints and 3D renderings. You'll select materials, finishes, and fixtures during this phase." },
  { number: "03", title: "Permitting & Approvals", description: "We handle all permits, zoning requirements, and regulatory approvals. Our team is well-versed in local building codes across South Florida." },
  { number: "04", title: "Site Preparation", description: "Lot clearing, grading, and foundation work begins. We ensure proper drainage and a solid foundation for your new home." },
  { number: "05", title: "Construction", description: "Framing, roofing, rough-ins (plumbing, electrical, HVAC), and exterior work. You'll receive regular photo and video updates throughout." },
  { number: "06", title: "Interior Finishes", description: "Drywall, flooring, cabinetry, countertops, painting, and fixture installation. This is where your home truly comes to life." },
  { number: "07", title: "Final Walkthrough & Delivery", description: "A comprehensive walkthrough to ensure every detail meets your expectations. We address any items before handing over the keys to your dream home." },
];

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
    />
  );
}
