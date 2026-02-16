import { Bath } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  { title: "Walk-In Showers", description: "Custom tile showers with frameless glass enclosures, rain heads, body jets, and built-in niches. Designed for both luxury and accessibility." },
  { title: "Freestanding Tubs", description: "Statement soaking tubs that transform your bathroom into a spa-like retreat. We handle all plumbing and structural requirements." },
  { title: "Vanity & Storage", description: "Custom or semi-custom vanities with soft-close drawers, integrated lighting, and countertop options including quartz, marble, and solid surface." },
  { title: "Tile Work", description: "Expert tile installation for floors, walls, and shower surrounds. From large-format porcelain to intricate mosaic accents, every tile is placed with precision." },
  { title: "Plumbing Fixtures", description: "Premium faucets, showerheads, and hardware from top brands. We handle all plumbing modifications including re-routing supply and drain lines." },
  { title: "Heated Floors", description: "Radiant floor heating systems installed beneath tile for year-round comfort. A luxury touch that makes a real difference in daily living." },
];

const processSteps = [
  { number: "01", title: "Bathroom Assessment", description: "We evaluate your current bathroom's layout, plumbing, and structural conditions. We discuss your must-haves, nice-to-haves, and budget range." },
  { number: "02", title: "Design & Selections", description: "Choose tiles, fixtures, vanities, and hardware from our curated collections. We provide 3D renderings and material samples so you can see and feel your choices." },
  { number: "03", title: "Preparation & Demolition", description: "Careful removal of existing fixtures, tile, and vanities. We inspect and address any hidden issues like water damage or outdated plumbing." },
  { number: "04", title: "Plumbing & Electrical", description: "All rough plumbing and electrical work is completed, including any layout changes, new supply lines, and updated wiring for lighting and heated floors." },
  { number: "05", title: "Tile & Installation", description: "Waterproofing, tile installation, vanity mounting, shower glass, and fixture installation. Every detail is executed with care and precision." },
  { number: "06", title: "Finishing Touches", description: "Mirrors, accessories, hardware, caulking, and a thorough cleaning. Your new bathroom is ready for its first use." },
];

export default function BathroomRenovations() {
  return (
    <ServicePageLayout
      icon={Bath}
      title="Bathroom Renovations"
      subtitle="Spa-Inspired Living"
      heroDescription="The bathroom is one of the most used rooms in any home. We renovate every aspect to create a space that is both beautiful and functional."
      heroImage="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80"
      features={features}
      processSteps={processSteps}
    />
  );
}
