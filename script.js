// TODO: TOGGLE READ/UNREAD => ADD TO 'MYLIBRARY' OBJECT AND USE THE DATA TO 'FILTER' LATER. /// Add 'read' toggle to the modal and return data to the myLibrary object array.

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
const inputForm = document.querySelectorAll("input");
const modal = document.getElementById("myModal"); // Main button 'Add Book' modal.
const btn = document.getElementById("myBtn"); // Opens the Modal.
const span = document.getElementsByClassName("close")[0]; // Span element closes the Modal.
const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-btn");
const options = optionMenu.querySelectorAll(".option");
const sBtnText = optionMenu.querySelector(".sBtn-text");
const bookForm = document.querySelector("#add-book-form");
const modalTitleInput = document.querySelector("#modal-title");
const modalAuthorInput = document.querySelector("#modal-author");
const modalPagesInput = document.querySelector("#modal-pages");
const modalGenreInput = optionMenu.querySelector(".sBtn-text");
const modalTitle = document.querySelector("#modal-title");
const modalAuthor = document.querySelector("#modal-author");
const spanTitleMsg = document.querySelector(".error-title-msg");
const spanAuthorMsg = document.querySelector(".error-author-msg");

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

// Array to store book objects:

function CreateBook(bookTitle, bookAuthor, bookPages, bookGenre) {
  return {
    id: Date.now().toString(),
    title: bookTitle,
    author: bookAuthor,
    pages: bookPages,
    genre: bookGenre,
    read: false, // Indicates book has been read/unread.
  };
}

// Validates all input in modal and if data accepted, add to myLibrary array:

function validateModalForm(result, e) {
  if (
    !modalTitle.validity.valid ||
    !modalAuthor.validity.valid ||
    sBtnText.innerText.includes("Select")
  ) {
    showError();
    e.preventDefault();
  } else {
    showSuccessMsg();
    myLibrary.push(result);
    resetModalForm();
    e.preventDefault();
  }
}

// Show success message if book is added to 'myLibrary' array (passing validation):

function showSuccessMsg() {
  const successMsg = document.querySelector(".success-msg");

  successMsg.innerText = "Book successfully added to your library!";

  // successMsg.style.color = "green";

  successMsg.classList.add(".success-glow");
  setTimeout(() => {
    successMsg.innerText = "";
  }, "5000");
}

// Resets all span error messages:

function resetModalForm() {
  spanTitleMsg.innerText = "";
  spanAuthorMsg.innerText = "";
  sBtnText.innerText = "Select book genre";
  sBtnText.style.color = "black";
}

// Display error in modal for incorrect input data:

function showError() {
  if (modalTitle.validity.valueMissing) {
    spanTitleMsg.textContent = "Please enter the book title.";
  }
  if (modalAuthor.validity.valueMissing) {
    spanAuthorMsg.textContent = "Please enter the authors full name.";
  }
  if (modalTitle.validity.tooLong) {
    spanTitleMsg.textContent = "Please shorten the book title.";
  }
  if (sBtnText.textContent.includes("genre")) {
    sBtnText.style.color = "red";
  }
}

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
        optionMenu.classList.remove("active");
        resetModalForm();
        ModalEvents.removeModal();
      }
    });
  }

  static closeSpanModal() {
    span.addEventListener("click", () => {
      optionMenu.classList.remove("active");
      resetModalForm();
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
    input.id = entry.id;

    // input.setAttribute("checked", false);

    const spanRead = document.createElement("span");
    spanRead.id = entry.id; // Create unique id.

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

    label.classList.add("switch");
    input.classList.add("readIndicator");
    input.setAttribute("type", "checkbox");

    if (entry.read === false) {
      input.checked = false;
    } else {
      input.checked = true;
    }

    spanRead.classList.add("slider");
    label.append(input, spanRead);
    divBookFooter.appendChild(label);
  });
}

// ? In service?
// function deleteBook(element) {
//   element.parentNode.parentNode.remove();
// }

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

// Dealing with book card toggle (read / unread):

document.querySelector(".book-library").addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "span") {
    console.log("clicked");
    const foo = document.querySelector(".readIndicator");
    foo.setAttribute("checked", true);
    foo.setAttribute("class", "WHAT THE FUCK");
    console.log(foo);
  }
});

// Note: 'Submit' buttons must be fired on the form element not the submit button itself:

bookForm.addEventListener("submit", (e) => {
  const result = CreateBook(
    modalTitleInput.value,
    modalAuthorInput.value,
    modalPagesInput.value,
    modalGenreInput.innerText
  );

  validateModalForm(result, e);
  saveAndRender();
});

// Clicking on 'Select your genre' opens display:

selectBtn.addEventListener("click", () => {
  optionMenu.classList.toggle("active");
});

// Clicking on 'genre selector' will add the active class:

options.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedOption = option.querySelector(".option-text").innerText;
    sBtnText.innerText = selectedOption;

    optionMenu.classList.remove("active");
  });
});

// Revert genre span text back to black if not default text:

selectBtn.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Select")) {
    sBtnText.style.color = "black";
  }
});

// Modal title input form constraint validation:

modalTitle.addEventListener("input", () => {
  if (!modalTitle.validity.valid) {
    showError();
  } else {
    spanTitleMsg.textContent = "";
  }
});

// Modal author input form constraint validation:

modalAuthor.addEventListener("input", () => {
  if (!modalAuthor.validity.valid) {
    showError();
  } else {
    spanAuthorMsg.innerText = "";
  }
});

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
