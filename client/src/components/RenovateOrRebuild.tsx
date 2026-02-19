/*
 * "Is It Better to Renovate or Rebuild?" — Interactive Calculator
 * Huge in Florida where many older homes face this decision.
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

  // Renovation cost calculation
  let renovPerSqFt = 80; // base renovation cost per sqft
  if (age > 40) {
    renovPerSqFt += 40; // older homes need more work (electrical, plumbing, insulation)
    factors.push("Home is 40+ years old — expect significant electrical, plumbing, and insulation upgrades");
  } else if (age > 25) {
    renovPerSqFt += 20;
    factors.push("Home is 25+ years old — some systems may need updating to current code");
  } else if (age > 15) {
    renovPerSqFt += 10;
    factors.push("Home is relatively modern — renovation costs should be moderate");
  }

  // Addition cost (new construction within renovation)
  const additionCostPerSqFt = 200; // additions cost more per sqft
  const additionCost = addition * additionCostPerSqFt;

  const renovationLow = Math.round((sqft * renovPerSqFt * 0.7 + additionCost * 0.8) / 1000) * 1000;
  const renovationHigh = Math.round((sqft * renovPerSqFt * 1.3 + additionCost * 1.2) / 1000) * 1000;

  // Rebuild cost calculation
  const totalNewSqFt = sqft + addition;
  let rebuildPerSqFt = 200; // base new construction cost per sqft in Tampa Bay
  
  // Demolition cost
  const demoCost = sqft * 8; // ~$8/sqft for demolition

  const rebuildLow = Math.round((totalNewSqFt * rebuildPerSqFt * 0.85 + demoCost) / 1000) * 1000;
  const rebuildHigh = Math.round((totalNewSqFt * rebuildPerSqFt * 1.4 + demoCost) / 1000) * 1000;

  // Determine recommendation
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

  // Florida-specific factors
  if (age > 20) {
    factors.push("Florida homes built before 2002 may not meet current hurricane code — upgrades required during major renovation");
  }
  if (sqft + addition > 3000) {
    factors.push("Larger projects benefit from economies of scale, potentially favoring a rebuild");
  }
  if (addition > 0) {
    factors.push(`${addition.toLocaleString()} sq ft addition adds complexity — must tie into existing structure, roofline, and systems`);
  }

  // Budget context
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

    // Send to backend
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

  const recColors = {
    renovate: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", label: "Renovation Recommended" },
    rebuild: { bg: "bg-gold/10", border: "border-gold/30", text: "text-gold", label: "Rebuild Recommended" },
    either: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", label: "Both Options Viable" },
  };

  return (
    <div className="bg-charcoal rounded-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Home className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="text-white text-xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Renovate or Rebuild?
            </h3>
            <p className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Find out which option makes more sense for you
            </p>
          </div>
        </div>
      </div>

      {!submitted ? (
        <div className="px-6 sm:px-8 py-6 space-y-5">
          {/* Home Age */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Home className="w-4 h-4 text-gold/70" />
              How old is your home? (years)
            </label>
            <input
              type="number"
              placeholder="e.g., 35"
              value={formData.homeAge}
              onChange={(e) => setFormData({ ...formData, homeAge: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          {/* Square Footage */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Ruler className="w-4 h-4 text-gold/70" />
              Current home square footage
            </label>
            <input
              type="number"
              placeholder="e.g., 2000"
              value={formData.squareFootage}
              onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          {/* Desired Addition */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <PlusSquare className="w-4 h-4 text-gold/70" />
              Desired addition (sq ft) <span className="text-white/30">— 0 if none</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 500"
              value={formData.desiredAddition}
              onChange={(e) => setFormData({ ...formData, desiredAddition: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          {/* Budget */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <DollarSign className="w-4 h-4 text-gold/70" />
              Approximate budget <span className="text-white/30">(optional)</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 300000"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className={`w-full py-3.5 rounded-sm text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
              isValid && !submitting
                ? "btn-gold cursor-pointer"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
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
            <div className="bg-white/5 border border-white/10 rounded-sm p-5 text-center">
              <Hammer className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-white/50 text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Renovation
              </p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {formatCurrency(result.renovationLow)}
              </p>
              <p className="text-white/30 text-xs my-1">to</p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {formatCurrency(result.renovationHigh)}
              </p>
            </div>

            {/* Rebuild */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-5 text-center">
              <HardHat className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-white/50 text-xs tracking-wider uppercase mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Rebuild
              </p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {formatCurrency(result.rebuildLow)}
              </p>
              <p className="text-white/30 text-xs my-1">to</p>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: "'DM Serif Display', serif" }}>
                {formatCurrency(result.rebuildHigh)}
              </p>
            </div>
          </div>

          {/* Recommendation Badge */}
          <div className={`${recColors[result.recommendation].bg} ${recColors[result.recommendation].border} border rounded-sm p-4`}>
            <p className={`${recColors[result.recommendation].text} font-semibold text-sm uppercase tracking-wider mb-2`} style={{ fontFamily: "'Outfit', sans-serif" }}>
              {recColors[result.recommendation].label}
            </p>
            <ul className="space-y-2">
              {result.reasoning.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold/60 mt-1.5 text-xs">●</span>
                  <span className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Factors */}
          {result.factors.length > 0 && (
            <div>
              <h4 className="text-gold text-sm tracking-wider uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Key Factors for Your Project
              </h4>
              <ul className="space-y-2">
                {result.factors.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-white/30 mt-1.5 text-xs">●</span>
                    <span className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-white/30 text-xs leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            * These are preliminary estimates based on Tampa Bay area averages. Actual costs depend on specific conditions, materials, and design choices. Schedule a free consultation for an accurate assessment.
          </p>

          {/* CTA */}
          <div className="pt-2 space-y-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else window.location.href = "/#contact";
              }}
              className="block w-full btn-gold py-3 rounded-sm text-sm tracking-wider uppercase text-center"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Get a Free Expert Assessment
            </a>
            <button
              onClick={() => { setSubmitted(false); setResult(null); setFormData({ homeAge: "", squareFootage: "", desiredAddition: "", budget: "" }); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-white/40 hover:text-white/70 text-sm transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
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
