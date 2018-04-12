import auth from '../utils/auth'
import handleError from '../utils/error'

export function findActiveFriends () {
  return fetch(process.env.REACT_APP_API + '/friends/active', {
    headers: auth()
  })
  .then(res => res.json())
  .then(handleError)
  .then(({ results }) => (results || []))
}

export function findPendingFriendRequests () {
  return fetch(process.env.REACT_APP_API + '/friends/requestee', {
    headers: auth()
  })
  .then(res => res.json())
  .then(handleError)
  .then(({ results }) => (results || []))
}

export function createFriendRequest (user_id) {
  return fetch(process.env.REACT_APP_API + `/friends/request/${user_id}`, {
    method: 'POST',
    headers: auth()
  })
  .then(res => res.json())
  .then(handleError)
  .then(({ results }) => (results || []))
}

export function acceptFriendRequest (_id) {
  return fetch(process.env.REACT_APP_API + `/friends/request/${_id}/accept`, {
    method: 'PUT',
    headers: auth()
  })
  .then(res => res.json())
  .then(handleError)
  .then(({ results }) => (results || []))
}

export function declineFriendRequest (_id) {
  return fetch(process.env.REACT_APP_API + `/friends/request/${_id}/decline`, {
    method: 'PUT',
    headers: auth()
  })
  .then(res => res.json())
  .then(handleError)
  .then(({ results }) => (results || []))
}
