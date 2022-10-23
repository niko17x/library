// TODO: Use local storage to store data /// Deal with 'undefined' in each book /// Add id to each book item ///

// LOCAL STORAGE:

const LOCAL_STORAGE_LIST_KEY = "books.";

const storedBooks =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

// DOM SELECTORS:

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

// Unused variables:
// const notes = document.getElementById("notes");
// const myBtn = document.getElementById("myBtn");
// const bookCardClose = document.querySelectorAll(".book-card-close");
// const formMessage = document.querySelector(".form-message");
// const readToggle = document.querySelector(".read-toggle");

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
    Render.clearFields();
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

class Book {
  constructor(bookTitle, bookAuthor, bookPages, bookGenre) {
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.book = bookGenre;
  }
}

class Render {
  static displayBooks() {
    const pretendLocalStorage = [
      // Delete later.

      {
        title: "Book One",
        author: "Author One",
        pages: 100,
        genre: "Magic One",
      },
      {
        title: "Book Two",
        author: "Author Two",
        pages: 200,
        genre: "Magic Two",
      },
      {
        title: "Book Three",
      },
    ];

    const myLibrary = pretendLocalStorage;

    myLibrary.forEach((book) => {
      Render.createBookCards(book);
    });
  }

  // Iterate through library and create a "book card" for each book object inside the array:

  static createBookCards(book) {
    const divBooks = document.createElement("div");
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

    spanClose.setAttribute("id", book.title);
    spanClose.innerHTML = "&times;";
    spanClose.classList.add("book-card-close");
    h2Title.classList.add("title");
    h2Title.textContent = book.title;
    divBookHeader.append(spanClose, h2Title);

    divBookBody.classList.add("book-body");
    divBooks.appendChild(divBookBody);

    // Author section:

    newP1.textContent = `Author: ${book.author}`;
    newP1.setAttribute("id", "author");
    divBookBody.appendChild(newP1);

    // Pages section:

    newP2.textContent = `No. of Pages: ${book.pages}`;
    newP2.setAttribute("id", "no-of-pages");
    divBookBody.appendChild(newP2);

    // Genre section:

    newP3.textContent = `Genre: ${book.genre}`;
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
  }

  // Toggle based on whether book is read or not:

  static readStatus() {}

  static deleteBook(element) {
    if (element.classList.contains("book-card-close")) {
      element.parentNode.parentNode.remove(); // Remove entire structure.
    }
  }

  // Create message div for form input:
  // ? How do I use a spread operator to pass in multiple arguments?

  static inputMessage(element) {
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

  // !! TICKET: SUCCESS MESSAGE DIV IS NOT BEING CREATED WHEN ADDING A BOOK.

  // Reset all value fields in input form:

  static clearFields() {
    inputForm.forEach((input) => {
      input.value = "";
    });
    ModalEvents.closeModal();
  }
}

const renderBooks = (() => {
  document.addEventListener("DOMContentLoaded", Render.displayBooks);
})();

const createNewBook = (() => {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents 'submit' event from submitting.

    // Validate:

    if (title.value === "") {
      // Book card not created.

      Render.inputMessage(title);
    } else if (author.value === "") {
      Render.inputMessage(author);
    } else {
      const book = new Book(
        title.value,
        author.value,
        pages.value,
        genre.value
      ); // Book card created.
      Render.createBookCards(book);
      Render.clearFields(); // Clear inputs in form.
    }
  });
})();

// Click on the span target and remove the parent, parent element of that span.

const removeBookCard = (() => {
  window.addEventListener("click", (e) => {
    Render.deleteBook(e.target);
  });
})();

function printWindow() {
  window.addEventListener("click", (e) => {
    console.log(e.target);
  });
}
printWindow();
