export function formatDate(date: FormDataEntryValue | null) {
  if (date == null) {
    return '' // or return a default date string
  }
  // Create a new Date object from the input date (can be a string or a Date object)
  const dateObj = new Date(date.toString())

  // Extract the month, day, and year components
  const month = dateObj.getMonth() + 1 // Months are 0-based
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  // Format the date as mm/dd/yyyy
  const formattedDate = `${month.toString().padStart(2, '0')}/${day
    .toString()
    .padStart(2, '0')}/${year}`
  return formattedDate as String
}