const header = document.querySelector('.header');
const main = document.querySelector('.main');


// MAIN BUTTON "ADD BOOK" MODAL:
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.addEventListener('click', () => {
    modal.style.display = 'block';
    header.classList.add('is-blurred'); // Add blur effect.
    main.classList.add('is-blurred');
})

// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
    modal.style.display = 'none';
    header.classList.remove('is-blurred'); // Remove blur effect.
    main.classList.remove('is-blurred');
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        header.classList.remove('is-blurred'); // Remove blur effect.
        main.classList.remove('is-blurred');
    }
})










const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const genre = document.getElementById('genre');
const notes = document.getElementById('notes');
const submitBtn = document.getElementById('btn');
const myBtn = document.getElementById('myBtn');



class Book {
    constructor(title, author, pages, genre) {
    this.title = document.getElementById('title'),
    this.author = document.getElementById('author'),
    this.pages = document.getElementById('pages'),
    this.genre = document.getElementById('genre')
    // this.notes = notes
    };
};




let myLibrary = [];
console.log(myLibrary);

class BookInfo {
    constructor(title, author, pages, genre) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.genre = genre
    };
};

// Add new book to library array:
const addBook = function() {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const newBook = new BookInfo(title.value, author.value, pages.value, genre.value);
        if (myLibrary.length > 0) {
            // If duplicate isn't found:
            myLibrary.forEach(book => {
                if (newBook.title != book.title) {
                    myLibrary.push(newBook);
                    alert(`${title.value} has been added to your library.`);
                    document.querySelector('form').reset(); // clear form after submit.
                } else {
                    alert(`${title.value} already exists in your library!`);
                    document.querySelector('form').reset(); // clear form after submit.
                };
            })
        } else {
            myLibrary.push(newBook); // Add first book to library.
            alert(`${title.value} has been added to your library!`);
            document.querySelector('form').reset(); // clear form after submit.
        }
    });
};

addBook();








// If user input title already exists in the library, error occurs:
// iterate through each title element in library.
// check if the user input title matches the title in library.
// if so, then error message occurs:
const checkDuplicate = function() {
    myLibrary.forEach(book => {
        if (title.value == book.title) {
            return true; // Return true if a duplicate exists.
        };
        return false;
    });
}





