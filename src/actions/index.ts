export const prerender = false
import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'

export const server = {
  quoteForm: defineAction({
    input: z.object({
      serviceType: z.string(),
      firstName: z.string().min(1, { message: 'Please enter your first name' }),
      lastName: z.string().min(1, { message: 'Please enter your last name' }),
      initialDeliveryZip: z.string().min(5, { message: 'Please enter a valid zip code' }),
      finalDeliveryZip: z.string().optional(),
      deliveryDate: z.string().min(1, { message: 'Please enter a date' }),
      email: z.string().email({ message: 'Please enter a valid email address' }),
      phone: z.string().min(1, { message: 'Phone number is required' }),
      cfTurnstileResponse: z.string().min(1, { message: 'Turnstile verification required' }),
    }),
    handler: async (input) => {
      if (import.meta.env.DEV !== true) {
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
                storage_location: input.serviceType,
                email: input.email,
                phone: input.phone,
                rental: 209,
                promocode: 'promo',
              }),
            }
          )
          const zohoResponse = await zohoRequest.json()
        } catch (error) {
          console.error(error)
        }
        return new Response(
          JSON.stringify({
            message: 'Success',
            data: {
              full_name: `${input.firstName} ${input.lastName}`,
              email: input.email,
              phone: input.phone,
              current_zip: input.initialDeliveryZip,
              new_zip: input.finalDeliveryZip,
              start_date: new Date(input.deliveryDate).toISOString().slice(0, 10),
              service_type: input.serviceType,
              storage_location: input.serviceType,
              promo: 'promo',
            },
          }),
          {
            status: 200,
          }
        )
      }
    },
  }),
}
