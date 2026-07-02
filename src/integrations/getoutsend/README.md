# getoutsend Astro integration

A small [Astro integration](https://docs.astro.build/en/reference/integrations-reference/)
for sending transactional email through [getoutsend](https://app.getoutsend.com).

You configure an API key plus a default "From" name and email once in
`astro.config.mjs`, then call a single server-side `sendEmail()` helper from
anywhere on the server.

## Setup

Already wired up in `astro.config.mjs`:

```js
import getoutsend from "./src/integrations/getoutsend";

export default defineConfig({
  integrations: [
    // ...
    getoutsend({
      fromName: "Mobile Storage Solutions",
      fromEmail: "reservations@mobilestoragesolutions.com",
    }),
  ],
});
```

Set the API key in your environment (and `.env` for local dev):

```
GETOUTSEND_API_KEY=your-api-key
```

The `fromEmail` domain must be a **verified sending domain** in your getoutsend
workspace.

### Options

| Option      | Required | Default                        | Description                                                       |
| ----------- | -------- | ------------------------------ | ----------------------------------------------------------------- |
| `fromName`  | yes      | —                              | Default "From" name on outgoing email.                            |
| `fromEmail` | yes      | —                              | Default "From" address (domain must be verified).                 |
| `apiKey`    | no       | `GETOUTSEND_API_KEY` env var   | API key. Falls back to the env var named by `apiKeyEnv`.          |
| `apiKeyEnv` | no       | `"GETOUTSEND_API_KEY"`         | Name of the env var to read the API key from.                     |
| `baseUrl`   | no       | `"https://app.getoutsend.com"` | getoutsend host (override for self-hosted / staging).             |

## Usage

Import `sendEmail` from the virtual module `virtual:getoutsend`. It is
**server-only** — use it in API routes (`src/pages/api/*`) or Astro actions,
never in a client component (that would leak the API key).

```ts
// src/pages/api/contact.ts
export const prerender = false;
import type { APIRoute } from "astro";
import { sendEmail } from "virtual:getoutsend";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  await sendEmail({
    to: "owner@mobilestoragesolutions.com",
    subject: "New contact form submission",
    html: `<p>From ${data.get("email")}</p>`,
    replyTo: String(data.get("email")),
  });

  return new Response(null, { status: 204 });
};
```

### `sendEmail(options)`

| Field       | Type                          | Notes                                            |
| ----------- | ----------------------------- | ------------------------------------------------ |
| `to`        | `string \| string[]`          | required                                         |
| `subject`   | `string`                      | required                                         |
| `html`      | `string`                      | required unless `text` is set                    |
| `text`      | `string`                      | required unless `html` is set                    |
| `cc`        | `string \| string[]`          | optional                                         |
| `bcc`       | `string \| string[]`          | optional                                         |
| `replyTo`   | `string \| string[]`          | optional                                         |
| `headers`   | `Record<string, string>`      | optional custom headers                          |
| `fromName`  | `string`                      | override the configured From name for this email |
| `fromEmail` | `string`                      | override the configured From email               |
| `from`      | `string`                      | full `"Name <email>"`, overrides the above       |

Returns `{ id, stream }` on success. Throws `GetoutsendError` (with a `status`)
on failure, so wrap calls in `try/catch` if you want to handle errors.
