import { defineAction } from 'astro:actions'
import { getEntry } from 'astro:content'
import { z } from 'astro:schema'
import * as postmark from 'postmark'
import mjml2html from 'mjml'
import { clientEmailTemplate } from './email-templates/clientEmailTemplate'
import { adminEmailTemplate } from './email-templates/adminEmailTemplate'
export const server = {
  quoteForm: defineAction({
    input: z.object({
      serviceType: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      initialDeliveryZip: z.string().min(5, { message: 'Please enter a valid zip code' }),
      finalDeliveryZip: z.string().optional(),
      deliveryDate: z.string().min(1, { message: 'Please enter a date' }),
      email: z.string().email({ message: 'Please enter a valid email address' }),
      phone: z.string().min(1, { message: 'Phone number is required' }),
      storeItType: z.string().optional(),
      cfTurnstileResponse: z.string().min(1, { message: 'Turnstile verification required' }),
      promoCode: z.string().optional(),
    }),
    handler: async (input) => {
      try {
        const zohoRequest = await fetch(
          'https://www.zohoapis.com/crm/v2/functions/contact_form/actions/execute?auth_type=apikey&zapikey=1003.9fcdd71d133ac0feb8915e5c2331b4a0.0fca3775643dc9dd8eaf4816e8d82b21',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: input.serviceType,
              current_zipcode: input.initialDeliveryZip,
              new_zipcode: input.finalDeliveryZip,
              start_date: new Date(input.deliveryDate).toISOString().slice(0, 10),
              storage_location: input.storeItType,
              email: input.email,
              phone: input.phone,
              rental: 209,
              promocode: input.promoCode || '',
            }),
          }
        )
        const zohoResponse = await zohoRequest.json()

        const successUrl = `https://app.miboxmovingandstorage.com/?container_types=${input.serviceType}&email=${input.email}&new_zipcode=${input.finalDeliveryZip}&phone_number=${input.phone}&start_date=${input.deliveryDate}&zipcode=${input.initialDeliveryZip}&promocode=${input.promoCode}&type=${input.storeItType}`

        // Return a plain object instead of a Response
        return {
          success: true,
          message: 'Success',
          successUrl: successUrl,
        }
      } catch (error) {
        console.error(error)
        return {
          success: false,
          message: 'Error processing your request',
        }
      }
    },
  }),
  coldStoragequoteForm: defineAction({
    input: z.object({
      firstName: z.string().min(1, { message: 'Please enter your first name' }),
      lastName: z.string().min(1, { message: 'Please enter your last name' }),
      initialDeliveryZip: z.string().min(5, {
        message: 'Please enter a valid zip code',
      }),
      deliveryDate: z.string().min(1, { message: 'Please enter a date' }),
      email: z.string().email({ message: 'Please enter a valid email address' }),
      phone: z.string().min(1, { message: 'Phone number is required' }),
      cfTurnstileResponse: z.string().min(1, { message: 'Turnstile verification required' }),
    }),
    handler: async (input) => {
      // Fetch email settings and general settings
      const emailSettings = await getEntry('singletons', 'email')
      const general = await getEntry('singletons', 'general')

      // Validate Turnstile response
      const formData = new FormData()
      formData.append('secret', import.meta.env.TURNSTILE_SECRET_TOKEN)
      formData.append('response', input.cfTurnstileResponse)

      const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      })

      const turnstileCheck = await result.json()

      if (!turnstileCheck.success) {
        return {
          success: false,
          error: {
            message: 'Turnstile verification failed. Please try again.',
          },
        }
      }

      // Prepare email templates
      const { html: clientEmailBody } = mjml2html(
        clientEmailTemplate.html(input, emailSettings.data, general.data)
      )
      const { html: adminEmailBody } = mjml2html(
        adminEmailTemplate.html(input, emailSettings.data, general.data)
      )

      // Send emails
      try {
        const client = new postmark.ServerClient(import.meta.env.POSTMARK_SERVER_TOKEN)

        // Send email to client
        await client.sendEmail({
          From: `${emailSettings.data.fromEmailName} <${emailSettings.data.fromEmail}>`,
          To: `${input.email}`,
          Cc: emailSettings.data.clientEmailRecipientsBcc
            .map((recipient: { email: string }) => recipient.email)
            .join(', '),
          Subject: 'Thank You for Your Cold Storage Quote Request',
          HtmlBody: clientEmailBody,
          MessageStream: 'outbound',
        })

        // Send email to admin
        await client.sendEmail({
          From: `${emailSettings.data.fromEmailName} <${emailSettings.data.fromEmail}>`,
          To: emailSettings.data.adminEmailRecipients
            .map((recipient: { email: string }) => recipient.email)
            .join(', '),
          Subject: 'New Cold Storage Quote Request',
          HtmlBody: adminEmailBody,
          MessageStream: 'outbound',
        })
      } catch (error) {
        console.error('Error sending email:', error)
        return {
          success: false,
          error: {
            message: 'An error occurred while sending the email.',
          },
        }
      }

      // Return success response
      return {
        success: true,
        successUrl: '/thank-you-coolers', // or whatever your success URL should be
      }
    },
  }),
}
