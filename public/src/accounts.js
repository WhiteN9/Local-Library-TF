function findAccountById(accounts, id) {
  const accountLookup = accounts.find((element) => element.id === id);
  return accountLookup;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last > accountB.name.last ? 1 : -1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  const totalBorrows = books.reduce(function (previousValue, currentValue) {
    const { borrows } = currentValue;
    const borrowCount = borrows.reduce(function (beforeValue, nowValue) {
      if (nowValue.id === account.id) {
        beforeValue++;
      }
      return beforeValue;
    }, 0);
    previousValue += borrowCount;
    return previousValue;
  }, 0);
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountBorrowedBook = books
    .filter(
      (book) => book.borrows[0].id === account.id && !book.borrows[0].returned
    )
    .map((element) => {
      element.author = authors.find((author) => author.id === element.authorId);
      return element;
    });
  return accountBorrowedBook;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
