import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import type { AstroIntegration } from "astro";

export interface TurnstileOptions {
  /**
   * Cloudflare Turnstile secret key. If omitted, the integration reads it from
   * the environment variable named by `secretKeyEnv` (default
   * `TURNSTILE_SECRET_KEY`). Server-side only — never expose this.
   */
  secretKey?: string;
  /**
   * Name of the environment variable holding the secret key.
   * @default "TURNSTILE_SECRET_KEY"
   */
  secretKeyEnv?: string;
  /**
   * Public site key. Only used at build time to warn when it is missing — the
   * widget reads it on the client via `import.meta.env[siteKeyEnv]`.
   */
  siteKey?: string;
  /**
   * Name of the (PUBLIC_) environment variable holding the site key.
   * @default "PUBLIC_TURNSTILE_SITE_KEY"
   */
  siteKeyEnv?: string;
  /**
   * Cloudflare `siteverify` endpoint.
   * @default "https://challenges.cloudflare.com/turnstile/v0/siteverify"
   */
  endpoint?: string;
}

const VIRTUAL_ID = "virtual:turnstile";
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID;
const DEFAULT_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export default function turnstile(
  options: TurnstileOptions = {},
): AstroIntegration {
  const {
    endpoint = DEFAULT_ENDPOINT,
    secretKeyEnv = "TURNSTILE_SECRET_KEY",
    siteKeyEnv = "PUBLIC_TURNSTILE_SITE_KEY",
  } = options;

  return {
    name: "turnstile",
    hooks: {
      "astro:config:setup": ({ command, updateConfig, logger }) => {
        // Resolve the secret at config time so it is bundled into the server
        // output only (the virtual module is never imported from the client).
        const env = loadEnv(
          command === "dev" ? "development" : "production",
          process.cwd(),
          "",
        );
        const secretKey = options.secretKey ?? env[secretKeyEnv];
        const siteKey = options.siteKey ?? env[siteKeyEnv];

        if (!secretKey) {
          logger.warn(
            `no secret key found — set \`${secretKeyEnv}\` in your environment or pass \`secretKey\`. Verification will always fail.`,
          );
        }
        if (!siteKey) {
          logger.warn(
            `no site key found — set \`${siteKeyEnv}\` so the widget can render on the client.`,
          );
        }

        const runtimeId = fileURLToPath(new URL("./runtime.ts", import.meta.url));

        updateConfig({
          vite: {
            plugins: [
              {
                name: "vite-plugin-turnstile",
                resolveId(id) {
                  if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
                },
                load(id) {
                  if (id !== RESOLVED_VIRTUAL_ID) return;
                  const config = { secretKey, endpoint };
                  return [
                    `import { createVerifier } from ${JSON.stringify(runtimeId)};`,
                    `export const verifyTurnstile = createVerifier(${JSON.stringify(config)});`,
                  ].join("\n");
                },
              },
            ],
          },
        });
      },
    },
  };
}
