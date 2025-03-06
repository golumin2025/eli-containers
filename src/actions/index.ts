import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import * as postmark from "postmark";
import mjml2html from "mjml";
import { adminEmailTemplate } from "./email-templates/adminEmailTemplate";
import { clientEmailTemplate } from "./email-templates/clientEmailTemplate";
import { getEntry } from "astro:content";

const DEV_MODE = import.meta.env.DEV;

export const server = {
  quoteForm: defineAction({
    input: z.object({
      serviceType: z.string(),
      firstName: z.string().min(1, { message: "Please enter your first name" }),
      lastName: z.string().min(1, { message: "Please enter your last name" }),
      initialDeliveryZip: z.string().min(5, {
        message: "Please enter a valid zip code",
      }),
      finalDeliveryZip: z.string().optional(),
      deliveryDate: z.string().min(1, { message: "Please enter a date" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
      phone: z.string().min(1, { message: "Phone number is required" }),
      selectedContainerType: z.string(),
      storeItType: z.string().optional(),
      cfTurnstileResponse: z
        .string()
        .min(1, { message: "Turnstile verification required" }),
    }),
    handler: async (input) => {
      // Validate Turnstile response
      const formData = new FormData();
      formData.append("secret", import.meta.env.TURNSTILE_SECRET_TOKEN);
      formData.append("response", input.cfTurnstileResponse);

      const result = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: formData,
        },
      );

      const turnstileCheck = await result.json();

      if (!turnstileCheck.success) {
        return {
          success: false,
          error: {
            message: "Turnstile verification failed. Please try again.",
          },
        };

      }
      // Fetch email settings and general settings
      const emailSettings = await getEntry("singletons", "email");
      const general = await getEntry("singletons", "general");

      // Prepare email templates
      const { html: clientEmailBody } = mjml2html(
        clientEmailTemplate.html(input, emailSettings.data, general.data),
      );
      const { html: adminEmailBody } = mjml2html(
        adminEmailTemplate.html(input, emailSettings.data, general.data),
      );

      // Send emails in production mode
      if (DEV_MODE) {
        const postmarkServerToken = import.meta.env.POSTMARK_SERVER_TOKEN;
        const client = new postmark.ServerClient(postmarkServerToken);

        try {
          // Send email to client
          await client.sendEmail({
            From: `${emailSettings.data.fromEmailName} <${emailSettings.data.fromEmail}>`,
            To: `${input.email}`,
            Cc: emailSettings.data.clientEmailRecipientsBcc
              .map((recipient) => recipient.email)
              .join(", "),
            Subject: "Thank You for Your Free Quote Request",
            HtmlBody: clientEmailBody,
            MessageStream: "outbound",
          });

          // Send email to admin
          await client.sendEmail({
            From: `${emailSettings.data.fromEmailName} <${emailSettings.data.fromEmail}>`,
            To: emailSettings.data.adminEmailRecipients
              .map((recipient) => recipient.email)
              .join(", "),
            Subject: "New Free Quote Submission",
            HtmlBody: adminEmailBody,
            MessageStream: "outbound",
          });
        } catch (error) {
          console.error("Error sending email:", error);
          return {
            success: false,
            error: {
              message: "An error occurred while sending the email.",
            },
          };
        }
      }

      // Return success response
      return {
        success: true,
        data: {
          serviceType: input.serviceType,
          initialDeliveryZip: input.initialDeliveryZip,
          finalDeliveryZip: input.finalDeliveryZip,
        },
      };
    },
  }),
};
