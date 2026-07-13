import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sendEmail } from "virtual:getoutsend";
import { verifyTurnstile } from "virtual:turnstile";
import { adminEmailTemplate } from "./email-templates/adminEmailTemplate";
import { clientEmailTemplate } from "./email-templates/clientEmailTemplate";

const ADMIN_EMAILS = ["box@boxrentalnow.com", "marketing@golumin.io"];

export const server = {
  quoteForm: defineAction({
    input: z.object({
      serviceType: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      initialDeliveryZip: z
        .string()
        .min(5, { message: "Please enter a valid zip code" }),
      finalDeliveryZip: z.string().optional(),
      deliveryDate: z.string().min(1, { message: "Please enter a date" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
      phone: z.string().min(1, { message: "Phone number is required" }),
      storeItType: z.string().optional(),
      cfTurnstileResponse: z
        .string()
        .min(1, { message: "Turnstile verification required" }),
      promoCode: z.string().optional(),
    }),
    handler: async (input) => {
      try {
        const turnstileCheck = await verifyTurnstile(input.cfTurnstileResponse);

        if (!turnstileCheck.success) {
          return {
            success: false,
            error: {
              message: "Turnstile verification failed. Please try again.",
            },
          };
        }
        const zohoRequest = await fetch(
          "https://www.zohoapis.com/crm/v2/functions/contact_form/actions/execute?auth_type=apikey&zapikey=1003.9fcdd71d133ac0feb8915e5c2331b4a0.0fca3775643dc9dd8eaf4816e8d82b21",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: input.serviceType,
              current_zipcode: input.initialDeliveryZip,
              new_zipcode: input.finalDeliveryZip,
              start_date: new Date(input.deliveryDate)
                .toISOString()
                .slice(0, 10),
              storage_location: input.storeItType,
              email: input.email,
              phone: input.phone,
              rental: 209,
              promocode: input.promoCode || "",
            }),
          },
        );
        const zohoResponse = await zohoRequest.json();

        await sendEmail({
          to: input.email,
          subject: "Free Quote from MIBOX ELI",
          html: clientEmailTemplate(input),
        });
        await sendEmail({
          to: ADMIN_EMAILS,
          subject: "New Quote Request",
          html: adminEmailTemplate(input),
        });

        const successUrl = `https://app.miboxmovingandstorage.com/?container_types=${input.serviceType}&email=${input.email}&new_zipcode=${input.finalDeliveryZip}&phone_number=${input.phone}&start_date=${input.deliveryDate}&zipcode=${input.initialDeliveryZip}&promocode=${input.promoCode}&type=${input.storeItType}`;

        return {
          success: true,
          message: "Success",
          successUrl: successUrl,
        };
      } catch (error) {
        console.error(error);
        return {
          success: false,
          message: "Error processing your request",
        };
      }
    },
  }),
  coldStoragequoteForm: defineAction({
    input: z.object({
      firstName: z.string().min(1, { message: "Please enter your first name" }),
      lastName: z.string().min(1, { message: "Please enter your last name" }),
      initialDeliveryZip: z.string().min(5, {
        message: "Please enter a valid zip code",
      }),
      deliveryDate: z.string().min(1, { message: "Please enter a date" }),
      email: z
        .string()
        .email({ message: "Please enter a valid email address" }),
      phone: z.string().min(1, { message: "Phone number is required" }),
      cfTurnstileResponse: z
        .string()
        .min(1, { message: "Turnstile verification required" }),
    }),
    handler: async (input) => {
      try {
        const turnstileCheck = await verifyTurnstile(input.cfTurnstileResponse);

        if (!turnstileCheck.success) {
          return {
            success: false,
            error: {
              message: "Turnstile verification failed. Please try again.",
            },
          };
        }
        await sendEmail({
          to: input.email,
          subject: "Thank You for Your Cold Storage Quote Request",
          html: clientEmailTemplate(input),
          replyTo: input.email,
        });

        await sendEmail({
          to: ["marketing@golumin.io", "box@boxrentalnow.com"],
          subject: "New Cold Storage Quote Request",
          html: adminEmailTemplate(input),
          replyTo: input.email,
        });

        return {
          success: true,
          successUrl: "/thank-you-coolers",
        };
      } catch (error) {
        console.error("Error sending email:", error);
        return {
          success: false,
          error: {
            message: "An error occurred while sending the email.",
          },
        };
      }
    },
  }),
};
