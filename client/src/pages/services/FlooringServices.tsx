/*
 * DESIGN: Florida Coastal Luxury — Bright tone
 * Flooring Services: Floor planning, removal, and installation services.
 */
import { Layers } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  { title: "Floor Planning & Design", description: "Expert consultation to help you choose the perfect flooring material, pattern, and layout for every room. We consider traffic flow, moisture levels, and your lifestyle." },
  { title: "Hardwood Installation", description: "Premium solid and engineered hardwood flooring installed with precision. From classic oak to exotic species, we deliver timeless beauty and lasting durability." },
  { title: "Tile & Stone Flooring", description: "Porcelain, ceramic, marble, and natural stone installation for kitchens, bathrooms, entryways, and living areas. Expert leveling and grout work included." },
  { title: "Luxury Vinyl & Laminate", description: "Waterproof luxury vinyl plank (LVP) and high-quality laminate options that combine stunning aesthetics with unbeatable durability and easy maintenance." },
  { title: "Floor Removal & Prep", description: "Safe removal of existing flooring including tile, carpet, hardwood, and adhesive. Subfloor repair, leveling, and moisture barrier installation to ensure a perfect foundation." },
  { title: "Refinishing & Restoration", description: "Bring worn hardwood floors back to life with professional sanding, staining, and sealing. We restore the original beauty of your existing floors." },
];

const processSteps = [
  { number: "01", title: "In-Home Consultation", description: "We visit your home to assess the existing floors, measure each room, and discuss your vision. We'll evaluate subfloor conditions and recommend the best flooring options for your space and budget." },
  { number: "02", title: "Material Selection & Planning", description: "Browse our curated selection of hardwood, tile, vinyl, and laminate options. We help you choose colors, patterns, and transitions that complement your home's design. Detailed layout plans are created." },
  { number: "03", title: "Removal & Subfloor Preparation", description: "Existing flooring is carefully removed and disposed of. We repair, level, and prepare the subfloor with moisture barriers and underlayment to ensure a flawless installation." },
  { number: "04", title: "Professional Installation", description: "Our skilled installers lay your new flooring with precision — from cutting and fitting to transitions and trim work. Every plank, tile, or board is placed with care." },
  { number: "05", title: "Finishing & Final Walkthrough", description: "Baseboards, transitions, and thresholds are installed. We perform a detailed quality check and walk through every room with you to ensure complete satisfaction." },
];

export default function FlooringServices() {
  return (
    <ServicePageLayout
      icon={Layers}
      title="Flooring Services"
      subtitle="From the Ground Up"
      heroDescription="Transform your home from the ground up with expert floor planning, removal, and installation services. We deliver beautiful, durable floors that elevate every room."
      heroImage="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1920&q=80"
      features={features}
      processSteps={processSteps}
      additionalContent={
        <section className="py-20 lg:py-28 px-4" style={{ background: "#F3EDE4" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p
                className="text-sm tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C" }}
              >
                Our Flooring Gallery
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
              >
                Flooring <span className="italic" style={{ color: "#9A7B3C" }}>Inspiration</span>
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C5A55A, transparent)" }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                <img
                  src="https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80"
                  alt="Hardwood flooring installation"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>Hardwood</p>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>Classic & Timeless</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Tile flooring in modern home"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>Tile & Stone</p>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>Durable & Elegant</p>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                <img
                  src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80"
                  alt="Luxury vinyl plank flooring"
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-lg" style={{ fontFamily: "'DM Serif Display', serif" }}>Luxury Vinyl</p>
                  <p className="text-white/70 text-sm" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>Waterproof & Stylish</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    />
  );
}
