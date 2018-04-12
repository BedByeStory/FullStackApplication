export const GOT_CHAT = 'GOT_MESSAGE'

export function messageReceived (peer_id) {
  return function (dispatch, getState) {
    dispatch({ type: GOT_CHAT, payload: peer_id })
  }
}

function messageState (state={}, peer_id) {
  if (!peer_id) return state
  return Object.assign({}, { [peer_id]: new Date().getTime() })
}

export default function (state=messageState(), { type, payload }) {
  switch (type) {
    case GOT_CHAT: return messageState(state, payload)
    default: return state
  }
}
