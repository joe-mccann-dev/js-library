
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

function displayBooks() {
  const list = document.querySelector('#library');
  myLibrary.forEach((book) => {
    const listItem = document.createElement('li');
    [book.title, book.author, book.pageCount, book.read].forEach((attr) => {
      const attribute = document.createElement('p');
      attribute.textContent = attr
      listItem.appendChild(attribute);
    });
    list.appendChild(listItem);
  });
}

const addBookButton = document.querySelector('#add_book_button');
addBookButton.addEventListener('click', showBookForm);

function showBookForm() {
  const form = document.querySelector('.form');
  form.classList.toggle('hidden');
}

displayBooks();