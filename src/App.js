import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import SearchBar from './components/SearchBar'
import BookShelf from './components/BookShelf';
import BooksShelves from './components/BooksShelves'
import './App.css'
import { shelfKeys, shelfTitles } from './shelves.js'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      books: [],
    }

    this.onChangeBookshelf = this.onChangeBookshelf.bind(this)
    this.renderBookList = this.renderBookList.bind(this)
  }

  onChangeBookshelf(book, shelf) {
    BooksAPI
      .update(book, shelf)
      .then(() => {
        this.setState(prevState => {
          const list = prevState.books.filter(b => (b.id !== book.id))
          book.shelf = shelf

          return { books: [...list, book] }
        })
      })
  }

  componentWillMount() {
    BooksAPI
      .getAll()
      .then((response) => {
        this.setState({ books: response })
      })
  }

  renderBookList() {
    const selectedBooks = shelfKeys.reduce((acc, shelfKey) => {
      acc[shelfKey] = this.state.books.filter(b => b.shelf === shelfKey)

      return acc
    }, {})

    return shelfKeys.map((shelfKey, index) => (
      <BookShelf
        key={shelfKey}
        title={shelfTitles[index]}
        books={selectedBooks[shelfKey]}
        onChangeBookshelf={this.onChangeBookshelf}
      />
    ))
  }

  onSearch(query) {
    return BooksAPI.search(query, 20)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksShelves>
            { this.renderBookList() }
          </BooksShelves>
          )}
        />
        <Route path='/search' render={() => (
          <SearchBar
            books={this.state.books}
            onSearch={this.onSearch}
            onChangeBookshelf={this.onChangeBookshelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp