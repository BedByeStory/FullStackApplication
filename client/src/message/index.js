import { getToken } from '../utils/token'

export function loadMessages (peer_id) {
  const token = getToken()
  if (!token) return Promise.reject({ message: 'Not Logged In' })

  return fetch(process.env.REACT_APP_API + '/messages/' + peer_id, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(res => res.json())
  .then(({ error, results }) => {
    if (error) throw new Error(error)
    return results
  })
}

export function sendMessage (peer_id, content) {
  const token = getToken()
  if (!token) return Promise.reject({ message: 'Not Logged In' })

  return fetch(process.env.REACT_APP_API + '/messages/' + peer_id, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(({ error, result }) => {
    if (error) throw new Error(error)
    return result
  })
}
