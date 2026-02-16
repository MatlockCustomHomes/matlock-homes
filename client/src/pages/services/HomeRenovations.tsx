import { Hammer } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

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
    />
  );
}
