'use strict';
import '../scss/index.scss';

const addBook = document.querySelector('.add-js');
const submitBook = document.querySelector('.submit-js');
const modal = document.querySelector('.modal-js');
const container = document.querySelector('.container');
const error = document.querySelector('.error');
const formElements = document.querySelectorAll('.bookform__element');

// pre-defined libray for array of objects
let library = [];
// Data-set attribute to check remove
const datasetAttribute = 'book';

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  console.log(this.read);
}

function createBookTile(element) {
  //HTML Elements
  const tile = document.createElement('article');
  const title = document.createElement('h2');
  const author = document.createElement('h3');
  const pages = document.createElement('p');
  const read = document.createElement('button');
  const remove = document.createElement('button');

  //Classes
  tile.classList.add('container__tile');
  title.classList.add('tile__title', 'tile__element');
  author.classList.add('tile__element');
  pages.classList.add('tile__element');
  read.classList.add('tile__read', 'tile__button');
  remove.classList.add('tile__read', 'tile__button');

  //Values
  title.innerHTML = '"' + element.title + '"';
  author.innerHTML = element.author;
  pages.innerHTML = element.pages;
  console.log(element.read);

  if (element.read) {
    read.innerHTML = 'Read';
  } else {
    read.innerHTML = 'Not read';
  }

  remove.innerHTML = '- Remove Book';

  //Append to container "tile"
  tile.appendChild(title);
  tile.appendChild(author);
  tile.appendChild(pages);
  tile.appendChild(read);
  tile.appendChild(remove);

  //Dataset to remove tile & object
  tile.dataset.index = datasetAttribute;
  remove.dataset.index = datasetAttribute;
  return tile;
}

container.addEventListener('click', element => {
  console.log(element.target.parentNode);
  console.log(
    element.target.previousElementSibling.classList.contains('title')
  );

  if (element.target.previousElementSibling.classList.contains('title')) {
    console.log(element.target.previousElementSibling.innerHTML);
  }

  for (let i = 0; i < library.length; i++) {
    const foo = library[i].title;

    if (element.target.previousElementSibling.classList.contains('title')) {
      if (foo == element.target.previousElementSibling.innerHTML) {
        console.log('Check');
        library = library.splice(i, 1);
        console.log(library);
      }
    }
  }
  if (element.target.dataset.index == element.target.parentNode.dataset.index) {
    element.target.parentNode.remove();
  }
});

function resetForm() {
  document.getElementById('bookform').reset();
}

function addBookToLibrary(object) {
  library.push(object);
  container.appendChild(createBookTile(object));
}

addBook.addEventListener('click', () => {
  modal.showModal();
});

submitBook.addEventListener('click', () => {
  const book = new Book(
    document.getElementById('title').value,
    document.getElementById('author').value,
    document.getElementById('pages').value,
    document.getElementById('read').checked
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

//Todo:
// blank html when creating tile corretly
// check library (for loop) with created div e.g. with title and delete it also from array as you delete it from dom
// styling
