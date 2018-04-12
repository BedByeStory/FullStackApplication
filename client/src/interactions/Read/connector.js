import { connect } from 'react-redux'
import { SELECT_BOOK, SET_BOOK_PAGE } from './reducer'

export default connect(
  ({ read }) => ({ ...read }),
  (dispatch) => ({
    selectBook (book) {
      dispatch({ type: SELECT_BOOK, payload: book, connected: true })
    },
    setPage (page) {
      dispatch({ type: SET_BOOK_PAGE, payload: page, connected: true })
    }
  })
)
