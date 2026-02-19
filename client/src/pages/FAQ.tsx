/*
 * DESIGN: Florida Coastal Luxury — FAQ Page (Bright variant)
 * Light background with warm tones so questions stand out.
 * Full title: "Frequently Asked Questions"
 */
import { useEffect, useState } from "react";
import { HelpCircle, ChevronDown, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How much does it cost to build a custom home?",
    answer:
      "The cost of building a custom home in South Florida varies depending on several factors including size, location, design complexity, and the level of finishes you choose. A standard custom home typically ranges from $200 to $400+ per square foot. During our initial consultation, we'll discuss your vision and budget to provide a detailed, transparent estimate tailored to your specific project. You can also use our online Pricing Estimate Tool to get a quick ballpark range.",
  },
  {
    question: "What are your contractor fees?",
    answer:
      "Our contractor fees are built into the overall project cost and are fully transparent from the start. We don't believe in hidden fees or surprise charges. During the planning phase, we provide a comprehensive breakdown of all costs so you know exactly where every dollar is going. Our goal is to deliver exceptional quality at a fair, honest price.",
  },
  {
    question: "Is your construction company insured?",
    answer:
      "Yes, Matlock Custom Homes is fully licensed and insured in the state of Florida. We carry comprehensive general liability insurance, workers' compensation coverage, and builder's risk insurance. We're happy to provide proof of insurance and licensing upon request. Your protection and peace of mind are our top priorities.",
  },
  {
    question: "Do we need additional construction insurance?",
    answer:
      "While our company carries comprehensive insurance, we recommend homeowners consult with their insurance provider about a builder's risk policy or an endorsement to their existing homeowner's policy during construction. This provides an extra layer of protection for your investment. We can guide you through the process and recommend trusted insurance professionals in the area.",
  },
  {
    question: "Can we hire you and get our own sub-trades?",
    answer:
      "We generally recommend using our vetted network of sub-trades to ensure quality control, warranty coverage, and seamless project coordination. Our sub-contractors have been carefully selected based on years of proven performance and craftsmanship. However, we're open to discussing specific situations where you may have a preferred specialist. We'll work with you to find the best solution while maintaining our quality standards.",
  },
  {
    question: "Can we buy our own materials?",
    answer:
      "We understand the desire to be involved in material selection. While we typically source materials through our established supplier relationships — which often include preferred pricing and quality guarantees — we're flexible. If you have specific materials or products in mind, we'll work with you to incorporate them into the build. Just keep in mind that materials sourced outside our network may have different warranty implications.",
  },
  {
    question: "What is your warranty?",
    answer:
      "Every Matlock Custom Homes project includes our Matlock Shield warranty program, which goes beyond the industry standard. We offer a 3-year warranty on workmanship and materials, a 6-year warranty on the building envelope (roofing, windows, exterior walls), and an 11-year warranty on structural integrity (foundation, framing, load-bearing elements). This 3-6-11 coverage is backed directly by us — not a third-party provider. Visit our Warranty page to learn more.",
  },
  {
    question: "How long does it take to build a custom home?",
    answer:
      "The timeline for building a custom home typically ranges from 10 to 18 months, depending on the size and complexity of the project. This includes the design and permitting phase (2-4 months), site preparation and foundation (1-2 months), framing and rough-ins (2-3 months), and interior finishes and final details (3-5 months). We provide a detailed project schedule upfront and keep you informed with regular progress updates throughout the entire process.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Matlock Custom Homes proudly serves the greater South Florida area, including New Port Richey, Tampa, Clearwater, St. Petersburg, and the broader Pasco County region. If you're unsure whether your location falls within our service area, don't hesitate to reach out — we're happy to discuss your project regardless of location.",
  },
  {
    question: "Do you handle permits and inspections?",
    answer:
      "Absolutely. We handle all permitting, regulatory compliance, and inspections from start to finish. Our team is well-versed in local building codes and zoning requirements across South Florida. We manage the entire paperwork process so you can focus on the exciting parts of building your dream home — like choosing finishes and watching your vision come to life.",
  },
  {
    question: "Can I make changes during construction?",
    answer:
      "We understand that ideas evolve during the building process. While we encourage finalizing as many decisions as possible during the design phase to avoid delays and cost increases, we do accommodate reasonable changes during construction. Any modifications will be documented through a formal change order process with clear cost and timeline implications, so there are never any surprises.",
  },
  {
    question: "What sets Matlock Custom Homes apart from other builders?",
    answer:
      "Built by a structural builder, not just a sales builder. At Matlock Custom Homes, we are relationship-driven, not transaction-driven. We take the time to understand your vision, communicate transparently throughout every phase, and deliver craftsmanship that stands the test of time. Our hands-on approach means you're working directly with the people who build your home — not a middleman.",
  },
];

export default function FAQ() {
  const [loaded, setLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero — light warm background */}
        <section className="relative py-20 lg:py-28 px-4" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F3EDE4 100%)" }}>
          <div
            className="max-w-4xl mx-auto text-center transition-all duration-1000"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
            }}
          >

            <h1
              className="text-charcoal text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Frequently Asked
              <br />
              <span className="italic" style={{ color: "#9A7B3C" }}>Questions</span>
            </h1>

            <p
              className="text-charcoal/60 text-lg sm:text-xl max-w-2xl mx-auto"
              style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
            >
              Home construction can be confusing, but it doesn't have to be. Here are answers to the questions we hear most often.
            </p>
          </div>
        </section>

        {/* FAQ Accordion — light background */}
        <section className="py-12 lg:py-20 px-4" style={{ background: "linear-gradient(180deg, #F3EDE4 0%, #EDE7DC 100%)" }}>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden transition-all duration-500"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${100 + index * 50}ms`,
                    background: openIndex === index ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                    border: openIndex === index ? "1px solid rgba(154,123,60,0.3)" : "1px solid rgba(0,0,0,0.06)",
                    boxShadow: openIndex === index ? "0 8px 30px rgba(154,123,60,0.08)" : "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
                  >
                    <h3
                      className="text-base lg:text-lg pr-4 transition-colors duration-300"
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        color: openIndex === index ? "#9A7B3C" : "#2A2520",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0 transition-all duration-300"
                      style={{
                        color: openIndex === index ? "#9A7B3C" : "#2A2520",
                        opacity: openIndex === index ? 1 : 0.35,
                        transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: openIndex === index ? "500px" : "0px",
                      opacity: openIndex === index ? 1 : 0,
                    }}
                  >
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                      <div className="w-12 h-px mb-4" style={{ background: "rgba(154,123,60,0.3)" }} />
                      <p
                        className="text-sm lg:text-base leading-relaxed"
                        style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "#5A5248" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA — warm accent */}
        <section className="py-16 lg:py-24 px-4" style={{ background: "#EDE7DC" }}>
          <div className="max-w-3xl mx-auto">
            <div
              className="rounded-2xl p-8 lg:p-12 text-center"
              style={{
                background: "linear-gradient(135deg, #2A2520 0%, #3A3530 100%)",
                border: "1px solid rgba(154,123,60,0.25)",
              }}
            >
              <h2
                className="text-white text-2xl sm:text-3xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Still Have <span className="italic" style={{ color: "#C5A55A" }}>Questions?</span>
              </h2>
              <p
                className="text-base mb-8 max-w-lg mx-auto"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: "rgba(255,255,255,0.55)" }}
              >
                We're here to help. Reach out to our team and we'll be happy to answer any questions about your upcoming project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#contact";
                  }}
                  className="btn-gold px-8 py-3.5 rounded-sm text-base tracking-wider"
                >
                  Contact Us
                </a>
                <a
                  href="tel:7279991959"
                  className="flex items-center gap-2 text-white/80 hover:text-gold px-6 py-3.5 border border-white/20 hover:border-gold/50 rounded-sm transition-all duration-300 text-base tracking-wider"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Phone className="w-4 h-4" />
                  (727) 999-1959
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
