const header = document.querySelector('.header');






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

})


// When the user clicks on <span> (x), close the modal
span.addEventListener('click', () => {
    modal.style.display = 'none';
    header.classList.remove('is-blurred'); // Remove blur effect.
})

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        header.classList.remove('is-blurred'); // Remove blur effect.
    }
})



































const form = document.getElementById('form');
const button = document.querySelector('button');

let myLibrary = ['The Hobbit', 'Lord of the Rings', 'Harry Potter'];

function Book() {
};

function addBookToLibrary() {
};

// Display book in myLibrary:
const showBook = function() {
    myLibrary.forEach(book => {
        console.log(book);
    });
};

// window.onload = function() {
//     document.getElementById('form').style.display = 'block';
// };


// button.addEventListener('click', () => {
//     if (form.style.display === 'none') {
//         form.style.display = 'block';
//     } else {
//         form.style.display = 'none';
//     }
// });