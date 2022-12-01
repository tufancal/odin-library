/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);



var addBook = document.querySelector('.js-add');
var submitBook = document.querySelector('.js-submit');
var modal = document.querySelector('.js-modal');
var container = document.querySelector('.js-container');
var error = document.querySelector('.js-error');
var form = document.querySelector('.js-form');
var toggleSwitch = document.querySelector('.js-toggle'); // pre-defined libray for array of objects

var library = []; // Data-set attribute to check remove

var datasetAttribute = 'book';

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBookTile(element) {
  //HTML Elements
  var tile = document.createElement('article');
  var title = document.createElement('h2');
  var author = document.createElement('h3');
  var pages = document.createElement('p');
  var read = document.createElement('button');
  var remove = document.createElement('button'); //Classes

  tile.classList.add('tile');
  title.classList.add('tile__element');
  author.classList.add('tile__element');
  pages.classList.add('tile__element');
  read.classList.add('tile__read', 'tile__button', 'button', 'js-read');
  remove.classList.add('tile__remove', 'tile__button', 'button', 'js-remove'); //Values

  title.innerHTML = '<div class="tile__highlight">Title</div>' + '"' + element.title + '"';
  author.innerHTML = '<div class="tile__highlight">Author</div>' + element.author;
  pages.innerHTML = '<div class="tile__highlight">Pages</div>' + element.pages;

  if (element.read) {
    read.innerHTML = 'Read';
    read.classList.add('tile__read--active');
  } else {
    read.innerHTML = 'Not read';
  }

  remove.innerHTML = '- Remove Book'; //Append to container "tile"

  tile.appendChild(title);
  tile.appendChild(author);
  tile.appendChild(pages);
  tile.appendChild(read);
  tile.appendChild(remove); //Dataset to remove tile & object

  tile.dataset.index = datasetAttribute;
  remove.dataset.index = datasetAttribute; //Dataset to check for read

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

addBook.addEventListener('click', function () {
  modal.showModal();
});
submitBook.addEventListener('click', function () {
  var book = new Book(document.getElementById('title').value, document.getElementById('author').value, document.getElementById('pages').value, document.getElementById('read').checked);

  if (library.some(function (element) {
    return element.title.toLowerCase() === book.title.toLowerCase();
  })) {
    error.classList.add('active');
  } else {
    error.classList.remove('active');
    addBookToLibrary(book);
    resetForm();
    modal.close();
  }
});

var targetAction = function targetAction(element) {
  var target = element.target;
  var firstChild = target.parentNode.firstChild;
  var firstChildInner = firstChild.innerHTML.replace(/"/g, '').replace(/<div class=tile__highlight>Title<\/div>/g, '');
  var remove = target.classList.contains('js-remove');
  var read = target.classList.contains('js-read'); //Remove or check for read

  if (target.dataset.index === target.parentNode.dataset.index) {
    for (var i = 0; i < library.length; i++) {
      var title = library[i].title;
      var readStatus = library[i].read; //Remove book

      if (firstChild.classList.contains('tile__element') && title == firstChildInner && remove) {
        library.splice(i, 1);
        target.parentNode.remove();
        break; // Change read status
      } else if (firstChild.classList.contains('tile__element') && title == firstChildInner && read) {
        Object.assign(library[i], {
          read: !readStatus
        });
        readStatus = library[i].read; //Reassign variable to switched read status

        if (readStatus) {
          target.innerHTML = 'Read';
          target.classList.add('tile__read--active');
        } else {
          target.innerHTML = 'Not read';
          target.classList.remove('tile__read--active');
        }
      }
    }
  }
};

container.addEventListener('click', function (element) {
  if (element.target.parentNode.classList.contains('tile')) {
    targetAction(element);
  }
}); //Toggle Light/Dark mode

function switchTheme(element) {
  if (element.target.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);
})();

/******/ })()
;