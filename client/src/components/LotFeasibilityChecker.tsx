/*
 * "Can You Build on Your Lot?" — Interactive Feasibility Checker
 * LIGHT THEME: Cream/white background, warm gold accents, clean inputs
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

  if (data.hoa === "yes") {
    scorePoints -= 10;
    permitting.push("HOA architectural review board (ARB) approval required before construction");
    permitting.push("HOA may have restrictions on exterior materials, colors, roof style, and home height");
    recommendations.push("Request a copy of HOA covenants and restrictions before finalizing your design");
  } else if (data.hoa === "unsure") {
    recommendations.push("We recommend verifying HOA status with the county property appraiser before proceeding");
  }

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

  permitting.push("Florida Building Code (FBC) 7th Edition compliance required for all new construction");
  permitting.push("Soil/geotechnical report and survey required before permitting");

  if (data.address) {
    recommendations.push("We'll verify zoning, utilities, and access for your specific address during consultation");
  }

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
    await new Promise((r) => setTimeout(r, 1200));
    const analysis = analyzeFeasibility(formData);
    setResult(analysis);
    setSubmitting(false);
    setSubmitted(true);

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

  const scoreStyles = {
    high: { bg: "#ECFDF5", border: "#A7F3D0", text: "#059669", label: "High Feasibility" },
    moderate: { bg: "#FFFBEB", border: "#FDE68A", text: "#D97706", label: "Moderate Feasibility" },
    low: { bg: "#FEF2F2", border: "#FECACA", text: "#DC2626", label: "Requires Careful Planning" },
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
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", color: "#2A2520" }}>
              Can You Build on Your Lot?
            </h3>
            <p className="text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8E80", fontWeight: 300 }}>
              Free preliminary feasibility check
            </p>
          </div>
        </div>
      </div>

      {!submitted ? (
        <div className="px-6 sm:px-8 py-6 space-y-5">
          {/* Address */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <MapPin className="w-4 h-4" style={{ color: "#C5A55A" }} />
              Property Address <span style={{ color: "#C0B8AD", fontWeight: 300 }}>(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 123 Main St, New Port Richey, FL"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`${inputClass} ${inputFocusRing}`}
              style={{ ...inputStyle, "--tw-placeholder-opacity": 1 } as React.CSSProperties}
            />
          </div>

          {/* Flood Zone */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <Droplets className="w-4 h-4" style={{ color: "#C5A55A" }} />
              Flood Zone
            </label>
            <select
              value={formData.floodZone}
              onChange={(e) => setFormData({ ...formData, floodZone: e.target.value })}
              className={`${inputClass} ${inputFocusRing} appearance-none`}
              style={inputStyle}
            >
              <option value="">Select flood zone...</option>
              <option value="x">Zone X (Minimal Risk)</option>
              <option value="x_shaded">Zone X Shaded (Moderate Risk)</option>
              <option value="ah">Zone AH (Shallow Flooding)</option>
              <option value="ao">Zone AO (Sheet Flow)</option>
              <option value="ae">Zone AE (High Risk)</option>
              <option value="ve">Zone VE (Coastal High Risk)</option>
              <option value="unsure">I'm Not Sure</option>
            </select>
          </div>

          {/* Lot Size */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <Maximize className="w-4 h-4" style={{ color: "#C5A55A" }} />
              Lot Size (acres)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g., 0.25"
              value={formData.lotSize}
              onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })}
              className={`${inputClass} ${inputFocusRing}`}
              style={inputStyle}
            />
          </div>

          {/* HOA */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <Building2 className="w-4 h-4" style={{ color: "#C5A55A" }} />
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
                  className="py-2.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    border: formData.hoa === opt.value ? "2px solid #C5A55A" : "1px solid #E5DDD0",
                    background: formData.hoa === opt.value ? "rgba(197,165,90,0.08)" : "#FFFFFF",
                    color: formData.hoa === opt.value ? "#9A7B3C" : "#7A7068",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Waterfront */}
          <div>
            <label className={labelClass} style={labelStyle}>
              <Waves className="w-4 h-4" style={{ color: "#C5A55A" }} />
              Waterfront Property?
            </label>
            <select
              value={formData.waterfront}
              onChange={(e) => setFormData({ ...formData, waterfront: e.target.value })}
              className={`${inputClass} ${inputFocusRing} appearance-none`}
              style={inputStyle}
            >
              <option value="">Select...</option>
              <option value="no">No — Not Waterfront</option>
              <option value="gulf">Yes — Gulf / Ocean</option>
              <option value="river">Yes — River</option>
              <option value="lake">Yes — Lake</option>
              <option value="canal">Yes — Canal</option>
            </select>
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
          <div
            className="rounded-lg p-4 flex items-start gap-3"
            style={{
              background: scoreStyles[result.score].bg,
              border: `1px solid ${scoreStyles[result.score].border}`,
            }}
          >
            {result.score === "high" ? (
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: scoreStyles[result.score].text }} />
            ) : result.score === "moderate" ? (
              <Info className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: scoreStyles[result.score].text }} />
            ) : (
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: scoreStyles[result.score].text }} />
            )}
            <div>
              <p className="font-semibold text-sm uppercase tracking-wider mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: scoreStyles[result.score].text }}>
                {scoreStyles[result.score].label}
              </p>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#5A5248" }}>
                {result.summary}
              </p>
            </div>
          </div>

          {/* Permitting Considerations */}
          <div>
            <h4 className="text-sm tracking-wider uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C", fontWeight: 600 }}>
              Likely Permitting Considerations
            </h4>
            <ul className="space-y-2">
              {result.permitting.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 text-xs" style={{ color: "#C5A55A" }}>●</span>
                  <span className="text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#5A5248" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div>
              <h4 className="text-sm tracking-wider uppercase mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "#9A7B3C", fontWeight: 600 }}>
                Our Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: "#C5A55A" }} />
                    <span className="text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: "#5A5248" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
              Schedule a Free Consultation
            </a>
            <button
              onClick={() => { setSubmitted(false); setResult(null); setFormData({ address: "", floodZone: "", lotSize: "", hoa: "", waterfront: "" }); }}
              className="block w-full py-2.5 text-sm transition-colors text-center"
              style={{ fontFamily: "'Outfit', sans-serif", color: "#9A8E80" }}
            >
              Check Another Lot
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
