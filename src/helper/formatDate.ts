/**
 * 
 * @param dateString date object string
 * @returns a new date string
 */
export const formatDate = (dateString: string): string => {
  // The format of the date is determined by the options here
  const options: Intl.DateTimeFormatOptions | undefined = { year: "numeric", month: "long", day: "numeric" }

  // Create a new date object that constructs the date string
  return new Date(dateString).toLocaleDateString(undefined, options)
}