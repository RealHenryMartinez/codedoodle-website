export const formatDate = (dateString: string) => {
  const options: any = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}