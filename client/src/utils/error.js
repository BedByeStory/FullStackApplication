export default function (result) {
  if (result.error) throw new Error(result.error)
  return result
}
