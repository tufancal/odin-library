'use strict';
import '../scss/index.scss';

const addBook = document.querySelector('.add-js');
const submitBook = document.querySelector('.submit-js');
const modal = document.querySelector('.modal-js');
const container = document.querySelector('.container-js');
const error = document.querySelector('.error-js');
const form = document.querySelector('.form-js');

// pre-defined libray for array of objects
let library = [];
// Data-set attribute to check remove
const datasetAttribute = 'book';

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  read.classList.add('tile__read', 'tile__read-js', 'tile__button');
  remove.classList.add('tile__remove', 'tile__remove-js', 'tile__button');

  //Values
  title.innerHTML = '"' + element.title + '"';
  author.innerHTML = element.author;
  pages.innerHTML = element.pages;

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
  //Dataset to check for read
  read.dataset.index = datasetAttribute;
  return tile;
}

function resetForm() {
  form.reset();
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
});

const targetAction = element => {
  const target = element.target;
  const firstChild = target.parentNode.firstChild;
  const firstChildInner = firstChild.innerHTML.replace(/"/g, '');
  const remove = target.classList.contains('tile__remove-js');
  const read = target.classList.contains('tile__read-js');

  //Remove or check for read
  if (target.dataset.index === target.parentNode.dataset.index) {
    for (let i = 0; i < library.length; i++) {
      const title = library[i].title;
      let readStatus = library[i].read;
      
      //Remove book
      if (
        firstChild.classList.contains('tile__title') &&
        title == firstChildInner &&
        remove
      ) {
        library.splice(i, 1);
        target.parentNode.remove();
        break;
        // Change read status
      } else if (
        firstChild.classList.contains('tile__title') &&
        title == firstChildInner &&
        read
      ) {
        Object.assign(library[i], {read: !readStatus});
        readStatus = library[i].read; //Reassign variable to switched read status
        if (readStatus) {
          target.innerHTML = 'Read';
        } else {
          target.innerHTML = 'Not read';
        }
      }
    }
  }
};

container.addEventListener('click', element => {
  targetAction(element);
});
