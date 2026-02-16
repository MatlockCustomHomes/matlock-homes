import { Building2, Factory, Home } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const features = [
  { title: "Residential Demolition", description: "Complete or partial demolition of residential structures including single-family homes, garages, sheds, pools, and interior spaces for renovation prep." },
  { title: "Commercial Demolition", description: "Large-scale demolition of commercial buildings, retail spaces, warehouses, and office structures with full regulatory compliance and safety protocols." },
  { title: "Interior Strip-Outs", description: "Selective interior demolition for renovation projects. We carefully remove walls, flooring, ceilings, and fixtures while preserving the structural elements you want to keep." },
  { title: "Concrete & Foundation Removal", description: "Breaking and removing concrete slabs, driveways, sidewalks, and foundations using specialized equipment for clean, efficient results." },
  { title: "Site Clearing & Grading", description: "Complete lot clearing including tree removal, brush clearing, and grading to prepare your site for new construction." },
  { title: "Debris Removal & Recycling", description: "Responsible disposal and recycling of demolition materials. We sort and recycle concrete, metal, wood, and other materials whenever possible." },
];

const processSteps = [
  { number: "01", title: "Site Assessment", description: "Our team inspects the structure and site conditions, identifies hazardous materials (asbestos, lead), and evaluates access points and neighboring property considerations." },
  { number: "02", title: "Planning & Permitting", description: "We develop a detailed demolition plan, obtain all required permits, coordinate utility disconnections, and notify relevant authorities and neighbors." },
  { number: "03", title: "Hazardous Material Abatement", description: "If hazardous materials are identified, licensed specialists safely remove and dispose of them before demolition begins, ensuring full regulatory compliance." },
  { number: "04", title: "Demolition Execution", description: "Using the appropriate method — mechanical, manual, or a combination — we systematically demolish the structure while maintaining strict safety protocols." },
  { number: "05", title: "Debris Removal & Recycling", description: "All debris is loaded, hauled, and disposed of at licensed facilities. Recyclable materials are separated and processed responsibly." },
  { number: "06", title: "Site Restoration", description: "The site is graded, compacted, and left clean and ready for new construction or landscaping. Final inspections confirm full compliance." },
];

function AdditionalContent() {
  return (
    <section className="py-20 lg:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-gold text-sm tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            We Serve All Sectors
          </p>
          <h2
            className="text-white text-3xl sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Residential & <span className="text-gold italic">Commercial</span>
          </h2>
          <div className="gold-divider mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Residential */}
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-8 hover:border-gold/20 transition-all duration-500">
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
              <Home className="w-7 h-7 text-gold" />
            </div>
            <h3
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Residential Demolition
            </h3>
            <ul className="space-y-3">
              {[
                "Single-family home demolition",
                "Garage and outbuilding removal",
                "Pool demolition and fill",
                "Interior gut for renovation",
                "Deck and patio removal",
                "Driveway and walkway removal",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-white/50 text-sm"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial */}
          <div className="bg-white/[0.03] border border-white/5 rounded-xl p-8 hover:border-gold/20 transition-all duration-500">
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
              <Factory className="w-7 h-7 text-gold" />
            </div>
            <h3
              className="text-white text-2xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Commercial Demolition
            </h3>
            <ul className="space-y-3">
              {[
                "Office building demolition",
                "Retail space strip-outs",
                "Warehouse and industrial demolition",
                "Restaurant and hospitality gut-outs",
                "Multi-unit residential demolition",
                "Site clearing for new development",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-white/50 text-sm"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DemolitionServices() {
  return (
    <ServicePageLayout
      icon={Building2}
      title="Demolition Services"
      subtitle="Commercial & Residential"
      heroDescription="Professional demolition with precision and safety. From site assessment to debris removal, we efficiently dismantle structures for new developments."
      heroImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
      features={features}
      processSteps={processSteps}
      additionalContent={<AdditionalContent />}
    />
  );
}
