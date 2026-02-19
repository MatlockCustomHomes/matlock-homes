/*
 * DESIGN: Florida Coastal Luxury
 * Pricing Page: Interactive multi-step home estimate tool.
 * Dark background, gold accents, step-by-step questionnaire.
 * Collects project details and provides a ballpark estimate range.
 */
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Home, Ruler, Paintbrush, HardHat, CheckCircle, Phone, Mail, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StepAnswer {
  [key: string]: string;
}

const STEPS = [
  {
    id: "project_type",
    question: "What type of project are you planning?",
    subtitle: "Select the option that best describes your project.",
    options: [
      { value: "new_build", label: "New Custom Home Build", icon: "🏗️", desc: "Build a brand new custom home from the ground up" },
      { value: "full_renovation", label: "Full Home Renovation", icon: "🔨", desc: "Complete renovation of an existing home" },
      { value: "kitchen", label: "Kitchen Remodel", icon: "🍳", desc: "Kitchen upgrade, redesign, or full overhaul" },
      { value: "bathroom", label: "Bathroom Renovation", icon: "🚿", desc: "Bathroom remodel or complete renovation" },
      { value: "addition", label: "Home Addition", icon: "📐", desc: "Add new rooms or expand existing space" },
      { value: "demolition", label: "Demolition Services", icon: "🏚️", desc: "Commercial or residential demolition" },
    ],
  },
  {
    id: "has_design",
    question: "Do you already have a home design or plans?",
    subtitle: "This helps us understand where you are in the process.",
    options: [
      { value: "yes_plans", label: "Yes, I Have Plans", icon: "📋", desc: "I have architectural plans or blueprints ready" },
      { value: "partial", label: "Partial Plans", icon: "📝", desc: "I have some ideas or rough sketches" },
      { value: "need_design", label: "No, I Need Design Help", icon: "✏️", desc: "I need help with design and planning from scratch" },
      { value: "not_sure", label: "Not Sure Yet", icon: "🤔", desc: "I'm still exploring my options" },
    ],
  },
  {
    id: "square_footage",
    question: "What is the estimated size of your project?",
    subtitle: "Select the approximate square footage.",
    options: [
      { value: "under_1000", label: "Under 1,000 sq ft", icon: "📏", desc: "Small project or single room" },
      { value: "1000_2000", label: "1,000 - 2,000 sq ft", icon: "📐", desc: "Medium-sized project" },
      { value: "2000_3000", label: "2,000 - 3,000 sq ft", icon: "🏠", desc: "Standard home size" },
      { value: "3000_4000", label: "3,000 - 4,000 sq ft", icon: "🏡", desc: "Large home" },
      { value: "4000_plus", label: "4,000+ sq ft", icon: "🏰", desc: "Estate or luxury home" },
    ],
  },
  {
    id: "finish_level",
    question: "What level of finishes are you looking for?",
    subtitle: "This significantly impacts the overall cost.",
    options: [
      { value: "standard", label: "Standard", icon: "⭐", desc: "Quality materials with practical design choices" },
      { value: "mid_range", label: "Mid-Range", icon: "⭐⭐", desc: "Upgraded materials and fixtures throughout" },
      { value: "high_end", label: "High-End", icon: "⭐⭐⭐", desc: "Premium materials, custom cabinetry, designer finishes" },
      { value: "luxury", label: "Luxury / Custom", icon: "👑", desc: "Top-of-the-line everything, fully custom design" },
    ],
  },
  {
    id: "timeline",
    question: "When are you looking to start?",
    subtitle: "This helps us plan resources and scheduling.",
    options: [
      { value: "asap", label: "As Soon As Possible", icon: "🚀", desc: "Ready to begin immediately" },
      { value: "1_3_months", label: "1 - 3 Months", icon: "📅", desc: "Planning to start soon" },
      { value: "3_6_months", label: "3 - 6 Months", icon: "🗓️", desc: "Still in the planning phase" },
      { value: "6_plus", label: "6+ Months", icon: "⏳", desc: "Just exploring options for now" },
    ],
  },
  {
    id: "location",
    question: "Where is your project located?",
    subtitle: "We serve the greater Tampa Bay area.",
    options: [
      { value: "new_port_richey", label: "New Port Richey", icon: "📍", desc: "New Port Richey and surrounding areas" },
      { value: "tampa", label: "Tampa Area", icon: "📍", desc: "Tampa and surrounding neighborhoods" },
      { value: "clearwater", label: "Clearwater / St. Pete", icon: "📍", desc: "Clearwater, St. Petersburg area" },
      { value: "pasco", label: "Pasco County", icon: "📍", desc: "Other Pasco County locations" },
      { value: "other_fl", label: "Other Tampa Bay", icon: "📍", desc: "Other locations in the Tampa Bay area" },
    ],
  },
];

function calculateEstimate(answers: StepAnswer): { low: number; high: number } {
  let baseLow = 0;
  let baseHigh = 0;

  // Base cost by project type
  switch (answers.project_type) {
    case "new_build":
      baseLow = 200000; baseHigh = 500000; break;
    case "full_renovation":
      baseLow = 80000; baseHigh = 250000; break;
    case "kitchen":
      baseLow = 25000; baseHigh = 80000; break;
    case "bathroom":
      baseLow = 15000; baseHigh = 50000; break;
    case "addition":
      baseLow = 50000; baseHigh = 200000; break;
    case "demolition":
      baseLow = 10000; baseHigh = 60000; break;
    default:
      baseLow = 50000; baseHigh = 200000;
  }

  // Size multiplier
  let sizeMult = 1;
  switch (answers.square_footage) {
    case "under_1000": sizeMult = 0.6; break;
    case "1000_2000": sizeMult = 0.85; break;
    case "2000_3000": sizeMult = 1; break;
    case "3000_4000": sizeMult = 1.3; break;
    case "4000_plus": sizeMult = 1.7; break;
  }

  // Finish level multiplier
  let finishMult = 1;
  switch (answers.finish_level) {
    case "standard": finishMult = 0.85; break;
    case "mid_range": finishMult = 1; break;
    case "high_end": finishMult = 1.4; break;
    case "luxury": finishMult = 1.9; break;
  }

  // Design needs addition
  let designAdd = 0;
  switch (answers.has_design) {
    case "yes_plans": designAdd = 0; break;
    case "partial": designAdd = 5000; break;
    case "need_design": designAdd = 15000; break;
    case "not_sure": designAdd = 10000; break;
  }

  const low = Math.round((baseLow * sizeMult * finishMult + designAdd) / 1000) * 1000;
  const high = Math.round((baseHigh * sizeMult * finishMult + designAdd) / 1000) * 1000;

  return { low, high };
}

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
}

export default function Pricing() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<StepAnswer>({});
  const [showResult, setShowResult] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (value: string) => {
    const step = STEPS[currentStep];
    setAnswers((prev) => ({ ...prev, [step.id]: value }));

    // Auto-advance after selection with a brief delay
    setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 400);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const estimate = calculateEstimate(answers);
  const progress = showResult ? 100 : ((currentStep + (answers[STEPS[currentStep]?.id] ? 1 : 0)) / STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-charcoal">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Hero / Start Screen */}
        {!started && (
          <section className="relative min-h-[80vh] flex items-center justify-center px-4">
            <div
              className="text-center max-w-3xl mx-auto transition-all duration-1000"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-8">
                <DollarSign className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Free Estimate Tool
                </span>
              </div>

              <h1
                className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Get Your Custom
                <br />
                <span className="text-gold italic">Home Estimate</span>
              </h1>

              <p
                className="text-white/60 text-lg sm:text-xl max-w-xl mx-auto mb-12"
                style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}
              >
                Answer a few quick questions about your project and receive a personalized
                ballpark estimate in under 2 minutes.
              </p>

              <button
                onClick={() => setStarted(true)}
                className="btn-gold px-10 py-4 rounded-sm text-lg tracking-wider inline-flex items-center gap-3 group"
              >
                Start Your Estimate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-white/30 text-sm mt-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
                No commitment required — just a helpful starting point for your budget planning.
              </p>
            </div>
          </section>
        )}

        {/* Questionnaire */}
        {started && !showResult && (
          <section className="min-h-[80vh] flex flex-col items-center px-4 py-12">
            {/* Progress Bar */}
            <div className="w-full max-w-2xl mb-12">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Step {currentStep + 1} of {STEPS.length}
                </span>
                <span className="text-gold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="w-full max-w-2xl text-center mb-10">
              <h2
                className="text-white text-2xl sm:text-3xl lg:text-4xl mb-3 transition-all duration-500"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {STEPS[currentStep].question}
              </h2>
              <p
                className="text-white/50 text-base"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {STEPS[currentStep].subtitle}
              </p>
            </div>

            {/* Options Grid */}
            <div className="w-full max-w-3xl grid sm:grid-cols-2 gap-4 mb-12">
              {STEPS[currentStep].options.map((option) => {
                const isSelected = answers[STEPS[currentStep].id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`group relative text-left p-6 rounded-lg border transition-all duration-300 ${
                      isSelected
                        ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                        : "border-white/10 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <h3
                          className={`text-lg font-medium mb-1 transition-colors ${
                            isSelected ? "text-gold" : "text-white"
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {option.label}
                        </h3>
                        <p
                          className="text-white/40 text-sm leading-relaxed"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {option.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-5 h-5 text-gold" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {currentStep > 0 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-white/50 hover:text-white px-6 py-3 border border-white/10 hover:border-white/30 rounded-sm transition-all duration-300"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>
          </section>
        )}

        {/* Results */}
        {showResult && (
          <section className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl text-center">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/30 mb-8">
                <CheckCircle className="w-10 h-10 text-gold" />
              </div>

              <h2
                className="text-white text-3xl sm:text-4xl lg:text-5xl mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Your Estimated <span className="text-gold italic">Range</span>
              </h2>

              <p
                className="text-white/50 text-base mb-10"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Based on your selections, here's a ballpark estimate for your project.
              </p>

              {/* Estimate Display */}
              <div className="bg-white/[0.03] border border-gold/20 rounded-lg p-8 sm:p-12 mb-8">
                <p className="text-white/50 text-sm tracking-wider uppercase mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Estimated Project Cost
                </p>
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
                  <span
                    className="text-gold text-3xl sm:text-4xl lg:text-5xl"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {formatCurrency(estimate.low)}
                  </span>
                  <span className="text-white/30 text-2xl">—</span>
                  <span
                    className="text-gold text-3xl sm:text-4xl lg:text-5xl"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {formatCurrency(estimate.high)}
                  </span>
                </div>
                <p className="text-white/30 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  *This is a preliminary estimate. Final pricing depends on specific design choices,
                  site conditions, materials selected, and current market rates.
                </p>
              </div>

              {/* Summary of selections */}
              <div className="bg-white/[0.02] border border-white/10 rounded-lg p-6 mb-10 text-left">
                <h3 className="text-white text-lg mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  Your Project Summary
                </h3>
                <div className="space-y-3">
                  {STEPS.map((step) => {
                    const selected = step.options.find((o) => o.value === answers[step.id]);
                    return selected ? (
                      <div key={step.id} className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-white/40" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {step.question.replace("?", "")}
                        </span>
                        <span className="text-white/80 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {selected.label}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href="tel:7274855996"
                  className="btn-gold px-8 py-3.5 rounded-sm text-base tracking-wider inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call for Exact Quote
                </a>
                <a
                  href="mailto:matlockhomes@icloud.com"
                  className="flex items-center gap-2 text-white/80 hover:text-gold px-6 py-3.5 border border-white/20 hover:border-gold/50 rounded-sm transition-all duration-300 text-base tracking-wider"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>

              <button
                onClick={restart}
                className="text-white/40 hover:text-gold text-sm transition-colors duration-300 underline underline-offset-4"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Start Over
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
