import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import type { AstroIntegration } from "astro";

export interface GetoutsendOptions {
  /**
   * Default "From" name shown on outgoing email, e.g. "Mobile Storage Solutions".
   * Can be overridden per-message via `sendEmail({ fromName })`.
   */
  fromName: string;
  /**
   * Default "From" email address. Its domain must be a verified sending
   * domain in your getoutsend workspace.
   * Can be overridden per-message via `sendEmail({ fromEmail })`.
   */
  fromEmail: string;
  /**
   * getoutsend API key. If omitted, the integration reads it from the
   * environment variable named by `apiKeyEnv` (default `GETOUTSEND_API_KEY`).
   */
  apiKey?: string;
  /**
   * Name of the environment variable holding the API key.
   * @default "GETOUTSEND_API_KEY"
   */
  apiKeyEnv?: string;
  /**
   * Base URL of the getoutsend service.
   * @default "https://app.getoutsend.com"
   */
  baseUrl?: string;
}

const VIRTUAL_ID = "virtual:getoutsend";
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID;

export default function getoutsend(options: GetoutsendOptions): AstroIntegration {
  const {
    fromName,
    fromEmail,
    baseUrl = "https://app.getoutsend.com",
    apiKeyEnv = "GETOUTSEND_API_KEY",
  } = options;

  return {
    name: "getoutsend",
    hooks: {
      "astro:config:setup": ({ command, updateConfig, logger }) => {
        // Resolve the API key at config time so the secret is bundled into the
        // server output only (it is never imported from a client component).
        const env = loadEnv(
          command === "dev" ? "development" : "production",
          process.cwd(),
          "",
        );
        const apiKey = options.apiKey ?? env[apiKeyEnv];

        if (!fromEmail || !fromName) {
          logger.warn("`fromName` and `fromEmail` should both be set.");
        }
        if (!apiKey) {
          logger.warn(
            `no API key found — set \`${apiKeyEnv}\` in your environment or pass \`apiKey\`. Emails will fail to send.`,
          );
        }

        const runtimeId = fileURLToPath(new URL("./runtime.ts", import.meta.url));

        updateConfig({
          vite: {
            plugins: [
              {
                name: "vite-plugin-getoutsend",
                resolveId(id) {
                  if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
                },
                load(id) {
                  if (id !== RESOLVED_VIRTUAL_ID) return;
                  const config = { apiKey, fromName, fromEmail, baseUrl };
                  return [
                    `import { createClient } from ${JSON.stringify(runtimeId)};`,
                    `export const sendEmail = createClient(${JSON.stringify(config)});`,
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
