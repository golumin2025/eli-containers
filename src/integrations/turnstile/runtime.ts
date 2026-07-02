export interface VerifyTurnstileOptions {
  /**
   * The visitor's IP address (e.g. from the `CF-Connecting-IP` request
   * header). Optional, but recommended by Cloudflare for stronger validation.
   */
  remoteIp?: string;
  /**
   * Idempotency key. Pass the same key to re-validate a token and receive the
   * same result without consuming it again.
   */
  idempotencyKey?: string;
}

/** Normalised result of a Turnstile `siteverify` call. */
export interface TurnstileVerifyResult {
  /** Whether the token is valid. */
  success: boolean;
  /** ISO timestamp of when the challenge was solved (`challenge_ts`). */
  challengeTs?: string;
  /** Hostname the challenge was solved on. */
  hostname?: string;
  /** Error codes returned by Cloudflare (empty on success). */
  errorCodes: string[];
  /** Customer `action` configured on the widget, if any. */
  action?: string;
  /** Customer data (`cData`) attached to the widget, if any. */
  cdata?: string;
}

interface VerifierConfig {
  secretKey: string | undefined;
  endpoint: string;
}

export class TurnstileError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "TurnstileError";
  }
}

/** Raw shape of the Cloudflare `siteverify` response. */
interface SiteVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
}

export function createVerifier(config: VerifierConfig) {
  return async function verifyTurnstile(
    token: string,
    options: VerifyTurnstileOptions = {},
  ): Promise<TurnstileVerifyResult> {
    if (!config.secretKey) {
      throw new TurnstileError(
        "Missing Turnstile secret key. Set it in your environment or pass `secretKey` to the integration.",
      );
    }
    if (!token) {
      // No token supplied — treat as a failed verification rather than calling
      // Cloudflare with an empty `response`.
      return { success: false, errorCodes: ["missing-input-response"] };
    }

    const body = new FormData();
    body.append("secret", config.secretKey);
    body.append("response", token);
    if (options.remoteIp) body.append("remoteip", options.remoteIp);
    if (options.idempotencyKey) {
      body.append("idempotency_key", options.idempotencyKey);
    }

    const res = await fetch(config.endpoint, { method: "POST", body });

    if (!res.ok) {
      throw new TurnstileError(
        `Turnstile siteverify request failed with status ${res.status}.`,
        res.status,
      );
    }

    const data = (await res.json()) as SiteVerifyResponse;

    return {
      success: data.success,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data["error-codes"] ?? [],
      action: data.action,
      cdata: data.cdata,
    };
  };
}
