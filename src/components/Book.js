import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

const bookCoverDimensionStyle = {
  width: 128,
  height: 193,
}

const Book = ({ book, onChangeBookshelf }) => {
  let thumbnail
  const { imageLinks,title, authors,} = book
  const allAuthors = Array.isArray(authors) ? authors.join(', ') : 'Unknown Author :('
  
  thumbnail = imageLinks ? `url(${imageLinks.thumbnail})` : `url(${require('../icons/no-cover.png')})`
  bookCoverDimensionStyle.backgroundImage = thumbnail

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={bookCoverDimensionStyle}></div>
          <BookShelfChanger book={book} onChangeBookshelf={onChangeBookshelf} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{allAuthors}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  onChangeBookshelf: PropTypes.func
}

Book.defaultProps = {
  book: {
    authors: []
  }
}

export default Book