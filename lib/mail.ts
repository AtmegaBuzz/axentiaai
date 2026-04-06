import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_NAME = process.env.SMTP_FROM_NAME || 'Axentia.AI';
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || '';

interface SendContactConfirmationParams {
  to: string;
  name: string;
}

/**
 * Loads the HTML email template from /emails and replaces placeholders.
 */
function loadTemplate(
  templateName: string,
  vars: Record<string, string>
): string {
  const filePath = path.join(process.cwd(), 'emails', `${templateName}.html`);
  let html = fs.readFileSync(filePath, 'utf-8');

  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }

  return html;
}

/**
 * Sends a contact confirmation email to the user.
 * This is fire-and-forget — errors are logged but don't break the API response.
 */
export async function sendContactConfirmation({
  to,
  name,
}: SendContactConfirmationParams): Promise<void> {
  if (!FROM_EMAIL) {
    console.warn('[mail] SMTP not configured, skipping email send.');
    return;
  }

  const firstName = name.split(' ')[0];
  const year = new Date().getFullYear().toString();

  const html = loadTemplate('contact-confirmation', {
    NAME: name,
    FIRST_NAME: firstName,
    YEAR: year,
  });

  try {
    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to,
      subject: `Thank you for contacting Axentia.AI`,
      html,
    });
    console.log(`[mail] Confirmation sent to ${to}`);
  } catch (err) {
    console.error('[mail] Failed to send email:', err);
  }
}
