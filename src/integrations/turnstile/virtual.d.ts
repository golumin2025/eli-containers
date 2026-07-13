declare module "virtual:turnstile" {
  import type {
    VerifyTurnstileOptions,
    TurnstileVerifyResult,
  } from "./runtime";

  /**
   * Verify a Cloudflare Turnstile token against the `siteverify` endpoint.
   * Server-side only — import it from API routes (`src/pages/api/*`) or Astro
   * actions, never from a client component (that would leak the secret key).
   *
   * Returns `{ success, ... }`; check `result.success` to decide whether to
   * proceed. Throws `TurnstileError` if the secret key is missing or the
   * request to Cloudflare fails.
   */
  export const verifyTurnstile: (
    token: string,
    options?: VerifyTurnstileOptions,
  ) => Promise<TurnstileVerifyResult>;
}
