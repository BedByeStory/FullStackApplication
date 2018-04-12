import { getToken, setToken } from '../utils/token'
import qs from '../utils/qs'

export function login ({ email, password }) {
  return fetch(process.env.REACT_APP_API + '/users/login?' + qs({ email, password }))
  .then(res => res.json())
  .then(res => {
    if (res && res.error) throw new Error(res.error)
    if (res && res.token) setToken(res.token)
    return res
  })
}

export function signup (profileData) {
  return fetch(process.env.REACT_APP_API + '/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileData)
  })
  .then(res => res.json())
  .then(res => {
    if (res && res.error) throw new Error(res.error)
    if (res && res.token) setToken(res.token)
    return res
  })
}

export function logout () {
  return Promise.resolve()
  .then(() => setToken(''))
}

export function getProfile () {
  const token = getToken()
  if (!token) return Promise.reject({ message: '' })

  return fetch(process.env.REACT_APP_API + '/users/me', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(res => {
    if (res.error) throw new Error(res.error)
    return res.result
  })
}

export function updateProfile (profileData) {
  const token = getToken()
  if (!token) return Promise.reject({ message: '' })

  return fetch(process.env.REACT_APP_API + '/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(profileData)
  })
  .then(res => {
    if (res.error) throw new Error(res.error)
    return res.result
  })
}
