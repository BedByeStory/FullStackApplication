import { findPeople, findPeer } from '../../peers'
import { createFriendRequest } from '../../friends'

const LOAD_PEOPLE = 'LOAD_PEOPLE'
const SUCCESS_PEOPLE = 'SUCCESS_PEOPLE'
const ERROR_PEOPLE = 'ERROR_PEOPLE'

function peopleState (loading=false, people=[], error) {
  return { loading, people, error }
}

export function createFriend (user_id) {
  return function (dispatch, getState) {
    const { people } = getState().people
    const setLoading = () => people.map(p => {
      if (p._id === user_id) return Object.assign({}, p,  { loading: true })
      return p
    })
    const setSuccess = (updated) => people.map(p => {
      if (p._id === user_id) return Object.assign({}, p, updated)
      return p
    })
    const setError = (error) => people.map(p => {
      if (p._id === user_id) return Object.assign({}, p,  { loading: false, error })
      return p
    })
    dispatch({ type: SUCCESS_PEOPLE, payload: setLoading() })

    return createFriendRequest(user_id)
    .then(() => findPeer(user_id))
    .then(payload => dispatch({ type: SUCCESS_PEOPLE, payload: setSuccess(payload) }))
    .catch(payload => dispatch({ type: SUCCESS_PEOPLE, payload: setError(payload) }))
  }
}

export function searchPeople ({ search='' }) {
  return function (dispatch) {
    const term = search.trim()
    if (!term) return

    dispatch({ type: LOAD_PEOPLE })

    return findPeople({ term })
    .then(payload => dispatch({ type: SUCCESS_PEOPLE, payload }))
    .catch(payload => dispatch({ type: ERROR_PEOPLE, payload }))
  }
}

export default function (state=peopleState(), { type, payload }) {
  switch (type) {
    case LOAD_PEOPLE: return peopleState(true)
    case SUCCESS_PEOPLE: return peopleState(false, payload)
    case ERROR_PEOPLE: return peopleState(false, state.people, payload)
    default: return state
  }
}
