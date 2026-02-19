/*
 * "Is It Better to Renovate or Rebuild?" — Interactive Calculator
 * LIGHT THEME: Cream/white background, warm gold accents, clean inputs
 * Collects: Home Age, Square Footage, Desired Addition, Budget
 * Returns: Renovation cost estimate vs Rebuild cost estimate with recommendation
 */
import { useState } from "react";
import { Home, Ruler, PlusSquare, DollarSign, ArrowRight, RotateCcw, Loader2, Hammer, HardHat } from "lucide-react";

interface FormData {
  homeAge: string;
  squareFootage: string;
  desiredAddition: string;
  budget: string;
}

interface CalcResult {
  renovationLow: number;
  renovationHigh: number;
  rebuildLow: number;
  rebuildHigh: number;
  recommendation: "renovate" | "rebuild" | "either";
  reasoning: string[];
  factors: string[];
}

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
}

function calculateEstimates(data: FormData): CalcResult {
  const age = parseInt(data.homeAge) || 0;
  const sqft = parseInt(data.squareFootage) || 2000;
  const addition = parseInt(data.desiredAddition) || 0;
  const budget = parseInt(data.budget) || 0;

  const reasoning: string[] = [];
  const factors: string[] = [];

  let renovPerSqFt = 80;
  if (age > 40) {
    renovPerSqFt += 40;
    factors.push("Home is 40+ years old — expect significant electrical, plumbing, and insulation upgrades");
  } else if (age > 25) {
    renovPerSqFt += 20;
    factors.push("Home is 25+ years old — some systems may need updating to current code");
  } else if (age > 15) {
    renovPerSqFt += 10;
    factors.push("Home is relatively modern — renovation costs should be moderate");
  }

  const additionCostPerSqFt = 200;
  const additionCost = addition * additionCostPerSqFt;

  const renovationLow = Math.round((sqft * renovPerSqFt * 0.7 + additionCost * 0.8) / 1000) * 1000;
  const renovationHigh = Math.round((sqft * renovPerSqFt * 1.3 + additionCost * 1.2) / 1000) * 1000;

  const totalNewSqFt = sqft + addition;
  const rebuildPerSqFt = 200;
  const demoCost = sqft * 8;

  const rebuildLow = Math.round((totalNewSqFt * rebuildPerSqFt * 0.85 + demoCost) / 1000) * 1000;
  const rebuildHigh = Math.round((totalNewSqFt * rebuildPerSqFt * 1.4 + demoCost) / 1000) * 1000;

  let recommendation: "renovate" | "rebuild" | "either";

  if (age >= 40 && addition >= sqft * 0.3) {
    recommendation = "rebuild";
    reasoning.push("With a home over 40 years old and significant expansion planned, rebuilding is typically more cost-effective");
    reasoning.push("Older homes often have hidden issues (asbestos, outdated wiring, foundation problems) that inflate renovation costs");
    reasoning.push("A new build gives you modern hurricane-rated construction, energy efficiency, and current Florida Building Code compliance");
  } else if (age >= 30 && renovationHigh >= rebuildLow * 0.8) {
    recommendation = "rebuild";
    reasoning.push("Renovation costs are approaching rebuild costs — a new home provides better long-term value");
    reasoning.push("New construction includes modern wind mitigation, impact windows, and energy-efficient systems from day one");
  } else if (age < 20 && addition < sqft * 0.25) {
    recommendation = "renovate";
    reasoning.push("Your home is relatively new and the scope of work is moderate — renovation is the clear winner");
    reasoning.push("You'll preserve your existing foundation, structure, and systems while upgrading to your vision");
  } else if (renovationHigh < rebuildLow * 0.6) {
    recommendation = "renovate";
    reasoning.push("Renovation costs are significantly lower than rebuilding for your project scope");
    reasoning.push("Strategic renovations can modernize your home while preserving its character and value");
  } else {
    recommendation = "either";
    reasoning.push("Both options are viable for your situation — the best choice depends on your specific goals");
    reasoning.push("A renovation preserves your existing home's character; a rebuild gives you a completely fresh start");
    reasoning.push("We recommend a free on-site consultation to evaluate your home's condition and provide a definitive recommendation");
  }

  if (age > 20) {
    factors.push("Florida homes built before 2002 may not meet current hurricane code — upgrades required during major renovation");
  }
  if (sqft + addition > 3000) {
    factors.push("Larger projects benefit from economies of scale, potentially favoring a rebuild");
  }
  if (addition > 0) {
    factors.push(`${addition.toLocaleString()} sq ft addition adds complexity — must tie into existing structure, roofline, and systems`);
  }

  if (budget > 0) {
    if (budget < renovationLow) {
      factors.push("Your budget may be below the estimated range — we can discuss phased renovation options");
    } else if (budget >= rebuildHigh) {
      factors.push("Your budget supports either option — consider which approach best achieves your dream home vision");
    }
  }

  return { renovationLow, renovationHigh, rebuildLow, rebuildHigh, recommendation, reasoning, factors };
}

export default function RenovateOrRebuild() {
  const [formData, setFormData] = useState<FormData>({
    homeAge: "",
    squareFootage: "",
    desiredAddition: "",
    budget: "",
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    const calc = calculateEstimates(formData);
    setResult(calc);
    setSubmitting(false);
    setSubmitted(true);

    try {
      await fetch("/api/forms/renovate-or-rebuild", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, result: calc }),
      });
    } catch {
      // Silent fail
    }
  };

  const isValid = formData.homeAge && formData.squareFootage;

  const recStyles = {
    renovate: { bg: "#EFF6FF", border: "#BFDBFE", text: "#2563EB", label: "Renovation Recommended" },
    rebuild: { bg: "#FDF8EE", border: "#E5D5B0", text: "#9A7B3C", label: "Rebuild Recommended" },
    either: { bg: "#ECFDF5", border: "#A7F3D0", text: "#059669", label: "Both Options Viable" },
  };

  const inputClass = "w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-200";
  const inputStyle = {
    fontFamily: "'Outfit', sans-serif",
    background: "#FFFFFF",
    borderColor: "#E5DDD0",
    color: "#2A2520",
  };
  const inputFocusRing = "focus:ring-[#C5A55A]/30 focus:border-[#C5A55A]";
  const labelClass = "flex items-center gap-2 text-sm mb-2";
  const labelStyle = { fontFamily: "'Outfit', sans-serif", color: "#5A5248", fontWeight: 500 as const };

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "#FDFBF7" }}>
      {/* Header */}
      <div className="px-6 sm:px-8 pt-7 pb-5" style={{ borderBottom: "1px solid #EDE7DC" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C5A55A 0%, #D4B96A 100%)" }}
          >
            <Home className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
              Renovate or Rebuild?
            </h3>
            <p className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8E80", fontWeight: 300 }}>
              Find out which option makes more sense for you
            </p>
          </div>
        </div>
      </div>

      {!submitted ? (
        <div className="px-6 sm:px-8 py-6 space-y-5">
          {/* Home Age */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <Home className="w-4 h-4" style={{ color: "#C5A55A" }} />
              How old is your home? (years)
            </label>
            <input
              type="number"
              placeholder="e.g., 35"
              value={formData.homeAge}
              onChange={(e) => setFormData({ ...formData, homeAge: e.target.value })}
              className={`${inputClass} ${inputFocusRing}`}
              style={inputStyle}
            />
          </div>

          {/* Square Footage */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <Ruler className="w-4 h-4" style={{ color: "#C5A55A" }} />
              Current home square footage
            </label>
            <input
              type="number"
              placeholder="e.g., 2000"
              value={formData.squareFootage}
              onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
              className={`${inputClass} ${inputFocusRing}`}
              style={inputStyle}
            />
          </div>

          {/* Desired Addition */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <PlusSquare className="w-4 h-4" style={{ color: "#C5A55A" }} />
              Desired addition (sq ft) <span style={{ color: "#C0B8AD", fontWeight: 300 }}>— 0 if none</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 500"
              value={formData.desiredAddition}
              onChange={(e) => setFormData({ ...formData, desiredAddition: e.target.value })}
              className={`${inputClass} ${inputFocusRing}`}
              style={inputStyle}
            />
          </div>

          {/* Budget */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <DollarSign className="w-4 h-4" style={{ color: "#C5A55A" }} />
              Approximate budget <span style={{ color: "#C0B8AD", fontWeight: 300 }}>(optional)</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 300000"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className={`${inputClass} ${inputFocusRing}`}
              style={inputStyle}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="w-full py-3.5 rounded-lg text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              background: isValid && !submitting ? "linear-gradient(135deg, #C5A55A 0%, #D4B96A 100%)" : "#E5DDD0",
              color: isValid && !submitting ? "#FFFFFF" : "#B0A898",
              cursor: isValid && !submitting ? "pointer" : "not-allowed",
              boxShadow: isValid && !submitting ? "0 4px 14px rgba(197,165,90,0.3)" : "none",
            }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                Compare Options
              </>
            )}
          </button>
        </div>
      ) : result ? (
        <div className="px-6 sm:px-8 py-6 space-y-5">
          {/* Cost Comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Renovation */}
            <div
              className="rounded-lg p-5 text-center"
              style={{ background: "#F0F4FF", border: "1px solid #D6E0F5" }}
            >
              <Hammer className="w-6 h-6 mx-auto mb-2" style={{ color: "#4B7BEC" }} />
              <p className="text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: "#6B7C9A", fontWeight: 500 }}>
                Renovation
              </p>
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {formatCurrency(result.renovationLow)}
              </p>
              <p className="text-xs my-1" style={{ color: "#B0A898" }}>to</p>
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {formatCurrency(result.renovationHigh)}
              </p>
            </div>

            {/* Rebuild */}
            <div
              className="rounded-lg p-5 text-center"
              style={{ background: "#FDF8EE", border: "1px solid #E5D5B0" }}
            >
              <HardHat className="w-6 h-6 mx-auto mb-2" style={{ color: "#C5A55A" }} />
              <p className="text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8E80", fontWeight: 500 }}>
                Rebuild
              </p>
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {formatCurrency(result.rebuildLow)}
              </p>
              <p className="text-xs my-1" style={{ color: "#B0A898" }}>to</p>
              <p className="text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
                {formatCurrency(result.rebuildHigh)}
              </p>
            </div>
          </div>

          {/* Recommendation Badge */}
          <div
            className="rounded-lg p-4"
            style={{
              background: recStyles[result.recommendation].bg,
              border: `1px solid ${recStyles[result.recommendation].border}`,
            }}
          >
            <p className="font-semibold text-sm uppercase tracking-wider mb-2" style={{ fontFamily: "'Outfit', sans-serif", color: recStyles[result.recommendation].text }}>
              {recStyles[result.recommendation].label}
            </p>
            <ul className="space-y-2">
              {result.reasoning.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 text-xs" style={{ color: "#C5A55A" }}>●</span>
                  <span className="text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#5A5248" }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Factors */}
          {result.factors.length > 0 && (
            <div>
              <h4 className="text-sm tracking-wider uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C", fontWeight: 600 }}>
                Key Factors for Your Project
              </h4>
              <ul className="space-y-2">
                {result.factors.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 text-xs" style={{ color: "#C0B8AD" }}>●</span>
                    <span className="text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#5A5248" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#B0A898" }}>
            * These are preliminary estimates based on Tampa Bay area averages. Actual costs depend on specific conditions, materials, and design choices. Schedule a free consultation for an accurate assessment.
          </p>

          {/* CTA */}
          <div className="pt-2 space-y-3">
            <a
              href="/#contact"
              className="block w-full py-3 rounded-lg text-sm tracking-wider uppercase text-center transition-all duration-300"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                background: "linear-gradient(135deg, #C5A55A 0%, #D4B96A 100%)",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(197,165,90,0.3)",
              }}
            >
              Get a Free Expert Assessment
            </a>
            <button
              onClick={() => { setSubmitted(false); setResult(null); setFormData({ homeAge: "", squareFootage: "", desiredAddition: "", budget: "" }); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8E80" }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Start Over
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
