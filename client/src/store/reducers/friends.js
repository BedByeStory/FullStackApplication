import { findActiveFriends } from '../../friends'

export const LOAD_FRIENDS = 'LOAD_FRIENDS'
export const UPDATE_FRIEND = 'UPDATE_FRIEND'
export const SUCCESS_FRIENDS = 'SUCCESS_FRIENDS'
export const ERROR_FRIENDS = 'ERROR_FRIENDS'

function friendsState (loading=false, friends=[], error) {
  return { loading, friends, error }
}

export function findFriends () {
  return function (dispatch) {
    dispatch({ type: LOAD_FRIENDS })

    return findActiveFriends()
    .then(payload => dispatch({ type: SUCCESS_FRIENDS, payload }))
    .catch(payload => dispatch({ type: ERROR_FRIENDS, payload }))
  }
}

export default function (state=friendsState(), { type, payload }) {
  switch (type) {
    case LOAD_FRIENDS: return friendsState(true)
    case SUCCESS_FRIENDS: return friendsState(false, payload)
    case ERROR_FRIENDS: return friendsState(false, state.friends, payload)
    case UPDATE_FRIEND: return friendsState(false, state.friends.map(friend =>
      friend._id === payload._id ? payload : friend))
    default: return state
  }
}
