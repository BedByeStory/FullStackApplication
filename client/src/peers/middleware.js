import { findPeer } from './'
import { callReceived, callCanceled, callInProgress } from './peerConnect'
import { SET_PEER } from '../store/reducers/peer'
import { startCall, answerCall, verifyCall } from 'redux-rtc'
import getUserMedia from '../utils/media'
import stunConfig from './stun'

const PUBLISH = 'publish'
const ACTIVE = 'active'
const SUBSCRIBE = 'subscribe'
const UNSUB = 'unsubscribe'
const act = (type, payload) => ({ type, payload })

export default ({
  socket
}) => ({ dispatch, getState }) => {

  const pub = (topic, val) => socket.emit(PUBLISH, [topic, val])
  const sub = (topic, fn) => {
    socket.emit(SUBSCRIBE, [topic])
    socket.on(topic, fn)
    return () => socket.emit(UNSUB, [topic])
  }

  return next => action => {

    if (action.type === CALL_PEER) {
      const user_id = getState().profile.profile._id
      const peer_id = action.payload
      const closeToast = callInProgress(peer_id)(dispatch, getState)
      pub(peer_id + ':call', user_id)
      sub(peer_id + ':callaccept', (peer) =>{
        closeToast()
        sendCallAnswer({ pub, sub, dispatch, user_id, peer_id })(peer)
      })
      sub(peer_id + ':callcancel', () => {
        closeToast()
        callCanceled(peer_id)(dispatch, getState)
      })
    }

    if (action.type === CALL_ACCEPT) {
      const user_id = getState().profile.profile._id
      const peer_id = action.payload
      sendCallAccept({ pub, sub, dispatch, user_id, peer_id })()
    }

    if (action.type === CALL_CANCEL) {
      const user_id = getState().profile.profile._id
      pub(user_id + ':callcancel')
    }

    return next(action)
  }
}

function sendCallAccept ({ pub, sub, dispatch, peer_id, user_id }) {
  return () => {
    getUserMedia().then((stream) => {
      const peerConfig = {
        stream,
        options: stunConfig
      }
      const peer = dispatch(startCall(peerConfig))
      dispatch({ type: 'JOIN_CONNECTION', payload: stream })
      peer.on('signal', (info) => {
        pub(user_id + ':callaccept', JSON.stringify(info))
      })
      sub(user_id + ':callanswer', ([info]) => {
        dispatch(verifyCall(info))
        setPeer(peer_id).then(dispatch)
      })
    })
  }
}

function sendCallAnswer ({ pub, sub, dispatch, peer_id, user_id }) {
  return ([info]) => {
    getUserMedia().then(stream => {
      const peerConfig = {
        info,
        stream,
        options: stunConfig
      }
      const peer = dispatch(answerCall(peerConfig))
      dispatch(act('JOIN_CONNECTION', stream))
      peer.on('signal', (info) => {
        pub(peer_id + ':callanswer', JSON.stringify(info))
        setPeer(peer_id).then(dispatch)
      })
    })
  }
}

function setPeer (peerId) {
  return findPeer(peerId)
  .then(peer => act(SET_PEER, peer))
}
