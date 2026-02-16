import { ChefHat } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  { title: "Custom Cabinetry", description: "Handcrafted or semi-custom cabinets designed to maximize storage and complement your kitchen's aesthetic. Soft-close hardware and premium finishes standard." },
  { title: "Countertop Installation", description: "Granite, quartz, marble, and butcher block options expertly measured, fabricated, and installed for a perfect fit and stunning finish." },
  { title: "Backsplash Design", description: "From classic subway tile to intricate mosaic patterns, we design and install backsplashes that tie your entire kitchen together." },
  { title: "Appliance Upgrades", description: "Professional-grade appliance installation including gas line work, electrical upgrades, and ventilation systems for your new kitchen equipment." },
  { title: "Lighting Design", description: "Layered lighting plans with under-cabinet LEDs, pendant fixtures, recessed lighting, and dimmer controls to set the perfect mood." },
  { title: "Flooring & Finishes", description: "Durable, beautiful flooring options including tile, hardwood, and luxury vinyl that stand up to kitchen traffic while looking stunning." },
];

const processSteps = [
  { number: "01", title: "Kitchen Consultation", description: "We assess your current kitchen, discuss your cooking habits, storage needs, and design preferences. We'll measure everything and photograph the space for planning." },
  { number: "02", title: "Design & Material Selection", description: "Choose from our curated selection of cabinets, countertops, tiles, fixtures, and hardware. We create detailed 3D renderings so you can visualize the final result." },
  { number: "03", title: "Pre-Construction Planning", description: "We coordinate material deliveries, schedule trades, and set up a temporary kitchen area so you can still prepare meals during construction." },
  { number: "04", title: "Demolition & Rough Work", description: "Careful removal of existing cabinets, countertops, and fixtures. Plumbing and electrical are updated or relocated as needed." },
  { number: "05", title: "Installation & Finishing", description: "New cabinets, countertops, backsplash, flooring, and fixtures are installed with precision. Every joint, seam, and edge is perfected." },
  { number: "06", title: "Final Details & Cleanup", description: "Hardware installation, touch-ups, appliance hookups, and a thorough cleaning. Your dream kitchen is ready to use." },
];

export default function KitchenRemodeling() {
  return (
    <ServicePageLayout
      icon={ChefHat}
      title="Kitchen Remodeling"
      subtitle="Heart of the Home"
      heroDescription="Turn your vision of the perfect kitchen into reality. From backsplashes to full kitchen overhauls, we upgrade every detail to create a space you'll love."
      heroImage="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
      features={features}
      processSteps={processSteps}
    />
  );
}
