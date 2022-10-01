
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
  displayBook(book, library.length - 1);
  clearForm([title, author, pageCount], isRead);
}

const list = document.querySelector('#library');
function displayBook(book, index) {
  const listItem = document.createElement('li');

  const title = document.createElement('h3');
  title.textContent = book.title;
  const author = document.createElement('p');
  author.textContent = `by ${book.author}`;
  const pageCount = document.createElement('p');
  pageCount.textContent = `${book.pageCount} pages`;
  const readStatus = document.createElement('p');
  readStatus.setAttribute('class', 'read_status')
  readStatus.textContent = setReadStatus(book.read);
  readStatus.setAttribute('id', `readStatus-${index}`);
  [title, author, pageCount, readStatus].forEach((el) => listItem.appendChild(el));

  listItem.dataset.bookId = index

  const removeButton = document.createElement('button');
  removeButton.setAttribute('class', 'remove_button');
  removeButton.textContent = 'remove';
  removeButton.addEventListener('click', removeBook);
  listItem.appendChild(removeButton);

  const toggleReadButton = document.createElement('button');
  toggleReadButton.setAttribute('class', 'toggle_read_button');
  toggleReadButton.setAttribute('id', `readButton-${listItem.dataset.bookId}`);
  toggleReadButton.textContent = setReadButtonText(book.read, toggleReadButton);
  toggleReadButton.addEventListener('click', toggleRead);
  listItem.appendChild(toggleReadButton);

  list.appendChild(listItem);
  
}

function removeBook(e) {
  const target = e.target;
  const listItem = target.parentElement;
  const bookId = listItem.dataset.bookId;
  delete library[bookId];
  listItem.remove();
}

function toggleRead(e) {
  const readButton = e.target
  // need book id to modify book object ( book.toggleRead())
  const bookId = readButton.id.split('-')[1];
  // need to select "read" or "unread" paragraph text in order to modify
  const readStatusElement = document.querySelector(`#readStatus-${bookId}`);
  const book = library[bookId];
  book.toggleRead();
  readStatusElement.textContent = setReadStatus(book.read);
  readButton.textContent = setReadButtonText(book.read, readButton)
}

function setReadStatus(read) {
  return read ? "I've read this." : "Not read";
}

function setReadButtonText(read, button) {
  if (read && button) { return 'mark unread'; }
  if (!read && button) { return 'mark as read'; }
}

function clearForm(inputs, checkbox) {
  checkbox.checked = false;
  inputs.forEach((input) => input.value = '');
}


// FOR TESTING PURPOSES

// const test1 = new Book('Of Mice and Men', 'John Steinbeck', '200', true);
// const test2 = new Book('Lord of the Rings', 'J.R.R. Tolkien', '520', true);
// const test3 = new Book('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', '402', false);
// library = [test1, test2, test3]

// library.forEach((b, i) => displayBook(b, i));
