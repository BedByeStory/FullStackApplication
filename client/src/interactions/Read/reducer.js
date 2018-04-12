export const SELECT_BOOK = 'SELECT_BOOK'
export const SET_BOOK_PAGE = 'SET_BOOK_PAGE'

function readState (book, page=1) {
  return {
    book,
    page
  }
}

export default function (state=readState(), { type, payload }) {
  switch (type) {
    case SELECT_BOOK: return readState(payload)
    case SET_BOOK_PAGE: return readState(state.book, payload)
    default: return state
  }
}
