import React from 'react'
import IconButton from 'material-ui/IconButton'

export default ({ book, ...props }) => <div className="text-center p-2">
<IconButton {...props}>
  <img src={book.coverUrl} className="p-1 img-fluid block" />
</IconButton>
<p className="m-0">{book.title} - {book.author}</p>
</div>
