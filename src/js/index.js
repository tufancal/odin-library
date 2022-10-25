'use strict';
import '../scss/index.scss';

const addBook = document.querySelector('.add-js');
const submitBook = document.querySelector('.submit-js');
const modal = document.querySelector('.modal-js');
const container = document.querySelector('.container');
const error = document.querySelector('.error');

// pre-defined libray for array of objects
let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBookTile(element) {
  const tile = document.createElement('div');
  tile.innerHTML = element.title;
  return tile;
}

function resetForm() {
  document.getElementById('bookform').reset();
}

function addBookToLibrary(object) {
  library.push(object);

  if (library.some(element => element.title)) {
    
  }
}

addBook.addEventListener('click', () => {
  modal.showModal();
});

submitBook.addEventListener('click', () => {
  const book = new Book(
    document.getElementById('title').value,
    document.getElementById('author').value,
    document.getElementById('pages').value,
    document.getElementById('read').value
  );

  if (
    library.some(
      element => element.title.toLowerCase() === book.title.toLowerCase()
    )
  ) {
    error.classList.add('active');
  } else {
    error.classList.remove('active');
    addBookToLibrary(book);
    resetForm();
    modal.close();
  }

  console.log(library);
});
