
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

Book.prototype.toggleRead = function () {
  this.read = this.read ? false : true
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

  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pageCount = document.querySelector('#page_count');
  const isRead = document.querySelector('#is_read');
  const book = new Book(
    title.value,
    author.value,
    pageCount.value,
    isRead.checked
  )

  if (library.some((b) => b.title.toLowerCase() === book.title.toLowerCase())) {
    alert("You've already added that book title to your Library.");
    return;
  }

  // start with a fresh array instead of tacking onto long list of undefined
  // this way, array always represents actual state of library
  if (library.every((book) => book === undefined)) { library = [];}
  library.push(book)
  displayBook(book, library.length - 1)
  clearForm([title, author, pageCount], isRead)
}

const list = document.querySelector('#library');
function displayBook(book, index) {
  const listItem = document.createElement('li');

  const title = document.createElement('h3');
  title.textContent = book.title;
  const author = document.createElement('p');
  author.textContent = book.author;
  const pageCount = document.createElement('p');
  pageCount.textContent = book.pageCount;
  const readStatus = document.createElement('p');
  readStatus.textContent = setReadStatus(book.read);
  readStatus.setAttribute('id', `readStatus-${index}`);
  [title, author, pageCount, readStatus].forEach((el) => listItem.appendChild(el));

  listItem.dataset.bookId = index

  const removeButton = document.createElement('button');
  removeButton.setAttribute('class', 'remove_button');
  removeButton.textContent = 'remove book'
  removeButton.addEventListener('click', removeBook);
  listItem.appendChild(removeButton);

  const toggleReadButton = document.createElement('button');
  toggleReadButton.setAttribute('class', 'toggle_read_button');
  toggleReadButton.setAttribute('id', `readButton-${listItem.dataset.bookId}`);
  toggleReadButton.textContent = 'toggle read'
  toggleReadButton.addEventListener('click', toggleRead);
  listItem.appendChild(toggleReadButton);

  list.appendChild(listItem);
  
}

function removeBook(e) {
  const target = e.target
  const listItem = target.parentElement;
  const bookId = listItem.dataset.bookId;
  delete library[bookId]
  listItem.remove();
}

function toggleRead(e) {
  // need book id to modify book object ( book.toggleRead())
  const bookId = e.target.id.split('-')[1];
  // need to select "read" or "unread" paragraph text in order to modify
  const readStatusElement = document.querySelector(`#readStatus-${bookId}`);
  const book = library[bookId];
  book.toggleRead();
  readStatusElement.textContent = setReadStatus(book.read)
}

function setReadStatus(read) {
  return read ? "I've read this." : "Haven't read yet."
}

function clearForm(inputs, checkbox) {
  checkbox.checked = false;
  inputs.forEach((input) => input.value = '');
}
