/**
 * Table-based HTML email primitives. These replace the MJML compile step:
 * each helper returns the same markup MJML used to generate, so templates stay
 * declarative while the output works in Outlook, Gmail and Apple Mail.
 */

const BRAND_YELLOW = "#ffd51d";
const FONT_STACK = "Arial, Helvetica, sans-serif";

/** Escape interpolated values so form input can't break out into markup. */
export const escapeHtml = (value: unknown): string =>
  value == null
    ? ""
    : String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

interface SectionOptions {
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
}

/** One full-width band of the email. */
export const section = (
  content: string,
  {
    backgroundColor = "#ffffff",
    padding = "20px 30px",
    borderRadius,
  }: SectionOptions = {},
): string => `
      <tr>
        <td class="mobile-padding" style="background-color:${backgroundColor};padding:${padding};${
          borderRadius ? `border-radius:${borderRadius};` : ""
        }">
          ${content}
        </td>
      </tr>`;

interface TextOptions {
  fontSize?: string;
  color?: string;
  lineHeight?: string;
  align?: "left" | "center" | "right";
  fontWeight?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export const text = (
  content: string,
  {
    fontSize = "16px",
    color = "#555555",
    lineHeight = "1.8",
    align = "left",
    fontWeight = "normal",
    paddingTop = "0",
    paddingBottom = "0",
  }: TextOptions = {},
): string =>
  `<p style="margin:0;padding-top:${paddingTop};padding-bottom:${paddingBottom};font-family:${FONT_STACK};font-size:${fontSize};font-weight:${fontWeight};color:${color};line-height:${lineHeight};text-align:${align};">${content}</p>`;

export const heading = (
  content: string,
  { fontSize = "24px", color = "#333333" }: TextOptions = {},
): string =>
  `<h1 style="margin:0;font-family:${FONT_STACK};font-size:${fontSize};font-weight:bold;color:${color};line-height:1.3;text-align:center;">${content}</h1>`;

export const divider = (color = BRAND_YELLOW): string => `
          <table role="presentation" width="60%" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:15px auto 0;">
            <tr><td style="border-top:2px solid ${color};font-size:0;line-height:0;">&nbsp;</td></tr>
          </table>`;

export const image = (src: string, alt: string, width = "150"): string => `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="center"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="${width}" style="display:block;width:${width}px;max-width:100%;height:auto;border:0;" /></td></tr>
          </table>`;

interface ButtonOptions {
  backgroundColor?: string;
  color?: string;
}

/** Bulletproof button — the table wrapper is what keeps Outlook honest. */
export const button = (
  label: string,
  href: string,
  { backgroundColor = BRAND_YELLOW, color = "#000000" }: ButtonOptions = {},
): string => `
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:20px auto 0;">
            <tr>
              <td align="center" bgcolor="${backgroundColor}" style="border-radius:4px;">
                <a href="${escapeHtml(href)}" style="display:inline-block;padding:15px 30px;font-family:${FONT_STACK};font-size:16px;font-weight:bold;color:${color};text-decoration:none;border-radius:4px;">${label}</a>
              </td>
            </tr>
          </table>`;

/**
 * Renders `label: value` rows, skipping any entry with an empty value so
 * optional form fields drop out the way the MJML conditionals did.
 */
export const detailList = (
  rows: Array<[label: string, value: unknown]>,
  { labelColor = "#333333", valueColor = "#555555" } = {},
): string => {
  const body = rows
    .filter(([, value]) => value != null && String(value).trim() !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 0;font-family:${FONT_STACK};font-size:14px;line-height:1.6;color:${valueColor};"><strong style="color:${labelColor};">${escapeHtml(label)}:</strong> ${value}</td></tr>`,
    )
    .join("");

  return `
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${body}
          </table>`;
};

export const link = (label: string, href: string, color = BRAND_YELLOW) =>
  `<a href="${escapeHtml(href)}" style="color:${color};text-decoration:none;font-weight:600;">${label}</a>`;

interface LayoutOptions {
  /** Inbox preview line, hidden in the rendered body. */
  preview: string;
  /** Section markup, built with the helpers above. */
  sections: string;
}

/** Wraps sections in the document shell every template shares. */
export const layout = ({ preview, sections }: LayoutOptions): string => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(preview)}</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-container { width: 100% !important; }
        .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f4;">
    <div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;">
      <tr>
        <td align="center" style="padding:20px 10px;">
          <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">${sections}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
