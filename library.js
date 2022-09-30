
const myLibrary = [];

function Book(
  title,
  author,
  pageCount,
  read = false
) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  return book;
}

const book1 = new Book(
  'Lord of the Rings',
  'J.R.R. Tolkien',
  '500',
  true
)

const book2 = new Book(
  'Harry Potter',
  'J.K. Rowling',
  '400',
)

addBookToLibrary(book1);
addBookToLibrary(book2)

console.log(book1)
console.log(book2)


function displayBooks() {
  list = document.querySelector('#library')
  myLibrary.forEach((book) => {
    const bookList = document.createElement('li');
    list.appendChild(bookList)
    const subList = document.createElement('ul');
    bookList.appendChild(subList);
    [book.title, book.author, book.pageCount, book.read].forEach((attr) => {
      const detail = document.createElement('li');
      detail.appendChild(document.createTextNode(attr))
      subList.appendChild(detail);
    })
  });
}

displayBooks();