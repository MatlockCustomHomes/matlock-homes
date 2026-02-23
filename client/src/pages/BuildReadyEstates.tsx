/*
 * DESIGN: Florida Coastal Luxury — Build-Ready Estates
 * Premium page showcasing lot + custom home packages.
 * Exclusive, editorial feel with gold accents and rich property cards.
 */
import { useEffect, useState } from "react";
import { MapPin, Maximize, BedDouble, Bath, Ruler, Trees, Waves, Home, ArrowRight, Phone, Shield, Star, Clock, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PropertyListing {
  id: string;
  title: string;
  address: string;
  city: string;
  price: string;
  priceNote: string;
  beds: number;
  baths: string;
  sqft: string;
  lotSize: string;
  lotAcres: string;
  yearBuilt: string;
  style: string;
  image: string;
  description: string;
  highlights: string[];
  neighborhoodHighlights: string[];
  zillowUrl: string;
  badge: string;
  county: string;
}

const properties: PropertyListing[] = [
  {
    id: "oelsner-st",
    title: "The Oyster Creek Coastal",
    address: "6841 Oelsner St",
    city: "New Port Richey, FL 34652",
    price: "$479,999",
    priceNote: "Lot + Custom Home Package",
    beds: 3,
    baths: "2",
    sqft: "1,760+",
    lotSize: "14,810",
    lotAcres: "0.34 Acres",
    yearBuilt: "2026",
    style: "Elevated Coastal",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/BwijdXNYwABqMBla.jpg",
    description: "Build your home from the ground up on this prime waterfront lot overlooking Oyster Creek. Plans have been thoughtfully created for a 3-bedroom, 2-bath residence offering over 1,800 square feet, elevated 12 feet and designed with hurricane-impact construction perfectly suited for Florida waterfront living.",
    highlights: [
      "Elevated 12 ft — hurricane-impact construction",
      "Waterfront lot overlooking Oyster Creek",
      "Direct creek access for small watercraft & fishing",
      "Fully customizable floor plans & finishes",
      "Virtually staged renderings available",
    ],
    neighborhoodHighlights: [
      "Conveniently located just off US-19",
      "Close to shopping, dining & everyday conveniences",
      "Serene waterfront surroundings",
      "Pasco County — Acreage neighborhood",
    ],
    zillowUrl: "https://www.zillow.com/homedetails/6841-Oelsner-St-New-Port-Richey-FL-34652/46347006_zpid/",
    badge: "Waterfront",
    county: "Pasco County",
  },
  {
    id: "boy-scout-rd",
    title: "The Keystone Modern Farmhouse",
    address: "17524 Boy Scout Rd",
    city: "Odessa, FL 33556",
    price: "$1,249,999",
    priceNote: "Lot + Custom Home Package",
    beds: 4,
    baths: "4.5",
    sqft: "3,000",
    lotSize: "18,295",
    lotAcres: "0.42 Acres",
    yearBuilt: "2026",
    style: "Modern Farmhouse",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663289223415/VgrikiNwlrwedLSF.jpg",
    description: "Build your dream home in the heart of Keystone. This rare opportunity offers a private, rural homesite with a fully designed to-be-built custom modern farmhouse, featuring approximately 3,000 square feet of living space with a vaulted great room, gourmet kitchen, first-floor primary suite, and over 1,000 square feet of covered outdoor living.",
    highlights: [
      "Two-story custom modern farmhouse design",
      "Vaulted great room & gourmet kitchen with oversized island",
      "First-floor primary suite with walk-in closet",
      "1,000+ sq ft of covered outdoor living — front porch, wrap-style side porch, rear lanai",
      "Side-entry 2-car garage & flexible second-floor loft",
      "Fully customizable plans, finishes & upgrades",
    ],
    neighborhoodHighlights: [
      "Heart of Keystone — desirable Odessa location",
      "Private, rural homesite with country living feel",
      "Near Tampa International Airport",
      "Convenient access to major roadways, shopping & dining",
      "Hillsborough County — top-rated school district",
    ],
    zillowUrl: "https://www.zillow.com/homedetails/17524-Boy-Scout-Rd-Odessa-FL-33556/44847375_zpid/",
    badge: "Premium Estate",
    county: "Hillsborough County",
  },
];

const trustPoints = [
  { icon: Shield, title: "Builder-Direct", desc: "No middlemen. Work directly with Matlock Custom Homes from lot to keys." },
  { icon: Star, title: "Fully Customizable", desc: "Every plan can be tailored to your lifestyle, layout, and design preferences." },
  { icon: Clock, title: "Turnkey Package", desc: "Lot and home included in one transparent price. No surprises." },
];

function PropertyCard({ property, index }: { property: PropertyListing; index: number }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400 + index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className="transition-all duration-1000"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(197,165,90,0.15)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
        }}
      >
        {/* Image Section */}
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Badge */}
          <div
            className="absolute top-6 left-6 px-4 py-1.5 rounded-sm text-xs tracking-[0.2em] uppercase font-medium"
            style={{
              fontFamily: "'Outfit', sans-serif",
              background: "rgba(197,165,90,0.9)",
              color: "#2A2520",
              backdropFilter: "blur(4px)",
            }}
          >
            {property.badge}
          </div>

          {/* Price overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <p
              className="text-white/70 text-xs tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {property.priceNote}
            </p>
            <p
              className="text-white text-3xl sm:text-4xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {property.price}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-10">
          {/* Title & Address */}
          <div className="mb-6">
            <h3
              className="text-2xl lg:text-3xl mb-2"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
            >
              {property.title}
            </h3>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <p
                className="text-sm"
                style={{ fontFamily: "'Outfit', sans-serif", color: "#7A7068" }}
              >
                {property.address}, {property.city}
              </p>
            </div>
            <p
              className="text-xs tracking-wide"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8A7A" }}
            >
              {property.county} &middot; {property.style} &middot; To Be Built {property.yearBuilt}
            </p>
          </div>

          {/* Specs Grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 rounded-lg"
            style={{ background: "#FDFBF7", border: "1px solid rgba(197,165,90,0.12)" }}
          >
            <div className="text-center">
              <BedDouble className="w-5 h-5 text-gold mx-auto mb-1.5" />
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {property.beds}
              </p>
              <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8A7A" }}>Bedrooms</p>
            </div>
            <div className="text-center">
              <Bath className="w-5 h-5 text-gold mx-auto mb-1.5" />
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {property.baths}
              </p>
              <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8A7A" }}>Bathrooms</p>
            </div>
            <div className="text-center">
              <Ruler className="w-5 h-5 text-gold mx-auto mb-1.5" />
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {property.sqft}
              </p>
              <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8A7A" }}>Sq Ft</p>
            </div>
            <div className="text-center">
              <Maximize className="w-5 h-5 text-gold mx-auto mb-1.5" />
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {property.lotAcres}
              </p>
              <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8A7A" }}>Lot Size</p>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-base leading-relaxed mb-6"
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.75, color: "#5A5550" }}
          >
            {property.description}
          </p>

          {/* Expandable Details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 mb-6 group"
          >
            <ChevronRight
              className={`w-4 h-4 text-gold transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
            />
            <span
              className="text-sm tracking-wide text-gold group-hover:text-gold-dark transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}
            >
              {expanded ? "Hide Details" : "View Property Details & Neighborhood"}
            </span>
          </button>

          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: expanded ? "800px" : "0px", opacity: expanded ? 1 : 0 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Property Highlights */}
              <div
                className="p-6 rounded-lg"
                style={{ background: "#FDFBF7", border: "1px solid rgba(197,165,90,0.12)" }}
              >
                <h4
                  className="text-sm tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#C5A55A" }}
                >
                  Property Highlights
                </h4>
                <ul className="space-y-2.5">
                  {property.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5550" }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Neighborhood */}
              <div
                className="p-6 rounded-lg"
                style={{ background: "#FDFBF7", border: "1px solid rgba(197,165,90,0.12)" }}
              >
                <h4
                  className="text-sm tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#C5A55A" }}
                >
                  Neighborhood & Location
                </h4>
                <ul className="space-y-2.5">
                  {property.neighborhoodHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-gold mt-1 flex-shrink-0" />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5550" }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={property.zillowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-6 py-3.5 rounded-sm text-sm tracking-wider flex items-center justify-center gap-2"
            >
              View Full Listing
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact-estate"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact-estate");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3.5 rounded-sm text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                border: "1px solid rgba(197,165,90,0.4)",
                color: "#C5A55A",
                background: "transparent",
              }}
            >
              <Phone className="w-4 h-4" />
              Inquire About This Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuildReadyEstates() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FAF8F5" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #2A2520 0%, #3A3530 60%, #FAF8F5 100%)" }} />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A55A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-sm tracking-[0.3em] uppercase mb-4 transition-all duration-700"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: "#C5A55A",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              Exclusive Opportunities
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6 transition-all duration-700"
              style={{
                fontFamily: "'DM Serif Display', serif",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "150ms",
              }}
            >
              Build-Ready <span className="text-gold italic">Estates</span>
            </h1>
            <div
              className="gold-divider mx-auto mb-6 transition-all duration-700"
              style={{ opacity: loaded ? 1 : 0, transitionDelay: "300ms" }}
            />
            <p
              className="text-lg leading-relaxed max-w-2xl mx-auto transition-all duration-700"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.75,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "300ms",
              }}
            >
              Premium lots paired with custom home designs — secured, planned, and ready for you to make yours. 
              Each package includes the land and a fully customizable home built by Matlock Custom Homes.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 lg:py-16" style={{ background: "#FFFFFF", borderBottom: "1px solid rgba(197,165,90,0.1)" }}>
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {trustPoints.map((point, i) => (
              <div
                key={point.title}
                className="flex items-start gap-4 transition-all duration-700"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${400 + i * 100}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(197,165,90,0.1)", border: "1px solid rgba(197,165,90,0.2)" }}
                >
                  <point.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3
                    className="text-base mb-1"
                    style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                  >
                    {point.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#7A7068" }}
                  >
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
            {properties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24" style={{ background: "#FFFFFF" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-sm tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#C5A55A" }}
            >
              Your Path to Ownership
            </p>
            <h2
              className="text-3xl lg:text-4xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
            >
              How Build-Ready <span className="text-gold italic">Works</span>
            </h2>
            <div className="gold-divider mx-auto" />
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Choose Your Estate", desc: "Browse our curated selection of premium lots with proposed home designs." },
              { step: "02", title: "Customize Your Vision", desc: "Work directly with our team to tailor the plans, finishes, and layout to your lifestyle." },
              { step: "03", title: "We Build It", desc: "Matlock Custom Homes handles everything — permits, construction, and quality control." },
              { step: "04", title: "Move In", desc: "Receive your keys to a brand-new custom home built exactly to your specifications." },
            ].map((item, i) => (
              <div key={item.step} className="text-center">
                <p
                  className="text-3xl mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#C5A55A" }}
                >
                  {item.step}
                </p>
                <h3
                  className="text-base mb-2"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#7A7068" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Inquiry Section */}
      <section id="contact-estate" className="py-16 lg:py-24" style={{ background: "#FAF8F5" }}>
        <div className="container">
          <div
            className="max-w-2xl mx-auto text-center p-10 lg:p-14 rounded-lg"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(197,165,90,0.15)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.04)",
            }}
          >
            <Home className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2
              className="text-2xl lg:text-3xl mb-3"
              style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}
            >
              Interested in a Build-Ready <span className="text-gold italic">Estate?</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-lg mx-auto"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#7A7068", lineHeight: 1.75 }}
            >
              Contact us directly to schedule a consultation, request architectural plans, or discuss customization options. 
              We are here to guide you from lot to keys.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:7279991959"
                className="btn-gold px-8 py-3.5 rounded-sm text-sm tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                (727) 999-1959
              </a>
              <a
                href="mailto:matlockhomes@icloud.com"
                className="px-8 py-3.5 rounded-sm text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  border: "1px solid rgba(197,165,90,0.4)",
                  color: "#C5A55A",
                  background: "transparent",
                }}
              >
                Email Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
