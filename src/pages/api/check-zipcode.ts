export const prerender = false
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ url }) => {
  const zipcode = url.searchParams.get('zipcode')

  if (!zipcode) {
    return Response.json({ success: false, message: 'Zipcode is required' }, { status: 400 })
  }

  const baseUrl = import.meta.env.M_API_BASE_URL
  if (!baseUrl) {
    return Response.json(
      { success: false, message: 'API is unavailable' },
      { status: 500 },
    )
  }

  try {
    const upstream = await fetch(
      `${baseUrl}/api/pricings?zipcode=${encodeURIComponent(zipcode)}`,
    )
    const data = await upstream.json().catch(() => ({}))
    return Response.json(
      { success: upstream.ok && data.success === true },
      { status: upstream.ok ? 200 : upstream.status },
    )
  } catch {
    return Response.json({ success: false, message: 'Upstream unavailable' }, { status: 502 })
  }
}
