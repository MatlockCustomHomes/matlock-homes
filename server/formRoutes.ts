/*
 * Form Submission API Routes
 * All form submissions are sent to the project owner via the notification system.
 * Routes: /api/forms/contact, /api/forms/intake, /api/forms/chat,
 *         /api/forms/lot-feasibility, /api/forms/renovate-or-rebuild
 */
import { Router } from "express";
import { notifyOwner } from "./_core/notification";

const router = Router();

// Helper to format date
function formatDate(): string {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Helper to safely send notification (non-blocking)
async function sendNotification(title: string, content: string): Promise<boolean> {
  try {
    return await notifyOwner({ title, content });
  } catch (error) {
    console.error("[Forms] Notification error:", error);
    return false;
  }
}

/**
 * POST /api/forms/contact
 * Contact form submission from the main contact section
 */
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const content = [
      `📬 **New Contact Form Submission**`,
      `📅 ${formatDate()}`,
      ``,
      `**Name:** ${name}`,
      `**Email:** ${email}`,
      `**Phone:** ${phone || "Not provided"}`,
      ``,
      `**Message:**`,
      message,
      ``,
      `---`,
      `Reply to: ${email}`,
    ].join("\n");

    await sendNotification(`New Contact: ${name}`, content);

    res.json({ success: true });
  } catch (error) {
    console.error("[Forms] Contact error:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

/**
 * POST /api/forms/intake
 * Mobile intake popup / estimate questionnaire submission
 */
router.post("/intake", async (req, res) => {
  try {
    const { answers, contactInfo } = req.body;

    if (!contactInfo?.name || !contactInfo?.email) {
      return res.status(400).json({ error: "Contact info required" });
    }

    // Map answer values to readable labels
    const purposeLabels: Record<string, string> = {
      client_build: "Looking to build a custom home",
      client_renovate: "Looking to renovate",
      trade_professional: "Trade professional",
      vendor: "Vendor",
      just_browsing: "Just browsing",
    };

    const homeTypeLabels: Record<string, string> = {
      single_family: "Single-Family Home",
      luxury_estate: "Luxury Estate",
      modern_contemporary: "Modern / Contemporary",
      coastal_florida: "Coastal Florida Style",
      mediterranean: "Mediterranean",
      not_sure: "Not sure yet",
    };

    const sizeLabels: Record<string, string> = {
      under_2000: "Under 2,000 sq ft",
      "2000_3000": "2,000 – 3,000 sq ft",
      "3000_4000": "3,000 – 4,000 sq ft",
      "4000_5000": "4,000 – 5,000 sq ft",
      "5000_plus": "5,000+ sq ft",
      not_sure: "Not sure yet",
    };

    const budgetLabels: Record<string, string> = {
      under_300k: "Under $300,000",
      "300k_500k": "$300,000 – $500,000",
      "500k_750k": "$500,000 – $750,000",
      "750k_1m": "$750,000 – $1,000,000",
      "1m_plus": "$1,000,000+",
      not_sure: "Not sure yet",
    };

    const stageLabels: Record<string, string> = {
      just_starting: "Just starting to explore",
      researching: "Actively researching builders",
      have_land: "Already has land/lot",
      have_plans: "Has plans/designs ready",
      ready_to_build: "Ready to build now",
    };

    const referralLabels: Record<string, string> = {
      google: "Google Search",
      social_media: "Social Media",
      referral: "Friend/Family Referral",
      drive_by: "Drove by a project",
      realtor: "Realtor Recommendation",
      other: "Other",
    };

    const content = [
      `📋 **New Intake / Estimate Submission**`,
      `📅 ${formatDate()}`,
      ``,
      `**Contact Information:**`,
      `• Name: ${contactInfo.name}`,
      `• Email: ${contactInfo.email}`,
      `• Phone: ${contactInfo.phone || "Not provided"}`,
      contactInfo.message ? `• Additional Notes: ${contactInfo.message}` : "",
      ``,
      `**Questionnaire Answers:**`,
      `• Purpose: ${purposeLabels[answers?.purpose] || answers?.purpose || "N/A"}`,
      `• Home Type: ${homeTypeLabels[answers?.home_type] || answers?.home_type || "N/A"}`,
      `• Home Size: ${sizeLabels[answers?.home_size] || answers?.home_size || "N/A"}`,
      `• Budget: ${budgetLabels[answers?.budget] || answers?.budget || "N/A"}`,
      `• Stage: ${stageLabels[answers?.stage] || answers?.stage || "N/A"}`,
      `• Referral: ${referralLabels[answers?.referral] || answers?.referral || "N/A"}`,
      ``,
      `---`,
      `Reply to: ${contactInfo.email}`,
    ].filter(Boolean).join("\n");

    await sendNotification(`New Intake: ${contactInfo.name}`, content);

    res.json({ success: true });
  } catch (error) {
    console.error("[Forms] Intake error:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

/**
 * POST /api/forms/chat
 * Chat conversation submission from the LiveChat widget
 */
router.post("/chat", async (req, res) => {
  try {
    const { messages, contactInfo } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages required" });
    }

    const conversationText = messages
      .map((msg: { sender: string; text: string }) =>
        `${msg.sender === "user" ? "👤 Customer" : "🤖 Bot"}: ${msg.text}`
      )
      .join("\n");

    const contactLine = contactInfo
      ? `\n\n**Contact Info (if provided):**\n• Name: ${contactInfo.name || "N/A"}\n• Email: ${contactInfo.email || "N/A"}\n• Phone: ${contactInfo.phone || "N/A"}`
      : "";

    const content = [
      `💬 **New Chat Conversation**`,
      `📅 ${formatDate()}`,
      ``,
      `**Conversation:**`,
      conversationText,
      contactLine,
      ``,
      `---`,
      `Total messages: ${messages.length}`,
    ].join("\n");

    await sendNotification(`New Chat Conversation`, content);

    res.json({ success: true });
  } catch (error) {
    console.error("[Forms] Chat error:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

/**
 * POST /api/forms/lot-feasibility
 * Lot Feasibility Checker results
 */
router.post("/lot-feasibility", async (req, res) => {
  try {
    const { formData, result } = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Form data required" });
    }

    const floodZoneLabels: Record<string, string> = {
      x: "Zone X (Minimal Risk)",
      x_shaded: "Zone X Shaded (Moderate Risk)",
      ah: "Zone AH (Shallow Flooding)",
      ao: "Zone AO (Sheet Flow)",
      ae: "Zone AE (High Risk)",
      ve: "Zone VE (Coastal High Risk)",
      unsure: "Not Sure",
    };

    const waterfrontLabels: Record<string, string> = {
      no: "Not Waterfront",
      gulf: "Gulf / Ocean",
      river: "River",
      lake: "Lake",
      canal: "Canal",
    };

    const hoaLabels: Record<string, string> = {
      yes: "Yes",
      no: "No",
      unsure: "Not Sure",
    };

    const scoreLabels: Record<string, string> = {
      high: "✅ HIGH FEASIBILITY",
      moderate: "⚠️ MODERATE FEASIBILITY",
      low: "🔴 REQUIRES CAREFUL PLANNING",
    };

    const content = [
      `🏗️ **Lot Feasibility Check Submitted**`,
      `📅 ${formatDate()}`,
      ``,
      `**Lot Details:**`,
      `• Address: ${formData.address || "Not provided"}`,
      `• Flood Zone: ${floodZoneLabels[formData.floodZone] || formData.floodZone}`,
      `• Lot Size: ${formData.lotSize} acres`,
      `• HOA: ${hoaLabels[formData.hoa] || formData.hoa}`,
      `• Waterfront: ${waterfrontLabels[formData.waterfront] || formData.waterfront}`,
      ``,
      `**Result: ${scoreLabels[result?.score] || "N/A"}**`,
      result?.summary || "",
      ``,
      `**Permitting Considerations:**`,
      ...(result?.permitting || []).map((p: string) => `• ${p}`),
      ``,
      `---`,
      `This visitor may be a potential lead — consider following up if address was provided.`,
    ].join("\n");

    await sendNotification(
      `Lot Check: ${formData.address || "No address"} — ${result?.score?.toUpperCase() || "N/A"}`,
      content
    );

    res.json({ success: true });
  } catch (error) {
    console.error("[Forms] Lot feasibility error:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

/**
 * POST /api/forms/renovate-or-rebuild
 * Renovate vs Rebuild calculator results
 */
router.post("/renovate-or-rebuild", async (req, res) => {
  try {
    const { formData, result } = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Form data required" });
    }

    const formatCurrency = (n: number) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

    const recLabels: Record<string, string> = {
      renovate: "🔨 RENOVATION RECOMMENDED",
      rebuild: "🏗️ REBUILD RECOMMENDED",
      either: "⚖️ BOTH OPTIONS VIABLE",
    };

    const content = [
      `🏠 **Renovate vs Rebuild Calculator Submitted**`,
      `📅 ${formatDate()}`,
      ``,
      `**Home Details:**`,
      `• Home Age: ${formData.homeAge} years`,
      `• Current Size: ${parseInt(formData.squareFootage).toLocaleString()} sq ft`,
      `• Desired Addition: ${formData.desiredAddition ? `${parseInt(formData.desiredAddition).toLocaleString()} sq ft` : "None"}`,
      `• Budget: ${formData.budget ? formatCurrency(parseInt(formData.budget)) : "Not provided"}`,
      ``,
      `**Result: ${recLabels[result?.recommendation] || "N/A"}**`,
      `• Renovation Estimate: ${formatCurrency(result?.renovationLow || 0)} – ${formatCurrency(result?.renovationHigh || 0)}`,
      `• Rebuild Estimate: ${formatCurrency(result?.rebuildLow || 0)} – ${formatCurrency(result?.rebuildHigh || 0)}`,
      ``,
      `**Reasoning:**`,
      ...(result?.reasoning || []).map((r: string) => `• ${r}`),
      ``,
      `---`,
      `This visitor is actively evaluating renovation/rebuild options — potential lead.`,
    ].join("\n");

    await sendNotification(
      `Renovate/Rebuild: ${formData.squareFootage} sqft, ${formData.homeAge}yr old — ${result?.recommendation?.toUpperCase() || "N/A"}`,
      content
    );

    res.json({ success: true });
  } catch (error) {
    console.error("[Forms] Renovate/rebuild error:", error);
    res.status(500).json({ error: "Failed to process submission" });
  }
});

export default router;
