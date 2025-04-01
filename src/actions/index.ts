import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import * as postmark from "postmark";
import mjml2html from "mjml";
import { adminEmailTemplate } from "./email-templates/adminEmailTemplate";
import { clientEmailTemplate } from "./email-templates/clientEmailTemplate";
import { excludedZipCodeAdminEmailTemplate } from "./email-templates/excludedZipCodeAdminEmail";
import { getEntry } from "astro:content";
import { getZipCodes, } from "@utils/getZipcodes";

export const server = {
  quoteForm: defineAction({
    input: z.object({
      serviceType: z.string(),
      firstName: z.string().min(1, { message: "Please enter your first name" }),
      lastName: z.string().min(1, { message: "Please enter your last name" }),
      initialDeliveryZip: z.string().min(5, { message: "Please enter a valid zip code" }),
      finalDeliveryZip: z.string().optional(),
      deliveryDate: z.string().min(1, { message: "Please enter a date" }),
      email: z.string().email({ message: "Please enter a valid email address" }),
      phone: z.string().min(1, { message: "Phone number is required" }),
      selectedContainerType: z.string(),
      storeItType: z.string().optional(),
      cfTurnstileResponse: z.string().min(1, { message: "Turnstile verification required" }),
      isExcludedZip: z.boolean().optional(),
    }),
    handler: async (input) => {
      // 1. Validate Turnstile response
      const formData = new FormData();
      formData.append("secret", import.meta.env.TURNSTILE_SECRET_TOKEN);
      formData.append("response", input.cfTurnstileResponse);

      const result = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        { method: "POST", body: formData }
      );

      const turnstileCheck = await result.json();
      if (!turnstileCheck.success) {
        return {
          success: false,
          error: { message: "Turnstile verification failed. Please try again." }
        };
      }

      // 2. Fetch settings
      const emailSettings = await getEntry("singletons", "email");
      const general = await getEntry("singletons", "general");

      // 3. Initialize email client
      const client = new postmark.ServerClient(import.meta.env.POSTMARK_SERVER_TOKEN);

      try {
        // 4. Check zip code status
        const zipCodesResponse = await getZipCodes();

        // Determine if zip is excluded or not serviceable
        const isExcluded = !zipCodesResponse.includes(input.initialDeliveryZip);
        if (isExcluded) {

          console.log("Processing excluded zip code submission:", input.initialDeliveryZip);

          const { html: excludedAdminEmailBody } = mjml2html(
            excludedZipCodeAdminEmailTemplate.html(input, emailSettings.data, general.data)
          );
          // Send notification for excluded zip code
          await client.sendEmail({
            From: `${emailSettings.data.fromEmailName} <${emailSettings.data.fromEmail}>`,
            To: emailSettings.data.outOfTerritoryRecipients
              .map((recipient: any) => recipient.email)
              .join(", "),
            Subject: "Out of Service Area Submission",
            HtmlBody: excludedAdminEmailBody,
            MessageStream: "outbound"
          });

          return {
            success: false,
            error: {
              message: "Sorry, we do not service this zip code.",
              excludedZip: true
            }
          };
        }

        // 5. Process valid zip codes
        const { html: clientEmailBody } = mjml2html(
          clientEmailTemplate.html(input, emailSettings.data, general.data)
        );
        const { html: adminEmailBody } = mjml2html(
          adminEmailTemplate.html(input, emailSettings.data, general.data)
        );

        // Send client email
        await client.sendEmail({
          From: `${emailSettings.data.fromEmailName} <${emailSettings.data.fromEmail}>`,
          To: input.email,
          Cc: emailSettings.data.clientEmailRecipientsBcc
            .map((recipient: any) => recipient.email)
            .join(", "),
          Subject: "Thank You for Your Free Quote Request",
          HtmlBody: clientEmailBody,
          MessageStream: "outbound"
        });

        // Send admin email
        await client.sendEmail({
          From: `${emailSettings.data.fromEmailName} <${emailSettings.data.fromEmail}>`,
          To: emailSettings.data.adminEmailRecipients
            .map((recipient: any) => recipient.email)
            .join(", "),
          Subject: "New Free Quote Submission",
          HtmlBody: adminEmailBody,
          MessageStream: "outbound"
        });

        return {
          success: true,
          data: {
            serviceType: input.serviceType,
            initialDeliveryZip: input.initialDeliveryZip,
            finalDeliveryZip: input.finalDeliveryZip,
          }
        };

      } catch (error) {
        console.error("Error processing form submission:", error);
        return {
          success: false,
          error: { message: "An error occurred while processing your request." }
        };
      }
    },
  }),
};