import { SUCCESS_PROFILE } from '../reducers/profile'
import { findAlerts } from '../reducers/alerts'
import { findFriends } from '../reducers/friends'
import { findRequests } from '../reducers/requests'

export default ({
  pub,
  sub,
  subs=[]
}) => ({ dispatch, getState }) => {

  const unsub = () => subs.forEach(u => u())
  const subProfile = profile => [
    sub(profile._id + ':alert', ([peer_id]) => {
      findFriends()(dispatch, getState)
      findRequests()(dispatch, getState)
      findAlerts()(dispatch, getState)
    })
  ]

  return next => action => {

    if (action.type === SUCCESS_PROFILE) {
      unsub()
      subs = subProfile(action.payload)
    }

    return next(action)
  }

}
