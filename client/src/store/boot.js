import { LOAD_PROFILE } from './reducers/profile'
import { SET_DEVICE } from './reducers/device'
import { findFriends } from './reducers/friends'
import { findRequests } from './reducers/requests'
import { findAlerts } from './reducers/alerts'

export default function (store) {
  return Promise.all([
    store.dispatch({ type: LOAD_PROFILE }),
    store.dispatch({ type: SET_DEVICE, payload: window.navigator.userAgent }),
    store.dispatch(findFriends()),
    store.dispatch(findRequests()),
    store.dispatch(findAlerts()),
  ])
}
