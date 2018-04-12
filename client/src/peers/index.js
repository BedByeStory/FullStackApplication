import qs from '../utils/qs'
import auth from '../utils/auth'
import handleError from '../utils/error'

export function findPeer (peerId) {
  return fetch(process.env.REACT_APP_API + '/users/' + peerId, {
    headers: auth()
  })
  .then(res => res.json())
  .then(handleError)
  .then(({ result }) => result)
}

export function findPeople ({ term }) {
  return fetch(process.env.REACT_APP_API + '/users/search?' + qs({ term }), {
    headers: auth()
  })
  .then(res => res.json())
  .then(handleError)
  .then(({ results }) => results)
}
