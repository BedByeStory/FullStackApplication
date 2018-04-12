import auth from '../utils/auth'

export function findUnreadAlerts () {
  return fetch(process.env.REACT_APP_API + '/alerts/unread', {
    headers: auth()
  })
  .then(res => res.json())
  .then(({ results }) => (results || []))
}

export function readAlert (_id) {
  return fetch(process.env.REACT_APP_API + `/alerts/read/${_id}`, {
    method: 'PUT',
    headers: auth()
  })
  .then(res => res.json())
}
