import { SUCCESS_PROFILE } from '../reducers/profile'
import { PING_PEER } from '../reducers/peer'

const act = (type, payload) => ({ type, payload })

export default ({
  pub,
  sub,
  subs=[],
  actions: {
    pingReceived=(v => v => v),
    callReceived=(v => v => v)
  }
}) => ({ dispatch, getState }) => {

  const unsub = () => subs.forEach(u => u())
  const subProfile = profile => [
    sub(profile._id + ':ping', ([peer_id]) => pingReceived(peer_id)(dispatch, getState)),
    sub(profile._id + ':call', ([peer_id]) => callReceived(peer_id)(dispatch, getState)),
  ]

  return next => action => {

    if (action.type === SUCCESS_PROFILE) {
      unsub()
      subs = subProfile(action.payload)
    }

    if (action.type === PING_PEER) {
      const user_id = getState().profile.profile._id
      pub(action.payload + ':ping', user_id)
    }

    return next(action)
  }

}
