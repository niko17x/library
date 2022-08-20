
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
const modal = document.getElementById("myModal"); // Main button 'Add Book' modal.
const btn = document.getElementById("myBtn"); // Opens the Modal.
const span = document.getElementsByClassName("close")[0]; // Span element closes the Modal.


// DEAL WITH MODAL FUNCTION:
const openModal = (() => {
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
        header.classList.add('is-blurred');
        main.classList.add('is-blurred');
    })
})();

//? Is there a way to create a 'parent event listener' to share DOM elements?
const closingModal = (() => {
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            header.classList.remove('is-blurred');
            main.classList.remove('is-blurred');
        }
    });
    span.addEventListener('click', () => {
        modal.style.display = 'none';
        header.classList.remove('is-blurred');
        main.classList.remove('is-blurred');
    })
})();


