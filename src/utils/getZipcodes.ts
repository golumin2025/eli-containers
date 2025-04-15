import fs from 'fs/promises'
import path from 'path'

export async function getZipCodes() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'zip_codes.ts')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const cleanedContent = fileContent
      .replace(/^\[/, '') // Remove opening bracket
      .replace(/\];?\s*$/, '') // Remove closing bracket and semicolon
      .split(',')
      .map(zip => zip.trim().replace(/"/g, ''))
      .filter(zip => zip.length > 0)

    return cleanedContent
  } catch (error) {
    console.error('Error loading zip codes:', error)
    return { error: 'Failed to load zip codes' }
  }
}

export function isValidZipCode(zipCode: string, validZipCodes: string[]): boolean {
  return validZipCodes.includes(zipCode)
}

export function isExcludedZipCode(zipCode: string, excludedZips: string[]): boolean {
  return excludedZips.includes(zipCode)
}