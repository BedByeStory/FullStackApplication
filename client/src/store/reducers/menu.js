export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'

export default function (state={}, { type }) {
  switch (type) {
    case OPEN_MENU: return { ...state, open: true }
    case CLOSE_MENU: return { ...state, open: false }
    default: return state
  }
}
