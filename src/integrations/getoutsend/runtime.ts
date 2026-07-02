export interface SendEmailOptions {
  /** Recipient address(es). */
  to: string | string[];
  /** Email subject line. */
  subject: string;
  /** HTML body. At least one of `html` or `text` is required. */
  html?: string;
  /** Plain-text body. At least one of `html` or `text` is required. */
  text?: string;
  /** CC address(es). */
  cc?: string | string[];
  /** BCC address(es). */
  bcc?: string | string[];
  /** Reply-To address(es). */
  replyTo?: string | string[];
  /** Custom email headers. */
  headers?: Record<string, string>;
  /** Override the configured "From" name for this message. */
  fromName?: string;
  /** Override the configured "From" email for this message. */
  fromEmail?: string;
  /**
   * Fully-formed "From" value (e.g. `"Acme <hi@acme.com>"`). Takes precedence
   * over `fromName`/`fromEmail` and the integration defaults.
   */
  from?: string;
}

/** Successful response from `POST /api/v1/emails`. */
export interface SendEmailResult {
  id: number;
  stream: string;
}

interface ClientConfig {
  apiKey: string | undefined;
  fromName: string;
  fromEmail: string;
  baseUrl: string;
}

export class GetoutsendError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "GetoutsendError";
  }
}

function toArray(value: string | string[] | undefined): string[] | undefined {
  if (value == null) return undefined;
  const arr = (Array.isArray(value) ? value : [value]).filter(Boolean);
  return arr.length ? arr : undefined;
}

function formatFrom(name: string, email: string): string {
  return name ? `${name} <${email}>` : email;
}

export function createClient(config: ClientConfig) {
  return async function sendEmail(
    options: SendEmailOptions,
  ): Promise<SendEmailResult> {
    if (!config.apiKey) {
      throw new GetoutsendError(
        "Missing getoutsend API key. Set it in your environment or pass `apiKey` to the integration.",
      );
    }
    if (!options.html && !options.text) {
      throw new GetoutsendError("Either `html` or `text` body is required.");
    }

    const from =
      options.from ??
      formatFrom(
        options.fromName ?? config.fromName,
        options.fromEmail ?? config.fromEmail,
      );

    const body = {
      from,
      to: toArray(options.to),
      subject: options.subject,
      html: options.html,
      text: options.text,
      cc: toArray(options.cc),
      bcc: toArray(options.bcc),
      replyTo: toArray(options.replyTo),
      headers: options.headers,
    };

    const res = await fetch(new URL("/api/v1/emails", config.baseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      let message = `Request failed with status ${res.status}.`;
      try {
        const errBody = (await res.json()) as { error?: string };
        if (errBody?.error) message = errBody.error;
      } catch {
        // non-JSON error response; keep the status message
      }
      throw new GetoutsendError(message, res.status);
    }

    return (await res.json()) as SendEmailResult;
  };
}
