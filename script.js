const header = document.querySelector('.header');
const main = document.querySelector('.main');

const bookLibrary = document.querySelector('.book-library');




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
});










// INPUT FORM:
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const genre = document.getElementById('genre');
const notes = document.getElementById('notes');
const submitBtn = document.getElementById('btn');
const myBtn = document.getElementById('myBtn');

// class Book {
//     constructor(title, author, pages, genre) {
//     this.title = document.getElementById('title'),
//     this.author = document.getElementById('author'),
//     this.pages = document.getElementById('pages'),
//     this.genre = document.getElementById('genre')
//     // this.notes = notes
//     };
// };

let myLibrary = [
    // {
    //     title: 'Harry Potter',
    //     author: 'JK Rowling',
    //     pages: 300,
    //     genre: 'Magic',
    //     notes: 'This is an example notes blah blah blah.'
    // },
    // {
    //     title: 'The Hobbit',
    //     author: 'Not sure',
    //     pages: 300,
    //     genre: 'Magic',
    //     notes: 'This is an example notes blah blah blah.'
    // }
];



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
        if (myLibrary.length === 0) {
            myLibrary.push(newBook); // Add first book to library.
            alert(`${title.value} has been added to your library!`);
            document.querySelector('form').reset(); // clear form after submit.
        } else {
            if (findDuplicate(newBook.title) === true) { // Dup exists.
                alert(`${title.value} already exists in your library.`);
                document.querySelector('form').reset(); // clear form after submit.
            } else {
                myLibrary.push(newBook);
                alert(`${title.value} has been added to your library.`);
                document.querySelector('form').reset(); // clear form after submit.
            };
        };
        createBookCards();
    });
};
addBook();


function findDuplicate(book) {
    for (let i=0; i<myLibrary.length; i++) {
        if (myLibrary[i].title === book) {
            return true;
        };
    };
    return false;
};






const testButton = document.getElementById('testButton');



// Iterate through library and create a "book card" for each book object inside the array:
function createBookCards() {
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

    myLibrary.forEach(book => {
        divBooks.classList.add('books');
        bookLibrary.appendChild(divBooks);
    
        divBookHeader.classList.add('book-header');
        divBooks.append(divBookHeader);
        
        // Book Title:
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
    });
    
};

















// Remove "book card" if the X is pressed:
// const cardSpan = document.querySelector('.book-card-close');

// if (myLibrary.length > 0) {
//     cardSpan.addEventListener('click', (e) => {
//         console.log(e.target);
//     });
// };    





createBookCards();