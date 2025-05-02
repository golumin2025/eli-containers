export const prerender = false
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const firstName = data.get(`firstName`)
  const lastName = data.get(`lastName`)
  const full_name = `${firstName} ${lastName}`
  const email = data.get('email')
  const phone = data.get('phone')
  const current_zip = data.get('initialDeliveryZip')
  let new_zip = data.get('finalDeliveryZip')
  let start_date = data.get('deliveryDate')
  let service_type = data.get('serviceType')
  let storage_location = data.get('storeItType')
  const promo = data.get('promo')

  if (!full_name || !email || !phone || !current_zip || !start_date || !storage_location) {
    if (!full_name) {
      return new Response(JSON.stringify({ message: 'Please prodive your full name' }), {
        status: 400,
      })
    } else if (!email) {
      return new Response(JSON.stringify({ message: 'Please prodive your email' }), {
        status: 400,
      })
    } else if (!phone) {
      return new Response(JSON.stringify({ message: 'Please prodive your phone number' }), {
        status: 400,
      })
    } else if (!current_zip) {
      return new Response(JSON.stringify({ message: 'Please prodive your current zipcode' }), {
        status: 400,
      })
    } else if (!new_zip) {
      return new Response(
        JSON.stringify({
          message:
            'Please prodive a new zipcode if you are moving. Otherwise use your current zipcode here',
        }),
        {
          status: 400,
        }
      )
    } else if (!start_date) {
      return new Response(
        JSON.stringify({
          message: 'Please prodive your a valid start date (must be in the future)',
        }),
        {
          status: 400,
        }
      )
    } else if (!service_type) {
      return new Response(JSON.stringify({ message: 'Please select a service type' }), {
        status: 400,
      })
    }
  }

  if (service_type === 'Moving') {
    if (!new_zip) {
      return new Response(
        JSON.stringify({
          message:
            'Please prodive a new zipcode if you are moving. Otherwise use your current zipcode here',
        }),
        {
          status: 400,
        }
      )
    }

    if (!service_type) {
      storage_location = 'MI-BOX Location'
    }
  }

  if (service_type === 'Storage') {
    if (!new_zip) {
      new_zip = current_zip
    }
  }

  try {
    const zohoRequest = await fetch(
      'https://www.zohoapis.com/crm/v2/functions/contact_form/actions/execute?auth_type=apikey&zapikey=1003.9fcdd71d133ac0feb8915e5c2331b4a0.0fca3775643dc9dd8eaf4816e8d82b21',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: service_type,
          current_zipcode: current_zip,
          new_zipcode: new_zip,
          start_date: new Date(start_date).toISOString().slice(0, 10),
          storage_location: storage_location,
          email: email,
          phone: phone,
          rental: 209,
          promocode: promo,
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
        full_name,
        email,
        phone,
        current_zip,
        new_zip,
        start_date,
        service_type,
        storage_location,
        promo,
      },
    }),
    {
      status: 200,
    }
  )
}
