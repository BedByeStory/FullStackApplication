import { findPendingFriendRequests, acceptFriendRequest, declineFriendRequest } from '../../friends'
import { findFriends } from './friends'

const LOAD_REQUESTS = 'LOAD_REQUESTS'
const SUCCESS_REQUESTS = 'SUCCESS_REQUESTS'
const ERROR_REQUESTS = 'ERROR_REQUESTS'
const ACCEPT_REQUEST = 'ACCEPT_REQUEST'
const DECLINE_REQUEST = 'DECLINE_REQUEST'

function requestsState (loading=false, requests=[], error) {
  return { loading, requests, error }
}

export function findRequests () {
  return function (dispatch) {
    dispatch({ type: LOAD_REQUESTS })

    return findPendingFriendRequests()
    .then(payload => dispatch({ type: SUCCESS_REQUESTS, payload }))
    .catch(payload => dispatch({ type: ERROR_REQUESTS, payload }))
  }
}

export function acceptRequest (_id) {
  return function (dispatch, getState) {
    return acceptFriendRequest(_id)
    .then(() => Promise.all([
      findRequests()(dispatch, getState),
      findFriends()(dispatch, getState),
    ]))
    .catch(payload => dispatch({ type: ERROR_REQUESTS, payload }))
  }
}

export function declineRequest (_id) {
  return function (dispatch, getState) {
    return declineFriendRequest(_id)
    .then(() => Promise.all([
      findRequests()(dispatch, getState),
      findFriends()(dispatch, getState),
    ]))
    .catch(payload => dispatch({ type: ERROR_REQUESTS, payload }))
  }
}

export default function (state=requestsState(), { type, payload }) {
  switch (type) {
    case LOAD_REQUESTS: return requestsState(true)
    case SUCCESS_REQUESTS: return requestsState(false, payload)
    case ERROR_REQUESTS: return requestsState(false, state.requests, payload)
    default: return state
  }
}
