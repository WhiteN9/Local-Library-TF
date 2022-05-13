function _findByID(array, id) {
  return array.find((element) => element.id === id);
}

function findAuthorById(authors, id) {
  return (authorLookup = _findByID(authors, id));
}

function findBookById(books, id) {
  return (bookLookup = _findByID(books, id));
}

function partitionBooksByBorrowedStatus(books) {
  const bookNotReturned = books.reduce((bookNotReturned, book) => {
    if (!book.borrows[0].returned) {
      bookNotReturned.push(book);
    }
    return bookNotReturned;
  }, []);
  const bookReturned = books.reduce((bookReturned, book) => {
    if (book.borrows[0].returned) {
      bookReturned.push(book);
    }
    return bookReturned;
  }, []);
  const statusPartitioned = [bookNotReturned, bookReturned];
  return statusPartitioned;
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const bookAccount = [];
  for (let i = 0; i < borrows.length && i < 10; i++) {
    accounts.forEach((element) => {
      if (element.id === borrows[i].id) {
        bookAccount.push(element);
      }
    });
  }
  for (let i = 0; i < bookAccount.length; i++) {
    bookAccount[i].returned = borrows[i].returned;
  }
  return bookAccount;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
