
function Book(
  title,
  author,
  pageCount,
  read = 'unread'
) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read
}

Book.prototype.toggleRead = function () {
  this.read = this.read === 'read' ? 'unread' : 'read'
}

const addBookButton = document.querySelector('#add_book_button');
addBookButton.addEventListener('click', showBookForm);

function showBookForm() {
  const form = document.querySelector('.form');
  form.classList.toggle('hidden');
}

const addBookForm = document.querySelector('#add_book_form');
addBookForm.addEventListener('submit', addBookToLibrary)

let library = [];
function addBookToLibrary(e) {
  e.preventDefault();

  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const pageCount = document.querySelector('#page_count').value
  const isRead = document.querySelector('#is_read').checked ? 'read' : 'unread'

  const book = new Book(
    title,
    author,
    pageCount,
    isRead
  )
  // start with a fresh array instead of tacking onto long list of undefined
  // this way, array always represents actual state of library
  if (library.every((book) => book === undefined)) { library = [];}
  library.push(book)
  displayBook(book, library.length - 1)
}

const list = document.querySelector('#library');
function displayBook(book, index) {
  const listItem = document.createElement('li');

  [
    book.title,
    book.author,
    book.pageCount,
    book.read
  ].forEach((attr) => {
    const element = document.createElement('p');
    if (attr === book.read) { element.setAttribute('id', `read-${index}`) }
    element.textContent = attr
    listItem.appendChild(element);
  });

  listItem.dataset.bookId = index

  const removeButton = document.createElement('button');
  removeButton.setAttribute('class', 'remove_button');
  removeButton.textContent = 'remove book'
  removeButton.addEventListener('click', removeBook);
  listItem.appendChild(removeButton);

  const toggleReadButton = document.createElement('button');
  toggleReadButton.setAttribute('class', 'toggle_read_button');
  toggleReadButton.setAttribute('id', `mark-${listItem.dataset.bookId}`);
  toggleReadButton.textContent = 'toggle read'
  toggleReadButton.addEventListener('click', toggleRead);
  listItem.appendChild(toggleReadButton);

  list.appendChild(listItem);
}

function removeBook(e) {
  const target = e.target
  const listItem = target.parentElement;
  const bookId = target.dataset.bookId;
  delete library[bookId]
  listItem.remove();
}

function toggleRead(e) {
  const bookId = e.target.id.split('-')[1];
  const readStatusElement = document.querySelector(`#read-${bookId}`);
  const book = library[bookId];
  book.toggleRead();
  const currentStatus = readStatusElement.textContent;
  readStatusElement.textContent = currentStatus === 'read' ? 'unread' : 'read'
}
