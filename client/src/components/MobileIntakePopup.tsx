/*
 * DESIGN: Florida Coastal Luxury
 * Mobile-only intake popup that appears on first visit.
 * Full-screen overlay with multi-step questionnaire.
 * Steps: Purpose → Home Type → Size → Budget → Stage → Referral → Contact Info
 * Uses sessionStorage to only show once per session.
 */
import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle, Phone, Home, DollarSign, MapPin, Users, Send } from "lucide-react";

interface Answers {
  [key: string]: string;
}

const STEPS = [
  {
    id: "purpose",
    question: "What brings you here today?",
    subtitle: "Select the option that best describes you.",
    options: [
      { value: "client_build", label: "I'm a client looking to build my dream home", icon: "🏠" },
      { value: "client_renovate", label: "I'm a client looking to renovate my home", icon: "🔨" },
      { value: "trade_professional", label: "I'm a trade professional offering services", icon: "🛠️" },
      { value: "vendor", label: "I'm a vendor with a product to sell", icon: "📦" },
      { value: "just_browsing", label: "Just browsing / exploring options", icon: "👀" },
    ],
  },
  {
    id: "home_type",
    question: "What type of home are you interested in?",
    subtitle: "Choose the style that fits your vision.",
    options: [
      { value: "single_family", label: "Single-Family Home", icon: "🏡" },
      { value: "luxury_estate", label: "Luxury Estate", icon: "🏰" },
      { value: "modern_contemporary", label: "Modern / Contemporary", icon: "🏢" },
      { value: "coastal_florida", label: "Coastal Florida Style", icon: "🌴" },
      { value: "mediterranean", label: "Mediterranean", icon: "🏛️" },
      { value: "not_sure", label: "Not sure yet", icon: "🤔" },
    ],
  },
  {
    id: "home_size",
    question: "What size of home are you envisioning?",
    subtitle: "Select the approximate square footage.",
    options: [
      { value: "under_2000", label: "Under 2,000 sq ft", icon: "📏" },
      { value: "2000_3000", label: "2,000 – 3,000 sq ft", icon: "📐" },
      { value: "3000_4000", label: "3,000 – 4,000 sq ft", icon: "🏠" },
      { value: "4000_5000", label: "4,000 – 5,000 sq ft", icon: "🏡" },
      { value: "5000_plus", label: "5,000+ sq ft", icon: "🏰" },
      { value: "not_sure", label: "Not sure yet", icon: "🤔" },
    ],
  },
  {
    id: "budget",
    question: "What is your estimated all-in budget?",
    subtitle: "This helps us tailor our recommendations.",
    options: [
      { value: "under_300k", label: "Under $300,000", icon: "💰" },
      { value: "300k_500k", label: "$300,000 – $500,000", icon: "💰" },
      { value: "500k_750k", label: "$500,000 – $750,000", icon: "💎" },
      { value: "750k_1m", label: "$750,000 – $1,000,000", icon: "💎" },
      { value: "1m_plus", label: "$1,000,000+", icon: "👑" },
      { value: "not_sure", label: "Not sure yet", icon: "🤔" },
    ],
  },
  {
    id: "stage",
    question: "What best describes where you are today?",
    subtitle: "Let us know how far along you are in the process.",
    options: [
      { value: "just_starting", label: "Just starting to explore", icon: "🌱" },
      { value: "researching", label: "Actively researching builders", icon: "🔍" },
      { value: "have_land", label: "I already have land / a lot", icon: "📍" },
      { value: "have_plans", label: "I have plans / designs ready", icon: "📋" },
      { value: "ready_to_build", label: "Ready to build now", icon: "🚀" },
    ],
  },
  {
    id: "referral",
    question: "How did you hear about us?",
    subtitle: "We'd love to know what brought you here.",
    options: [
      { value: "google", label: "Google Search", icon: "🔎" },
      { value: "social_media", label: "Social Media", icon: "📱" },
      { value: "referral", label: "Friend / Family Referral", icon: "👥" },
      { value: "drive_by", label: "Drove by a project", icon: "🚗" },
      { value: "realtor", label: "Realtor Recommendation", icon: "🏘️" },
      { value: "other", label: "Other", icon: "💬" },
    ],
  },
];

export default function MobileIntakePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    // Only show on mobile and only once per session
    const isMobile = window.innerWidth < 1024;
    const alreadyShown = sessionStorage.getItem("matlock_intake_shown");

    if (isMobile && !alreadyShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("matlock_intake_shown", "true");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (value: string) => {
    const step = STEPS[currentStep];
    setAnswers((prev) => ({ ...prev, [step.id]: value }));

    setTimeout(() => {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowContactForm(true);
      }
    }, 350);
  };

  const goBack = () => {
    if (showContactForm) {
      setShowContactForm(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setStarted(false);
    }
  };

  const handleSubmit = () => {
    // In a real implementation, this would send data to a backend
    setShowThankYou(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const close = () => setIsOpen(false);

  const progress = showContactForm
    ? 100
    : started
    ? ((currentStep + (answers[STEPS[currentStep]?.id] ? 1 : 0)) / (STEPS.length + 1)) * 100
    : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      {/* Popup Panel */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#1a1a18] rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom duration-500"
        style={{ maxHeight: "92vh" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-white/40 hover:text-white p-2 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto px-5 pb-8" style={{ maxHeight: "calc(92vh - 20px)" }}>
          {/* Thank You Screen */}
          {showThankYou && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-gold" />
              </div>
              <h2
                className="text-white text-2xl mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Thank You!
              </h2>
              <p className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                A Matlock Homes professional will be in touch with you shortly.
              </p>
            </div>
          )}

          {/* Welcome / Start Screen */}
          {!started && !showThankYou && (
            <div className="flex flex-col items-center text-center pt-6 pb-4">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                <Home className="w-7 h-7 text-gold" />
              </div>
              <h2
                className="text-white text-2xl mb-2"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Get in Touch with
                <br />
                <span className="text-gold italic">Matlock Homes</span>
              </h2>
              <p
                className="text-white/50 text-sm mb-8 max-w-xs"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Answer a few quick questions so we can better understand your needs and connect you with the right team member.
              </p>
              <button
                onClick={() => setStarted(true)}
                className="btn-gold w-full max-w-xs px-6 py-3.5 rounded-lg text-base tracking-wider inline-flex items-center justify-center gap-2 group"
              >
                Start
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={close}
                className="text-white/30 text-sm mt-4 underline underline-offset-4"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Maybe later
              </button>
            </div>
          )}

          {/* Questionnaire Steps */}
          {started && !showContactForm && !showThankYou && (
            <div className="pt-4 pb-2">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Step {currentStep + 1} of {STEPS.length + 1}
                  </span>
                  <span className="text-gold text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3
                className="text-white text-xl mb-1"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {STEPS[currentStep].question}
              </h3>
              <p
                className="text-white/40 text-sm mb-5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {STEPS[currentStep].subtitle}
              </p>

              {/* Options */}
              <div className="space-y-2.5 mb-6">
                {STEPS[currentStep].options.map((option) => {
                  const isSelected = answers[STEPS[currentStep].id] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(option.value)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                        isSelected
                          ? "border-gold bg-gold/10"
                          : "border-white/10 bg-white/[0.03] active:bg-white/[0.06]"
                      }`}
                    >
                      <span className="text-xl flex-shrink-0">{option.icon}</span>
                      <span
                        className={`text-sm font-medium ${isSelected ? "text-gold" : "text-white/80"}`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {option.label}
                      </span>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-gold ml-auto flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Back button */}
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-white/40 text-sm"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            </div>
          )}

          {/* Contact Info Form */}
          {showContactForm && !showThankYou && (
            <div className="pt-4 pb-2">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Final Step
                  </span>
                  <span className="text-gold text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Almost done!
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full w-full" />
                </div>
              </div>

              <h3
                className="text-white text-xl mb-1"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Your Contact Information
              </h3>
              <p
                className="text-white/40 text-sm mb-6"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Tell us how to reach you and we'll be in touch shortly.
              </p>

              <div className="space-y-4 mb-6">
                {/* Name */}
                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase mb-1.5 block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="John Smith"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase mb-1.5 block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase mb-1.5 block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="(727) 000-0000"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase mb-1.5 block" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Anything else you'd like us to know?
                  </label>
                  <textarea
                    value={contactInfo.message}
                    onChange={(e) => setContactInfo((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your dream project..."
                    rows={3}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors resize-none"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
                className="btn-gold w-full px-6 py-3.5 rounded-xl text-base tracking-wider inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>

              {/* Back */}
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-white/40 text-sm mt-4 mx-auto"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
