import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import IconButton from 'material-ui/IconButton';
import Next from 'material-ui-icons/ArrowForward';
import Prev from 'material-ui-icons/ArrowBack';

const style = obj => Object.assign({ }, obj)
const prevStyle = style({ left: 0 })
const nextStyle = style({ right: 0 })

export default class Book extends Component {
  state = {
    numPages: null,
    width: 0
  }

  setSize = (element) => {
    if (element) {
      const { width } = element.getBoundingClientRect()
      this.setState({ width })
    }
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  prevBtn () {
    const { page, onPrevPage } = this.props;
    return (page > 1)
      ? <IconButton onClick={onPrevPage}><Prev /></IconButton>
      : <span />
  }

  nextBtn () {
    const { page, onNextPage } = this.props;
    const { numPages } = this.state;
    return (page < numPages)
      ? <IconButton onClick={onNextPage}><Next /></IconButton>
      : <span />
  }

  render() {
    const { book, page } = this.props;
    const { numPages, width } = this.state;

    return (
      !book ? <div /> : <div className="text-center m-4" ref={this.setSize}>
        <Document
          file={book.contentUrl}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page width={width} pageNumber={page} />
        </Document>
        <p>
          { this.prevBtn() }
          <span>Page {page} of {numPages}</span>
          { this.nextBtn() }
        </p>
      </div>
    );
  }
}
