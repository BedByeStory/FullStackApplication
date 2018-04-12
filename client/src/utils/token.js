const access_token = 'access_token'

export function getToken () {
  try {
    return localStorage.getItem(access_token)
  } catch (err) {
    console.warn(err)
    return null
  }
}

export function setToken (value) {
  try {
    localStorage.setItem(access_token, value)
  } catch (err) {
    console.warn(err)
  }
}
