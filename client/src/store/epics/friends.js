import { findPeer } from '../../peers'
import { UPDATE_FRIEND, SUCCESS_FRIENDS } from '../reducers/friends'

const act = (type, payload) => ({ type, payload })

export default ({
  pub,
  sub,
  subs={}
}) => ({ dispatch, getState }) => {

  function subFriend ({ _id: peer_id }) {
    if (!subs[peer_id]) {
      subs[peer_id] = sub(peer_id + ':update', () => {
        findPeer(peer_id).then(peer => {
          dispatch(act(UPDATE_FRIEND, peer))
        })
      })
    }
  }

  return next => action => {

    if (action.type === SUCCESS_FRIENDS) {
      action.payload.forEach(subFriend)
    }

    return next(action)
  }

}
