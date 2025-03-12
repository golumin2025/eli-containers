import type { APIRoute } from 'astro'
import fs from 'fs/promises'
import path from 'path'

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const filePath = path.join(process.cwd(), 'data', 'zip_codes.ts')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const zipCodes = JSON.parse(fileContent)

    return new Response(JSON.stringify(zipCodes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to load zip codes'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

