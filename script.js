// TODO: CLICKING ON A BOOK CARD SHOULD OPEN A MODAL TO EDIT DETAILS => ADD AN EDIT OPTION TO EACH INDIVIDUAL BOOK ITEM /// WORK ON A FILTER OPTION FOR: READ/UNREAD, GENRE TYPE, SHORT/LONG PAGE BOOKS, ETC...

// LOCAL STORAGE:

const LOCAL_STORAGE_LIST_KEY = "books.myLibrary";
const LOCAL_STORAGE_SELECTED_BOOK_ID = "books.selectedBookItem";

const myLibrary =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedBookItem = localStorage.getItem(LOCAL_STORAGE_SELECTED_BOOK_ID);

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
const bookForm = document.querySelector("#add-book-form");
const modalTitleInput = document.querySelector("#modal-title");
const modalAuthorInput = document.querySelector("#modal-author");
const modalPagesInput = document.querySelector("#modal-pages");
const modalGenreInput = optionMenu.querySelector(".sBtn-text");
const spanTitleMsg = document.querySelector(".error-title-msg");
const spanAuthorMsg = document.querySelector(".error-author-msg");
const modalReadSwitch = document.querySelector(".modal-switch");

function saveAndRender() {
  save();
  render();
}

function render() {
  renderBookCards();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(myLibrary));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_BOOK_ID, selectedBookItem);
}

// Array to store book objects:

function CreateBook(bookTitle, bookAuthor, bookPages, bookGenre, bookRead) {
  return {
    id: Date.now().toString(),
    title: bookTitle,
    author: bookAuthor,
    pages: bookPages,
    genre: bookGenre,
    read: bookRead,
  };
}

// Todo: Read/unread toggle is not responding in the correct way => fix!
// Validates all input in modal and if data accepted, add to myLibrary array:

function validateModalForm(result, e) {
  e.preventDefault();
  if (
    !modalTitleInput.validity.valid ||
    !modalAuthorInput.validity.valid ||
    modalGenreInput.innerText.includes("Select")
  ) {
    showError();
  } else if (selectedBookItem === "") {
    myLibrary.push(result);
    showSuccessMsg("submit");
  } else if (selectedBookItem !== "") {
    updateBook();
  }
  resetModalForm();
}

// Show success message if book is added to 'myLibrary' array (passing validation):

function showSuccessMsg(message) {
  const successMsg = document.querySelector(".success-msg");

  if (message === "submit") {
    successMsg.innerText = "Book successfully added to your library!";
  } else if (message === "edit") {
    successMsg.innerText = "Changes have been saved!";
  }

  successMsg.classList.add(".success-glow");
  setTimeout(() => {
    successMsg.innerText = "";
  }, "4000");
}

// Resets all modal input values and span error messages:

function resetModalForm() {
  modalTitleInput.value = null;
  modalAuthorInput.value = null;
  modalPagesInput.value = null;
  spanTitleMsg.innerText = "";
  spanAuthorMsg.innerText = "";
  modalGenreInput.innerText = "Select book genre";
  modalGenreInput.style.color = "black";
  modalReadSwitch.removeAttribute("checked"); // Resetting 'checked' attribute.
}

// Display error in modal for incorrect input data:

function showError() {
  if (modalTitleInput.validity.valueMissing) {
    spanTitleMsg.textContent = "Please enter the book title.";
  }
  if (modalAuthorInput.validity.valueMissing) {
    spanAuthorMsg.textContent = "Please enter the authors full name.";
  }
  if (modalTitleInput.validity.tooLong) {
    spanTitleMsg.textContent = "Please shorten the book title.";
  }
  if (modalGenreInput.textContent.includes("genre")) {
    modalGenreInput.style.color = "red";
  }
}

// DEAL WITH MODAL FUNCTION:

function removeModal() {
  modal.style.display = "none";
  header.classList.remove("is-blurred");
  main.classList.remove("is-blurred");
  clearInputFields();
}

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

    const spanRead = document.createElement("span");
    spanRead.id = entry.id; // Create unique id.

    divBooks.classList.add("books");
    bookLibrary.appendChild(divBooks);

    divBookHeader.classList.add("book-header");
    divBooks.append(divBookHeader);

    // Book Title:

    const spanEdit = document.createElement("span");
    spanEdit.innerHTML = "&#9998;";
    spanEdit.classList.add("book-card-edit");
    spanEdit.id = entry.id;

    spanClose.setAttribute("id", entry.title);
    spanClose.id = entry.id;
    spanClose.innerHTML = "&#x2716;";
    spanClose.classList.add("book-card-close");
    h2Title.classList.add("title");
    h2Title.textContent = entry.title;
    divBookHeader.append(h2Title, spanEdit, spanClose);

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

    const divReadToggle = document.createElement("div");
    divReadToggle.classList.add("read-toggle");

    input.type = "checkbox";
    input.id = entry.id;
    input.className = "switch";

    label.setAttribute("for", input.id);
    label.id = entry.id;
    label.classList.add("label-book-toggle");
    label.innerText = "Toggle";

    // Toggle read/unread based on 'read' property in myLibrary array:

    if (entry.read === true) {
      input.checked = true;
    }

    divReadToggle.append(input, label);
    spanRead.classList.add("slider");
    divBookFooter.append(divReadToggle);
  });
}

function clearInputFields() {
  inputForm.forEach((input) => {
    input.value = "";
  });

  // ? Function to automatically close the modal after rendering books.
}

// ! TEST START:

// Update input values after editing book item:

function updateBook() {
  myLibrary.forEach((book) => {
    if (book.id === selectedBookItem) {
      if (modalTitleInput.value !== book.title) {
        book.title = modalTitleInput.value;
        showSuccessMsg("edit");
      }
      if (modalAuthorInput.value !== book.author) {
        book.author = modalAuthorInput.value;
        showSuccessMsg("edit");
      }
      if (modalPagesInput.value !== book.pages) {
        book.pages = modalPagesInput.value;
        showSuccessMsg("edit");
      }
      if (modalGenreInput.innerHTML !== book.genre) {
        book.genre = modalGenreInput.innerHTML;
        showSuccessMsg("edit");
      }
    }
  });
}

// Open edit modal with existing input value from object:

bookLibrary.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedBook = myLibrary.find((item) => item.id === e.target.id);
  if (e.target.classList.contains("book-card-edit")) {
    if (e.target.id === selectedBook.id) {
      modal.style.display = "block";
      modalTitleInput.value = selectedBook.title;
      modalAuthorInput.value = selectedBook.author;
      modalPagesInput.value = selectedBook.pages;
      modalGenreInput.innerText = selectedBook.genre;

      modalSwitchCheck(selectedBook);
    }
  }
});

// Helper function for toggling read/unread input switch:

function modalSwitchCheck(selectedBook) {
  if (selectedBook.read) {
    modalReadSwitch.checked = true;
  } else {
    modalReadSwitch.checked = false;
  }
}

// ! TEST END;

// Recursively clear out the child elements from the given element:

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Get the selected book list item id and use local storage:

document.querySelector(".book-library").addEventListener("click", (e) => {
  if (e.target.classList.contains("book-card-edit")) {
    selectedBookItem = e.target.id;
  }
});

// Event to toggle read/unread in each book item:

document.querySelector(".book-library").addEventListener("click", (e) => {
  const selectedBook = myLibrary.find((item) => item.id === e.target.id);

  if (e.target.tagName.toLowerCase() === "label") {
    if (selectedBook.id === e.target.id) {
      // click event toggles read/unread corresponds to the 'read' property in myLibrary array:

      if (selectedBook.read) {
        selectedBook.read = false;
      } else {
        selectedBook.read = true;
      }
    }
  }
});

// Toggle read/unread for general modal and editing book item:

document.querySelector(".label-switch").addEventListener("click", () => {
  myLibrary.forEach((item) => {
    if (item.id === selectedBookItem) {
      if (item.read) {
        item.read = false;
        modalReadSwitch.checked = false;
      } else {
        item.read = true;
        modalReadSwitch.checked = true;
      }
    }
  });
  modalReadSwitch.toggleAttribute("checked");
  render();
});

// Note: 'Submit' buttons must be fired on the form element not the submit button itself:

bookForm.addEventListener("submit", (e) => {
  const result = CreateBook(
    modalTitleInput.value,
    modalAuthorInput.value,
    modalPagesInput.value,
    modalGenreInput.innerText,
    modalReadSwitch.checked
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
    modalGenreInput.innerText = selectedOption;

    optionMenu.classList.remove("active");
  });
});

// Revert genre span text back to black if not default text:

selectBtn.addEventListener("click", (e) => {
  if (e.target.textContent.includes("Select")) {
    modalGenreInput.style.color = "black";
  }
});

// Modal title input form constraint validation:

modalTitleInput.addEventListener("input", () => {
  if (!modalTitleInput.validity.valid) {
    showError();
  } else {
    spanTitleMsg.textContent = "";
  }
});

// Modal author input form constraint validation:

modalAuthorInput.addEventListener("input", () => {
  if (!modalAuthorInput.validity.valid) {
    showError();
  } else {
    spanAuthorMsg.innerText = "";
  }
});

// Click on the span target and remove the parent, parent element of that span.

bookLibrary.addEventListener("click", (e) => {
  if (e.target.classList.contains("book-card-close")) {
    // Using the id of the current selected book (selectedBookItem), get index pos. of object in myLibrary and remove from array => return new myLibrary array.

    myLibrary.splice(myLibrary.indexOf(selectedBookItem), 1);
  }
  saveAndRender();
});

btn.addEventListener("click", () => {
  modal.style.display = "block";
  header.classList.add("is-blurred");
  main.classList.add("is-blurred");
  selectedBookItem = "";
  save(); // Save selectedBookItem after converting to 'null'.
});

// Clicking outside of modal, closes modal:

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    selectedBookItem = "";
    optionMenu.classList.remove("active");
    resetModalForm();
    removeModal();
  }
});

// Click on 'x' close on modal, closes modal:

span.addEventListener("click", () => {
  selectedBookItem = "";
  optionMenu.classList.remove("active");
  resetModalForm();
  removeModal();
});

function printWindow() {
  window.addEventListener("click", (e) => {
    console.log(e.target);
  });
}

printWindow();

render();
