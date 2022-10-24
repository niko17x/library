// TODO: Use local storage to store data /// Deal with 'undefined' in each book /// Add id to each book item ///

// LOCAL STORAGE:

const LOCAL_STORAGE_LIST_KEY = "books.myLibrary";

const myLibrary =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

// DOM SELECTORS:

// Unused variables:
// const notes = document.getElementById("notes");
// const myBtn = document.getElementById("myBtn");

// const formMessage = document.querySelector(".form-message");
// const readToggle = document.querySelector(".read-toggle");

const header = document.querySelector(".header");
const main = document.querySelector(".main");
const bookLibrary = document.querySelector(".book-library");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const genre = document.getElementById("genre");
const submitBtn = document.getElementById("btn");
const inputForm = document.querySelectorAll("input");
const modal = document.getElementById("myModal"); // Main button 'Add Book' modal.
const btn = document.getElementById("myBtn"); // Opens the Modal.
const span = document.getElementsByClassName("close")[0]; // Span element closes the Modal.

// ! START TESTING:

function saveAndRender() {
  save();
  render();
}

function render() {
  renderBookCards();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(myLibrary));
}

// todo: Convert all classes to functions?
// Array to store book objects:

function CreateBook(bookTitle, bookAuthor, bookPages, bookGenre) {
  return {
    id: Date.now().toString(),
    title: bookTitle,
    author: bookAuthor,
    pages: bookPages,
    genre: bookGenre,
  };
}

// function that adds the new book object into the 'myLibrary' array:

const modalBtn = document.querySelector(".modal-submit-btn");

modalBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const modalTitleInput = document.querySelector("#modal-title").value;
  const modalAuthorInput = document.querySelector("#modal-author").value;
  const modalPagesInput = document.querySelector("#modal-pages").value;
  const modalGenreInput = document.querySelector("#modal-genre").value;

  const result = CreateBook(
    modalTitleInput,
    modalAuthorInput,
    modalPagesInput,
    modalGenreInput
  );

  myLibrary.push(result);
  saveAndRender();
});

// ! END TESTING:

// DEAL WITH MODAL FUNCTION:

class ModalEvents {
  static openModal() {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
      header.classList.add("is-blurred");
      main.classList.add("is-blurred");
    });
  }

  static removeModal() {
    modal.style.display = "none";
    header.classList.remove("is-blurred");
    main.classList.remove("is-blurred");
    clearInputFields();
  }

  // ? Is there a way to create a 'parent event listener' to share common DOM elements?

  static closeModal() {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        ModalEvents.removeModal();
      }
    });
  }

  static closeSpanModal() {
    span.addEventListener("click", () => {
      ModalEvents.removeModal();
    });
  }
}
ModalEvents.openModal();
ModalEvents.closeModal();
ModalEvents.closeSpanModal();

// Iterate through library and create a "book card" for each book object inside the array:

function renderBookCards() {
  clearElement(bookLibrary);
  myLibrary.forEach((entry) => {
    const divBooks = document.createElement("div");
    divBooks.id = entry.id; // Adding unique date id to div.
    const divBookHeader = document.createElement("div");
    const spanClose = document.createElement("span");
    const h2Title = document.createElement("h2");
    const divBookBody = document.createElement("div");
    const newP1 = document.createElement("p");
    const newP2 = document.createElement("p");
    const newP3 = document.createElement("p");
    const divBookFooter = document.createElement("div");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span1 = document.createElement("span");

    divBooks.classList.add("books");
    bookLibrary.appendChild(divBooks);

    divBookHeader.classList.add("book-header");
    divBooks.append(divBookHeader);

    // Book Title:

    spanClose.setAttribute("id", entry.title);
    spanClose.id = entry.id;
    spanClose.innerHTML = "&times;";
    spanClose.classList.add("book-card-close");
    h2Title.classList.add("title");
    h2Title.textContent = entry.title;
    divBookHeader.append(spanClose, h2Title);

    divBookBody.classList.add("book-body");
    divBooks.appendChild(divBookBody);

    // Author section:

    newP1.textContent = `Author: ${entry.author}`;
    newP1.setAttribute("id", "author");
    divBookBody.appendChild(newP1);

    // Pages section:

    newP2.textContent = `No. of Pages: ${entry.pages}`;
    newP2.setAttribute("id", "no-of-pages");
    divBookBody.appendChild(newP2);

    // Genre section:

    newP3.textContent = `Genre: ${entry.genre}`;
    newP3.setAttribute("id", "genre");
    divBookBody.appendChild(newP3);

    divBookFooter.classList.add("book-footer");
    divBooks.appendChild(divBookFooter);

    // Create toggle for read/unread:

    label.classList.add("switch");
    input.setAttribute("type", "checkbox");
    span1.classList.add("slider");
    label.appendChild(input);
    label.appendChild(span1);
    divBookFooter.appendChild(label);
  });
}

function deleteBook(element) {
  element.parentNode.parentNode.remove();
}

function inputMessage(element) {
  const div = document.createElement("div"); // Create new Div.
  const modalBody = document.querySelector(".modal-body"); // Get parent element.
  const addBookForm = document.querySelector("#add-book-form"); // Reference node.

  // Empty input values:

  if (element.value === "" || element.value == null) {
    div.className = "error-glow";
    div.innerText = `${element.id} is required.`;
  } else {
    div.className = "success-glow";
    div.innerText = `${element.value} has been successfully added!`;
  }
  modalBody.insertBefore(div, addBookForm);
  setTimeout(() => div.classList.remove("error-glow"), 3000); // Remove class.
  setTimeout(() => div.classList.remove("success-glow"), 3000);
  setTimeout(() => div.remove(), 3000); // Remove entire div element.
}

function clearInputFields() {
  inputForm.forEach((input) => {
    input.value = "";
  });
  ModalEvents.closeModal();
}

// Recursively clear out the child elements from the given element:

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Click on the span target and remove the parent, parent element of that span.

bookLibrary.addEventListener("click", (e) => {
  if (e.target.classList.contains("book-card-close")) {
    // Select book object id that matches the clicked-on target id:

    const selectedId = myLibrary.find((item) => item.id === e.target.id);

    // Delete the book object from 'myLibrary' array:

    myLibrary.splice(myLibrary.indexOf(selectedId), 1);
  }
  saveAndRender();
});

function printWindow() {
  window.addEventListener("click", (e) => {
    console.log(e.target);
  });
}

// printWindow();

render();
