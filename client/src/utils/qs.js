export default function (obj) {
  return Object.keys(obj || {})
  .map(key => `${key}=${obj[key]}`)
  .join('&')
}
