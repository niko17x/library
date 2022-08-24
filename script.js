// TODO:
/**
 * 1. Add ellipsis incase text in input form is too long.
 */




// DOM SELECTORS:
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const bookLibrary = document.querySelector('.book-library');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const genre = document.getElementById('genre');
const notes = document.getElementById('notes');
const submitBtn = document.getElementById('btn');
const myBtn = document.getElementById('myBtn');
const inputForm = document.querySelectorAll('input');
const modal = document.getElementById("myModal"); // Main button 'Add Book' modal.
const btn = document.getElementById("myBtn"); // Opens the Modal.
const span = document.getElementsByClassName("close")[0]; // Span element closes the Modal.

const bookCardClose = document.querySelectorAll('.book-card-close');
const formMessage = document.querySelector('.form-message');


// DEAL WITH MODAL FUNCTION:
class ModalEvents {
    static openModal() {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            header.classList.add('is-blurred');
            main.classList.add('is-blurred');
        })
    };

    static removeModal() {
        modal.style.display = 'none';
        header.classList.remove('is-blurred');
        main.classList.remove('is-blurred');
        formMessage.innerText = "";
        Render.clearFields();

    };
    
    //? Is there a way to create a 'parent event listener' to share common DOM elements?
    static closeModal() {
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                ModalEvents.removeModal();
            };
        });
    };
    static closeSpanModal() {
        span.addEventListener('click', () => {
            ModalEvents.removeModal();
        });
    };
};
ModalEvents.openModal();
ModalEvents.closeModal();
ModalEvents.closeSpanModal();


class Book {
    constructor(title, author, pages, genre) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
    }
}


class Render {
    static displayBooks() {
        const pretendLocalStorage = [ // Delete later.
            {
                title: 'Book One',
                author: 'Author One',
                pages: 100,
                genre: 'Magic One',
            },
            {
                title: 'Book Two',
                author: 'Author Two',
                pages: 200,
                genre: 'Magic Two',
            },
            {
                title: 'Book Three'
            }
        ];

        const myLibrary = pretendLocalStorage;

        myLibrary.forEach((book) => { Render.createBookCards(book) });       
    };
    
    // Iterate through library and create a "book card" for each book object inside the array:
    static createBookCards(book) {
        const divBooks = document.createElement('div');
        const divBookHeader = document.createElement('div');
        const spanClose = document.createElement('span');
        const h2Title = document.createElement('h2');
        const divBookBody = document.createElement('div');
        const newP1 = document.createElement('p');
        const newP2 = document.createElement('p');
        const newP3 = document.createElement('p');
        const newP4 = document.createElement('p');
        const divBookFooter = document.createElement('div');
        const buttonEdit = document.createElement('button');
        const buttonNotRead = document.createElement('button');

       
        divBooks.classList.add('books');
        bookLibrary.appendChild(divBooks);
    
        divBookHeader.classList.add('book-header');
        divBooks.append(divBookHeader);
        
        // Book Title:
        spanClose.setAttribute('id', book.title);
        spanClose.innerHTML = '&times;';
        spanClose.classList.add('book-card-close');
        h2Title.classList.add('title');
        h2Title.textContent = book.title;
        divBookHeader.append(spanClose, h2Title);
    
        divBookBody.classList.add('book-body');
        divBooks.appendChild(divBookBody);
    
        // Author section:
        newP1.textContent = 'Author: ' + book.author;
        newP1.setAttribute('id', 'author');
        divBookBody.appendChild(newP1);
        
        // Pages section:
        newP2.textContent = 'No. of Pages: ' + book.pages;
        newP2.setAttribute('id', 'no-of-pages');
        divBookBody.appendChild(newP2);
        
        // Genre section:
        newP3.textContent = 'Genre: ' + book.genre;
        newP3.setAttribute('id', 'genre');
        divBookBody.appendChild(newP3);
    
        // Notes section:
        newP4.textContent = 'Notes: ' + book.notes;
        newP4.setAttribute('id', 'notes');
        divBookBody.appendChild(newP4);
    
        divBookFooter.classList.add('book-footer');
        divBooks.appendChild(divBookFooter);
    
        buttonEdit.textContent = 'Edit';
        buttonNotRead.textContent = 'Not Read'
        divBookFooter.appendChild(buttonEdit);
        divBookFooter.appendChild(buttonNotRead);
    };

    static deleteBook(element) {
        if (element.classList.contains('book-card-close')) {
            element.parentNode.parentNode.remove(); // Remove entire structure.
        }
    };


    // Success / Error message for input forms:
    static errorInput(element) {
        formMessage.classList.add('error-glow');
        formMessage.innerText = `${element.id} is required.`
        setTimeout(() => formMessage.classList.remove('error-glow'), 3000);
        setTimeout(() => formMessage.innerText = "", 3000);
    };

    static successInput(element) {
        formMessage.classList.add('success-glow');
        formMessage.innerText = `${element.value} has been successfully added.`
        setTimeout(() => formMessage.classList.remove('success-glow'), 3000);
        setTimeout(() => formMessage.innerText = "", 3000);
    }

    // Reset all value fields in input form:
    static clearFields() {
        inputForm.forEach((input) => {
            input.value = "";
            input.parentNode.classList.remove('error-glow');
            input.parentNode.classList.remove('success-glow');
        })
        ModalEvents.closeModal();
    };

};

 

// Event: Method calls:
document.addEventListener('DOMContentLoaded', Render.displayBooks)

// Event: Adding book:
//? Find out why 'submit' doesn't process the event.
submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents 'submit' event from submitting.

    // Validate:
    if (title.value === "") {
        Render.errorInput(title);
    } else {
        const book = new Book(title.value, author.value, pages.value, genre.value);
        Render.createBookCards(book);
        Render.successInput(title)
    
        Render.clearFields(); // Clear inputs in form.
        // ModalEvents.removeModal(); // Remove modal input form.
    
    };
})

// Click on the span target and remove the parent, parent element of that span.
window.addEventListener('click', (e) => {
    Render.deleteBook(e.target);
})

























window.addEventListener('click', (e) => {
    console.log(e.target)
})