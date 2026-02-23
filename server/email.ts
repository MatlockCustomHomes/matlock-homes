import { Resend } from "resend";
import { ENV } from "./_core/env";

const resend = new Resend(ENV.resendApiKey);

const TO_EMAIL = "matlockhomes@icloud.com";
const FROM_EMAIL = "Matlock Custom Homes <notifications@matlockcustomhomes.com>";

interface EmailOptions {
  subject: string;
  html: string;
}

export async function sendEmail({ subject, html }: EmailOptions): Promise<boolean> {
  try {
    if (!ENV.resendApiKey) {
      console.warn("[Email] RESEND_API_KEY not set, skipping email");
      return false;
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
    });

    if (error) {
      console.error("[Email] Failed to send:", error);
      return false;
    }

    console.log(`[Email] Sent: ${subject}`);
    return true;
  } catch (err) {
    console.error("[Email] Error:", err);
    return false;
  }
}

// ── Formatted email templates ──

export function contactEmail(data: { name: string; email: string; phone?: string; message: string }) {
  return sendEmail({
    subject: `New Contact Form: ${data.name}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #2C2C2C; padding: 24px 32px;">
          <h1 style="color: #C5A55A; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #888; width: 120px; vertical-align: top;">Name</td><td style="padding: 10px 0; color: #2C2C2C; font-weight: 600;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Email</td><td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #C5A55A;">${data.email}</a></td></tr>
            ${data.phone ? `<tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Phone</td><td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #C5A55A;">${data.phone}</a></td></tr>` : ""}
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #2C2C2C;">${data.message}</td></tr>
          </table>
        </div>
        <div style="padding: 16px 32px; background: #f9f7f2; text-align: center; color: #999; font-size: 12px;">
          Matlock Custom Homes — matlockhomesfl.com
        </div>
      </div>
    `,
  });
}

export function intakeEmail(data: { name: string; phone: string; email: string; projectType: string; budget: string; timeline: string; address?: string; details?: string }) {
  return sendEmail({
    subject: `New Estimate Request: ${data.name} — ${data.projectType}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #2C2C2C; padding: 24px 32px;">
          <h1 style="color: #C5A55A; margin: 0; font-size: 22px;">New Estimate Request</h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #888; width: 120px; vertical-align: top;">Name</td><td style="padding: 10px 0; color: #2C2C2C; font-weight: 600;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Phone</td><td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #C5A55A;">${data.phone}</a></td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Email</td><td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #C5A55A;">${data.email}</a></td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Project Type</td><td style="padding: 10px 0; color: #2C2C2C;">${data.projectType}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Budget</td><td style="padding: 10px 0; color: #2C2C2C;">${data.budget}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Timeline</td><td style="padding: 10px 0; color: #2C2C2C;">${data.timeline}</td></tr>
            ${data.address ? `<tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Address</td><td style="padding: 10px 0; color: #2C2C2C;">${data.address}</td></tr>` : ""}
            ${data.details ? `<tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Details</td><td style="padding: 10px 0; color: #2C2C2C;">${data.details}</td></tr>` : ""}
          </table>
        </div>
        <div style="padding: 16px 32px; background: #f9f7f2; text-align: center; color: #999; font-size: 12px;">
          Matlock Custom Homes — matlockhomesfl.com
        </div>
      </div>
    `,
  });
}

export function chatEmail(data: { messages: Array<{ role: string; content: string }>; userInfo?: string }) {
  const messageRows = data.messages
    .map(
      (m) =>
        `<tr><td style="padding: 8px 12px; color: ${m.role === "user" ? "#2C2C2C" : "#888"}; background: ${m.role === "user" ? "#f9f7f2" : "#fff"}; border-bottom: 1px solid #eee;"><strong>${m.role === "user" ? "Visitor" : "Bot"}:</strong> ${m.content}</td></tr>`
    )
    .join("");

  return sendEmail({
    subject: `Chat Transcript${data.userInfo ? ` — ${data.userInfo}` : ""}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #2C2C2C; padding: 24px 32px;">
          <h1 style="color: #C5A55A; margin: 0; font-size: 22px;">Chat Transcript</h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          ${data.userInfo ? `<p style="color: #888; margin-bottom: 16px;">Visitor info: ${data.userInfo}</p>` : ""}
          <table style="width: 100%; border-collapse: collapse;">${messageRows}</table>
        </div>
        <div style="padding: 16px 32px; background: #f9f7f2; text-align: center; color: #999; font-size: 12px;">
          Matlock Custom Homes — matlockhomesfl.com
        </div>
      </div>
    `,
  });
}

export function lotFeasibilityEmail(data: { address: string; floodZone: string; lotSize: string; hoa: string; waterfront: string; feasibility: string; considerations: string[] }) {
  const considerationsList = data.considerations.map((c) => `<li style="padding: 4px 0; color: #2C2C2C;">${c}</li>`).join("");

  return sendEmail({
    subject: `Lot Feasibility Check: ${data.address}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #2C2C2C; padding: 24px 32px;">
          <h1 style="color: #C5A55A; margin: 0; font-size: 22px;">Lot Feasibility Check</h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #888; width: 120px; vertical-align: top;">Address</td><td style="padding: 10px 0; color: #2C2C2C; font-weight: 600;">${data.address}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Flood Zone</td><td style="padding: 10px 0; color: #2C2C2C;">${data.floodZone}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Lot Size</td><td style="padding: 10px 0; color: #2C2C2C;">${data.lotSize}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">HOA</td><td style="padding: 10px 0; color: #2C2C2C;">${data.hoa}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Waterfront</td><td style="padding: 10px 0; color: #2C2C2C;">${data.waterfront}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9f7f2; border-left: 4px solid #C5A55A;">
            <p style="margin: 0 0 8px; color: #888; font-size: 13px;">FEASIBILITY RESULT</p>
            <p style="margin: 0; color: #2C2C2C; font-weight: 600;">${data.feasibility}</p>
          </div>
          ${considerationsList ? `<div style="margin-top: 16px;"><p style="color: #888; font-size: 13px; margin-bottom: 8px;">PERMITTING CONSIDERATIONS</p><ul style="margin: 0; padding-left: 20px;">${considerationsList}</ul></div>` : ""}
        </div>
        <div style="padding: 16px 32px; background: #f9f7f2; text-align: center; color: #999; font-size: 12px;">
          Matlock Custom Homes — matlockhomesfl.com
        </div>
      </div>
    `,
  });
}

export function renovateOrRebuildEmail(data: { homeAge: string; squareFootage: string; desiredAddition: string; budget: string; renovationCost: string; rebuildCost: string; recommendation: string }) {
  return sendEmail({
    subject: `Renovate vs Rebuild: ${data.squareFootage} sqft, ${data.homeAge} yr old home`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #2C2C2C; padding: 24px 32px;">
          <h1 style="color: #C5A55A; margin: 0; font-size: 22px;">Renovate or Rebuild Calculator</h1>
        </div>
        <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #888; width: 140px; vertical-align: top;">Home Age</td><td style="padding: 10px 0; color: #2C2C2C;">${data.homeAge} years</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Square Footage</td><td style="padding: 10px 0; color: #2C2C2C;">${data.squareFootage} sqft</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Desired Addition</td><td style="padding: 10px 0; color: #2C2C2C;">${data.desiredAddition}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; vertical-align: top;">Budget</td><td style="padding: 10px 0; color: #2C2C2C;">${data.budget}</td></tr>
          </table>
          <div style="margin-top: 20px; display: flex; gap: 16px;">
            <div style="flex: 1; padding: 16px; background: #f9f7f2; border-left: 4px solid #C5A55A;">
              <p style="margin: 0 0 4px; color: #888; font-size: 13px;">RENOVATION ESTIMATE</p>
              <p style="margin: 0; color: #2C2C2C; font-weight: 600; font-size: 18px;">${data.renovationCost}</p>
            </div>
          </div>
          <div style="margin-top: 12px;">
            <div style="padding: 16px; background: #f9f7f2; border-left: 4px solid #2C2C2C;">
              <p style="margin: 0 0 4px; color: #888; font-size: 13px;">REBUILD ESTIMATE</p>
              <p style="margin: 0; color: #2C2C2C; font-weight: 600; font-size: 18px;">${data.rebuildCost}</p>
            </div>
          </div>
          <div style="margin-top: 16px; padding: 16px; background: #2C2C2C; color: #fff;">
            <p style="margin: 0 0 4px; color: #C5A55A; font-size: 13px;">RECOMMENDATION</p>
            <p style="margin: 0;">${data.recommendation}</p>
          </div>
        </div>
        <div style="padding: 16px 32px; background: #f9f7f2; text-align: center; color: #999; font-size: 12px;">
          Matlock Custom Homes — matlockhomesfl.com
        </div>
      </div>
    `,
  });
}
