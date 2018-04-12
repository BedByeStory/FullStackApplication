import { SUCCESS_PROFILE } from '../reducers/profile'
import { messageReceived } from '../reducers/messages'

export default ({
  pub,
  sub,
  subs=[]
}) => ({ dispatch, getState }) => {

  const unsub = () => subs.forEach(u => u())
  const subProfile = profile => [
    sub(profile._id + ':message', ([peer_id]) => messageReceived(peer_id)(dispatch, getState))
  ]

  return next => action => {

    if (action.type === SUCCESS_PROFILE) {
      unsub()
      subs = subProfile(action.payload)
    }

    return next(action)
  }

}
