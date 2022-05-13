function _countLength(array) {
  return array.length;
}

function getTotalBooksCount(books) {
  return _countLength(books);
}

function getTotalAccountsCount(accounts) {
  return _countLength(accounts);
}

function _descendingSortTopFive(array) {
  return array
    .sort((valueA, valueB) => (valueA.count < valueB.count ? 1 : -1))
    .slice(0, 5);
}

function getBooksBorrowedCount(books) {
  let booksNotReturned = 0;
  for (let i = 0; i < books.length; i++) {
    const { borrows } = books[i];
    borrows.forEach((element) => {
      if (element.returned === false) {
        booksNotReturned += 1;
      }
    });
  }
  return booksNotReturned;
}

function getMostCommonGenres(books) {
  const objGenreList = books.reduce((previousValue, currentValue) => {
    if (previousValue[currentValue.genre]) {
      previousValue[currentValue.genre] += 1;
    } else {
      previousValue[currentValue.genre] = 1;
    }
    return previousValue;
  }, {});
  let arrGenreList = Object.keys(objGenreList).map((genre) => {
    return { name: genre, count: objGenreList[genre] };
  });
  arrGenreList = _descendingSortTopFive(arrGenreList);
  return arrGenreList;
}

function getMostPopularBooks(books) {
  const bookList = books.reduce((bookList, book) => {
    bookList.push({ name: book.title, count: book.borrows.length });
    return bookList;
  }, []);
  let bookListSorted = _descendingSortTopFive(bookList);
  return bookListSorted;
}

function getMostPopularAuthors(books, authors) {
  const objectOfAuthors = books.reduce((acc, book) => {
    if (acc[book.authorId]) {
      acc[book.authorId] += book.borrows.length;
    } else {
      acc[book.authorId] = book.borrows.length;
    }
    return acc;
  }, {});
  let arrayOfAuthors = Object.keys(objectOfAuthors).map((id) => {
    const author = authors.find((author) => {
      return author.id == id;
    });
    return {
      name: `${author.name.first} ${author.name.last}`,
      count: objectOfAuthors[id],
    };
  });
  arrayOfAuthors = _descendingSortTopFive(arrayOfAuthors);
  return arrayOfAuthors;
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
