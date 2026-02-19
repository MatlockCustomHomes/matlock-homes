/*
 * "Can You Build on Your Lot?" — Interactive Feasibility Checker
 * Collects: Address, Flood Zone, Lot Size, HOA, Waterfront
 * Returns: Preliminary feasibility + permitting considerations
 */
import { useState } from "react";
import { MapPin, Droplets, Maximize, Building2, Waves, CheckCircle, AlertTriangle, Info, Send, Loader2 } from "lucide-react";

interface FormData {
  address: string;
  floodZone: string;
  lotSize: string;
  hoa: string;
  waterfront: string;
}

interface FeasibilityResult {
  score: "high" | "moderate" | "low";
  summary: string;
  permitting: string[];
  recommendations: string[];
}

function analyzeFeasibility(data: FormData): FeasibilityResult {
  const permitting: string[] = [];
  const recommendations: string[] = [];
  let scorePoints = 100;

  // Flood zone analysis
  if (data.floodZone === "ae" || data.floodZone === "ve") {
    scorePoints -= 30;
    permitting.push("FEMA elevation certificate required — home must be built above Base Flood Elevation (BFE)");
    permitting.push("Flood zone AE/VE requires specialized foundation design (pilings or elevated slab)");
    recommendations.push("Budget an additional 15-25% for flood-compliant construction");
  } else if (data.floodZone === "ah" || data.floodZone === "ao") {
    scorePoints -= 15;
    permitting.push("Shallow flooding zone — may require elevated foundation or fill");
    recommendations.push("Flood insurance will be required by most lenders");
  } else if (data.floodZone === "x_shaded") {
    scorePoints -= 5;
    permitting.push("Moderate flood risk — flood insurance recommended but may not be required");
  } else if (data.floodZone === "x") {
    recommendations.push("Minimal flood risk — standard foundation options available");
  }

  // Lot size analysis
  const lotAcres = parseFloat(data.lotSize);
  if (!isNaN(lotAcres)) {
    if (lotAcres < 0.15) {
      scorePoints -= 20;
      permitting.push("Small lot may require setback variances — check local zoning for minimum lot coverage");
      recommendations.push("Consider a two-story design to maximize living space within setback requirements");
    } else if (lotAcres < 0.25) {
      permitting.push("Standard residential lot — verify setback requirements with Pasco/Hernando/Pinellas county");
    } else if (lotAcres >= 0.5) {
      recommendations.push("Generous lot size provides flexibility for larger home footprint and outdoor features");
    }
  }

  // HOA analysis
  if (data.hoa === "yes") {
    scorePoints -= 10;
    permitting.push("HOA architectural review board (ARB) approval required before construction");
    permitting.push("HOA may have restrictions on exterior materials, colors, roof style, and home height");
    recommendations.push("Request a copy of HOA covenants and restrictions before finalizing your design");
  } else if (data.hoa === "unsure") {
    recommendations.push("We recommend verifying HOA status with the county property appraiser before proceeding");
  }

  // Waterfront analysis
  if (data.waterfront === "gulf" || data.waterfront === "ocean") {
    scorePoints -= 15;
    permitting.push("Coastal construction control line (CCCL) permit required from FL DEP");
    permitting.push("Wind-borne debris region — impact-resistant windows and doors required");
    permitting.push("Seawall inspection and possible repair/replacement may be needed");
    recommendations.push("Consider hurricane-rated construction with reinforced concrete block and tie-down systems");
  } else if (data.waterfront === "river" || data.waterfront === "lake") {
    scorePoints -= 10;
    permitting.push("Waterfront setback requirements apply — typically 25-50 ft from mean high water line");
    permitting.push("Environmental impact assessment may be required for protected waterways");
    recommendations.push("Dock permitting available separately if desired");
  } else if (data.waterfront === "canal") {
    scorePoints -= 5;
    permitting.push("Canal-front properties may have specific setback and seawall requirements");
  }

  // Always include these Florida-specific items
  permitting.push("Florida Building Code (FBC) 7th Edition compliance required for all new construction");
  permitting.push("Soil/geotechnical report and survey required before permitting");

  if (data.address) {
    recommendations.push("We'll verify zoning, utilities, and access for your specific address during consultation");
  }

  // Determine score
  let score: "high" | "moderate" | "low";
  let summary: string;
  if (scorePoints >= 75) {
    score = "high";
    summary = "Your lot appears to have strong buildability potential. Standard permitting processes should apply, and construction can likely proceed with minimal complications.";
  } else if (scorePoints >= 50) {
    score = "moderate";
    summary = "Your lot is buildable but has some considerations that may affect the design, timeline, or budget. These are common in the Tampa Bay area and our team handles them regularly.";
  } else {
    score = "low";
    summary = "Your lot has several factors that will require careful planning and specialized expertise. While building is likely still possible, expect additional permitting steps and potential design modifications.";
  }

  return { score, summary, permitting, recommendations };
}

export default function LotFeasibilityChecker() {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    floodZone: "",
    lotSize: "",
    hoa: "",
    waterfront: "",
  });
  const [result, setResult] = useState<FeasibilityResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate brief analysis delay
    await new Promise((r) => setTimeout(r, 1200));
    const analysis = analyzeFeasibility(formData);
    setResult(analysis);
    setSubmitting(false);
    setSubmitted(true);

    // Send to backend
    try {
      await fetch("/api/forms/lot-feasibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, result: analysis }),
      });
    } catch {
      // Silent fail — result already shown to user
    }
  };

  const isValid = formData.floodZone && formData.lotSize && formData.hoa && formData.waterfront;

  const scoreColors = {
    high: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", label: "High Feasibility" },
    moderate: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", label: "Moderate Feasibility" },
    low: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", label: "Requires Careful Planning" },
  };

  return (
    <div className="bg-charcoal rounded-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h3 className="text-white text-xl" style={{ fontFamily: "'DM Serif Display', serif" }}>
              Can You Build on Your Lot?
            </h3>
            <p className="text-white/50 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Free preliminary feasibility check
            </p>
          </div>
        </div>
      </div>

      {!submitted ? (
        <div className="px-6 sm:px-8 py-6 space-y-5">
          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <MapPin className="w-4 h-4 text-gold/70" />
              Property Address <span className="text-white/30">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 123 Main St, New Port Richey, FL"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          {/* Flood Zone */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Droplets className="w-4 h-4 text-gold/70" />
              Flood Zone
            </label>
            <select
              value={formData.floodZone}
              onChange={(e) => setFormData({ ...formData, floodZone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors appearance-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <option value="" className="bg-charcoal">Select flood zone...</option>
              <option value="x" className="bg-charcoal">Zone X (Minimal Risk)</option>
              <option value="x_shaded" className="bg-charcoal">Zone X Shaded (Moderate Risk)</option>
              <option value="ah" className="bg-charcoal">Zone AH (Shallow Flooding)</option>
              <option value="ao" className="bg-charcoal">Zone AO (Sheet Flow)</option>
              <option value="ae" className="bg-charcoal">Zone AE (High Risk)</option>
              <option value="ve" className="bg-charcoal">Zone VE (Coastal High Risk)</option>
              <option value="unsure" className="bg-charcoal">I'm Not Sure</option>
            </select>
          </div>

          {/* Lot Size */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Maximize className="w-4 h-4 text-gold/70" />
              Lot Size (acres)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g., 0.25"
              value={formData.lotSize}
              onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder-white/30 focus:border-gold/50 focus:outline-none transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          {/* HOA */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Building2 className="w-4 h-4 text-gold/70" />
              Is there an HOA?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
                { value: "unsure", label: "Not Sure" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFormData({ ...formData, hoa: opt.value })}
                  className={`py-2.5 rounded-sm text-sm border transition-all duration-200 ${
                    formData.hoa === opt.value
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                  }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Waterfront */}
          <div>
            <label className="flex items-center gap-2 text-white/70 text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Waves className="w-4 h-4 text-gold/70" />
              Waterfront Property?
            </label>
            <select
              value={formData.waterfront}
              onChange={(e) => setFormData({ ...formData, waterfront: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors appearance-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <option value="" className="bg-charcoal">Select...</option>
              <option value="no" className="bg-charcoal">No — Not Waterfront</option>
              <option value="gulf" className="bg-charcoal">Yes — Gulf / Ocean</option>
              <option value="river" className="bg-charcoal">Yes — River</option>
              <option value="lake" className="bg-charcoal">Yes — Lake</option>
              <option value="canal" className="bg-charcoal">Yes — Canal</option>
            </select>
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
                Analyzing Your Lot...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Check Feasibility
              </>
            )}
          </button>
        </div>
      ) : result ? (
        <div className="px-6 sm:px-8 py-6 space-y-5">
          {/* Score Badge */}
          <div className={`${scoreColors[result.score].bg} ${scoreColors[result.score].border} border rounded-sm p-4 flex items-start gap-3`}>
            {result.score === "high" ? (
              <CheckCircle className={`w-6 h-6 ${scoreColors[result.score].text} flex-shrink-0 mt-0.5`} />
            ) : result.score === "moderate" ? (
              <Info className={`w-6 h-6 ${scoreColors[result.score].text} flex-shrink-0 mt-0.5`} />
            ) : (
              <AlertTriangle className={`w-6 h-6 ${scoreColors[result.score].text} flex-shrink-0 mt-0.5`} />
            )}
            <div>
              <p className={`${scoreColors[result.score].text} font-semibold text-sm uppercase tracking-wider mb-1`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                {scoreColors[result.score].label}
              </p>
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {result.summary}
              </p>
            </div>
          </div>

          {/* Permitting Considerations */}
          <div>
            <h4 className="text-gold text-sm tracking-wider uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Likely Permitting Considerations
            </h4>
            <ul className="space-y-2">
              {result.permitting.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold/60 mt-1.5 text-xs">●</span>
                  <span className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div>
              <h4 className="text-gold text-sm tracking-wider uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Our Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold/60 mt-1 flex-shrink-0" />
                    <span className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="pt-2 space-y-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block w-full btn-gold py-3 rounded-sm text-sm tracking-wider uppercase text-center"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Schedule a Free Consultation
            </a>
            <button
              onClick={() => { setSubmitted(false); setResult(null); setFormData({ address: "", floodZone: "", lotSize: "", hoa: "", waterfront: "" }); }}
              className="block w-full py-2.5 text-white/40 hover:text-white/70 text-sm transition-colors text-center"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Check Another Lot
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
