import React, { Component } from 'react'
import connector from './connector'
import Cover from './Cover'
import Book from './Book'
import books from './books'

export class Read extends Component {

  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount () {
    // LOAD BOOKS
    this.setState({ books })
    // setTimeout(() => {
    // }, 1000)
  }

  render () {
    const { books } = this.state
    const { book, page, selectBook, setPage } = this.props
    return <div>
      <div className="rowlist">{
        books.map((book, i) =>
        <Cover
        key={i}
        book={book}
        style={{height: 200, width: 146}}
        onClick={() => selectBook(book)}/>)
      }</div>

      <div>
        <Book
        book={book}
        page={page}
        onNextPage={() => setPage(page + 1)}
        onPrevPage={() => setPage(page - 1)} />
      </div>
    </div>
  }
}

export default connector(Read)
