declare module "virtual:getoutsend" {
  import type { SendEmailOptions, SendEmailResult } from "./runtime";

  /**
   * Send a transactional email through getoutsend. Server-side only — import
   * it from API routes (`src/pages/api/*`) or Astro actions, never from a
   * client component.
   */
  export const sendEmail: (
    options: SendEmailOptions,
  ) => Promise<SendEmailResult>;
}
