//EJS5 prototypes samples

//Constructor BOOK
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//constructor User interface
function UI() {}
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" class="delete">X<a></td>`;

    list.appendChild(row);
}

UI.prototype.showAlert = function (message) { //show
    const div = document.createElement('div');

    div.className = "alert";
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form); //insert alert BFORE

    // Timeout to remove
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

// del book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function () { //while loop instead??
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
//book add
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn); //using constructor

    // Instantiate UI <-----IMPORTANT
    const ui = new UI();

    // validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('fill all fields');
    } else {
        ui.addBookToList(book);
        ui.showAlert('Book Added!');
        ui.clearFields();
    }
    e.preventDefault();
});

// delete event
document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI <--?? would it work?
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed!');

    e.preventDefault();
});