import { SUCCESS_PROFILE } from '../reducers/profile'
import { CALL_PEER, CALL_ACCEPT, CALL_CANCEL, CALL_ERROR, CALL_CLOSE, SET_PEER } from '../reducers/peer'
import { startCall, answerCall, verifyCall, closeCall } from 'redux-rtc'
import { findPeer } from '../../peers'
import options from '../../peers/stun'
import getUserMedia from '../../utils/media'

const act = (type, payload) => ({ type, payload })

export default ({
  pub,
  sub,
  subs=[],
  actions: {
    callInProgress=(v => v => v),
    callAlreadyInProgress=(v => v => v),
    callCanceled=(v => v => v)
  }
}) => ({ dispatch, getState }) => {

  const unsub = () => subs.forEach(u => u())
  const subProfile = profile => []

  return next => action => {

    const {
      peer: { dialing, peer },
      profile: { profile }
    } = getState()

    const { _id: user_id } = profile || {}

    if (action.type === CALL_PEER) {
      const peer_id = action.payload
      if (dialing || peer) {
        return callAlreadyInProgress(peer_id)(dispatch, getState)
      } else {
        const progress = callInProgress(peer_id)(dispatch, getState)
        pub(peer_id + ':call', user_id)
        subs.push(sub(peer_id + ':callaccept', ([info]) =>{
          progress.close()
          getUserMedia().then(stream => {
            const peer = dispatch(answerCall({ stream, options, info }))
            dispatch(act('JOIN_CONNECTION', stream))
            peer.on('signal', (info) => {
              pub(peer_id + ':callanswer', JSON.stringify(info))

              findPeer(peer_id)
              .then(peer => act(SET_PEER, peer))
              .then(dispatch)
            })
          })
        }))

        subs.push(sub(peer_id + ':callcancel', () => {
          progress.close()
          callCanceled(peer_id)(dispatch, getState)
          dispatch(act(CALL_CLOSE))
        }))

        subs.push(sub(user_id + ':callclose', () => {
          dispatch(act(CALL_CLOSE))
        }))

        progress.onTimeout(() => {
          dispatch(act(CALL_CLOSE))
        })
      }
    }

    if (action.type === CALL_ACCEPT) {
      const peer_id = action.payload
      if (dialing || peer) {
        return callAlreadyInProgress(peer_id)(dispatch, getState)
      } else {
        getUserMedia().then(stream => {
          const peer = dispatch(startCall({ stream, options }))
          dispatch(act('JOIN_CONNECTION', stream))
          peer.on('signal', (info) => {
            pub(user_id + ':callaccept', JSON.stringify(info))
          })
          subs.push(sub(user_id + ':callanswer', ([info]) => {
            dispatch(verifyCall(info))

            findPeer(peer_id)
            .then(peer => act(SET_PEER, peer))
            .then(dispatch)
          }))
          subs.push(sub(user_id + ':callclose', () => {
            dispatch(act(CALL_CLOSE))
          }))
        })
      }
    }

    if (action.type === CALL_CANCEL) {
      pub(user_id + ':callcancel')
      unsub()
    }

    if (action.type === CALL_CLOSE) {
      const peer_id = action.payload
      peer_id && pub(peer_id + ':callclose')
      dispatch(closeCall())
      unsub()
    }

    return next(action)
  }
}
