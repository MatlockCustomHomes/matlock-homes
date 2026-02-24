import { Home } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  { title: "New Construction", description: "Build your dream home from the ground up on your own lot. Every detail is designed to match your lifestyle, preferences, and specifications — no cookie-cutter plans." },
  { title: "Full Home Rebuilds", description: "Tear down and rebuild on your existing property. Get a brand-new, modern home with current building codes, energy efficiency, and hurricane-rated construction on the lot you already love." },
  { title: "Premium Materials", description: "We source only the highest quality materials from trusted suppliers, ensuring your home is built to last with superior finishes throughout." },
  { title: "Energy Efficient", description: "Modern insulation, impact windows, energy-efficient HVAC systems, and smart home integration to reduce your utility costs and environmental footprint." },
  { title: "Florida-Ready Construction", description: "Built to withstand Florida's unique climate with hurricane-rated construction, proper drainage, and moisture-resistant materials." },
  { title: "Matlock Shield Warranty", description: "Every custom home includes our Matlock Shield 5-10 year builder's warranty — 5 years on workmanship and materials, plus 10 years of structural defect protection." },
];

const processSteps = [
  { number: "01", title: "Initial Consultation", description: "We meet to discuss your vision, budget, timeline, and lot details. Whether you're building new or rebuilding on your existing property, this free consultation helps us understand exactly what you're looking for." },
  { number: "02", title: "Design & Planning", description: "Our team works with architects and designers to create detailed blueprints and 3D renderings. You'll select materials, finishes, and fixtures during this phase." },
  { number: "03", title: "Permitting & Approvals", description: "We handle all permits, zoning requirements, and regulatory approvals. Our team is well-versed in local building codes across Tampa Bay Area." },
  { number: "04", title: "Site Preparation", description: "Lot clearing, grading, and foundation work begins. For rebuilds, this includes demolition of the existing structure. We ensure proper drainage and a solid foundation." },
  { number: "05", title: "Construction", description: "Framing, roofing, rough-ins (plumbing, electrical, HVAC), and exterior work. You'll receive regular photo and video updates throughout." },
  { number: "06", title: "Interior Finishes", description: "Drywall, flooring, cabinetry, countertops, painting, and fixture installation. This is where your home truly comes to life." },
  { number: "07", title: "Final Walkthrough & Delivery", description: "A comprehensive walkthrough to ensure every detail meets your expectations. We address any items before handing over the keys to your dream home." },
];

const galleryImages = [
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/sDJygKBoYnbAYgUL.jpg",
    alt: "Foundation pour and block work for a custom home",
    caption: "Foundation & Site Preparation",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/CUkgHfDNuiLlEZow.jpg",
    alt: "Block wall construction with roof trusses and crew",
    caption: "Block Construction & Framing",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/TRvlSPtKELpRhHJm.jpg",
    alt: "Interior wood framing and rough-in stage",
    caption: "Interior Framing & Rough-Ins",
  },
  {
    src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/OYfpRlMWtbdFAqsO.png",
    alt: "Roofing and exterior finishing with stone accents",
    caption: "Roofing & Exterior Finishes",
  },
];

export default function CustomHomeBuilding() {
  return (
    <ServicePageLayout
      icon={Home}
      title="Custom Home Building"
      subtitle="New Builds & Full Rebuilds"
      heroDescription="Whether you're building from the ground up or rebuilding your existing home, we deliver custom homes defined by your vision and executed with precision."
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/OYfpRlMWtbdFAqsO.png"
      features={features}
      processSteps={processSteps}
      galleryImages={galleryImages}
    />
  );
}
