# Turnstile Astro integration

A small [Astro integration](https://docs.astro.build/en/reference/integrations-reference/)
for verifying [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
tokens on the server.

You configure the secret key once in `astro.config.mjs`, then call a single
server-side `verifyTurnstile()` helper from anywhere on the server (API routes
or Astro actions). The widget itself is rendered on the client with the public
site key — see [Rendering the widget](#rendering-the-widget).

## Setup

Already wired up in `astro.config.mjs`:

```js
import turnstile from "./src/integrations/turnstile";

export default defineConfig({
  integrations: [
    // ...
    turnstile(),
    // secretKey defaults to the TURNSTILE_SECRET_KEY environment variable;
    // siteKey defaults to PUBLIC_TURNSTILE_SITE_KEY.
  ],
});
```

Set the keys in your environment (and `.env` for local dev):

```
PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

The site key is **public** (hence the `PUBLIC_` prefix so the client can read
it). The secret key is **server-only** and must never be exposed to the client.

### Options

| Option         | Required | Default                                                              | Description                                              |
| -------------- | -------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| `secretKey`    | no       | `TURNSTILE_SECRET_KEY` env var                                       | Secret key. Falls back to the env var named by `secretKeyEnv`. |
| `secretKeyEnv` | no       | `"TURNSTILE_SECRET_KEY"`                                             | Name of the env var to read the secret key from.        |
| `siteKey`      | no       | `PUBLIC_TURNSTILE_SITE_KEY` env var                                  | Public site key. Only used to warn at build if missing. |
| `siteKeyEnv`   | no       | `"PUBLIC_TURNSTILE_SITE_KEY"`                                        | Name of the env var the widget reads on the client.     |
| `endpoint`     | no       | `"https://challenges.cloudflare.com/turnstile/v0/siteverify"`       | `siteverify` endpoint (override for testing).           |

## Usage

Import `verifyTurnstile` from the virtual module `virtual:turnstile`. It is
**server-only** — use it in API routes (`src/pages/api/*`) or Astro actions,
never in a client component (that would leak the secret key).

```ts
// src/actions/contactForm.ts
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { verifyTurnstile } from "virtual:turnstile";

export const contactForm = defineAction({
  input: z.object({
    email: z.string().email(),
    cfTurnstileResponse: z
      .string()
      .min(1, { message: "Turnstile verification required" }),
  }),
  handler: async (input) => {
    const { success } = await verifyTurnstile(input.cfTurnstileResponse);
    if (!success) {
      return {
        success: false,
        error: { message: "Turnstile verification failed. Please try again." },
      };
    }

    // ...continue handling the submission
    return { success: true };
  },
});
```

### `verifyTurnstile(token, options?)`

| Argument                 | Type     | Notes                                                        |
| ------------------------ | -------- | ----------------------------------------------------------- |
| `token`                  | `string` | The widget response token from the client (required).       |
| `options.remoteIp`       | `string` | Visitor IP (e.g. `CF-Connecting-IP` header). Optional.      |
| `options.idempotencyKey` | `string` | Re-validate a token with the same result. Optional.         |

Returns a `TurnstileVerifyResult`:

| Field         | Type       | Notes                                          |
| ------------- | ---------- | ---------------------------------------------- |
| `success`     | `boolean`  | Whether the token is valid.                    |
| `challengeTs` | `string`   | ISO timestamp the challenge was solved.        |
| `hostname`    | `string`   | Hostname the challenge was solved on.          |
| `errorCodes`  | `string[]` | Cloudflare error codes (empty on success).     |
| `action`      | `string`   | `action` configured on the widget, if any.     |
| `cdata`       | `string`   | `cData` attached to the widget, if any.        |

Throws `TurnstileError` (with a `status`) when the secret key is missing or the
request to Cloudflare fails, so wrap calls in `try/catch` if you want to handle
those cases explicitly. An empty `token` resolves to `{ success: false }`
without calling Cloudflare.

## Rendering the widget

This integration handles **server-side verification only**. Render the widget
on the client with the public site key. This project uses
[`@svelte-put/cloudflare-turnstile`](https://svelte-put.vnphanquang.com/docs/cloudflare-turnstile)
in Svelte forms:

```svelte
<script>
  import { turnstile } from "@svelte-put/cloudflare-turnstile";
  const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;
  let cfTurnstileResponse = $state("");
</script>

<div
  use:turnstile
  turnstile-sitekey={TURNSTILE_SITE_KEY}
  turnstile-theme="light"
  onturnstile={(e) => (cfTurnstileResponse = e.detail.token)}
></div>
```

The captured `cfTurnstileResponse` token is then sent to the action/API route
and passed to `verifyTurnstile()`.
