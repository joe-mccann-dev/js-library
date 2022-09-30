
const myLibrary = [new Book('hey you', 'author mcgee', '123', true)];

displayBooks();

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

function addBookToLibrary(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const pageCount = document.querySelector('#page_count').value
  const isRead = document.querySelector('#is_read').checked
  
  const book = new Book(
    title,
    author,
    pageCount,
    isRead
  )
  myLibrary.push(book);
  displayBooks();
}


function displayBooks() {
  const list = document.querySelector('#library');
  list.replaceChildren();
  myLibrary.forEach((book, index) => {
    const listItem = document.createElement('li');
    [book.title, book.author, book.pageCount, book.read].forEach((attr) => {
      const attribute = document.createElement('p');
      attribute.textContent = attr
      listItem.appendChild(attribute);
    });
    listItem.dataset.bookId = index
    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', `remove-${listItem.dataset.bookId}`)
    removeButton.textContent = 'remove book'
    listItem.appendChild(removeButton)
    list.appendChild(listItem);
    removeButton.addEventListener('click', () => {
      list.removeChild(listItem)
      myLibrary.splice(index, 1)
    });
  });
}

function showBookForm() {
  const form = document.querySelector('.form');
  form.classList.toggle('hidden');
}

const addBookButton = document.querySelector('#add_book_button');
addBookButton.addEventListener('click', showBookForm);

const addBookForm = document.querySelector('#add_book_form');
addBookForm.addEventListener('submit', addBookToLibrary)



