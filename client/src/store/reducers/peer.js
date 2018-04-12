export const SET_PEER = 'SET_PEER'
export const PING_PEER = 'PING_PEER'
export const CHAT_PEER = 'CHAT_PEER'
export const CALL_PEER = 'CALL_PEER'
export const CALL_ACCEPT = 'CALL_ACCEPT'
export const CALL_CANCEL = 'CALL_CANCEL'
export const CALL_ERROR = 'CALL_ERROR'
export const CALL_CLOSE = 'CALL_CLOSE'

function peerState (dialing=false, peer, error='') {
  return {
    dialing,
    peer,
    error
  }
}

export default function (state=peerState(), { type, payload }) {
  switch (type) {
    case CALL_PEER: return peerState(true)
    case CALL_CANCEL: return peerState(false)
    case CALL_CLOSE: return peerState(false)
    case CALL_ERROR: return peerState(false, state.peer, payload)
    case SET_PEER: return peerState(false, payload)
    default: return state
  }
}
