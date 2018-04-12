export const INC_COUNTER = 'INC_COUNTER'
export const DEC_COUNTER = 'DEC_COUNTER'

export default function (state=0, { type }) {
  switch (type) {
    case INC_COUNTER: return state + 1
    case DEC_COUNTER: return state - 1
    default: return state
  }
}
