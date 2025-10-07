const myLibrary = [];
const buttons = document.querySelectorAll(".btn");
const bookDisplay = document.querySelector(".tbl");

const title = document.querySelector("#book_name");
const author = document.querySelector("#book_author");
const pages = document.querySelector("#page_number");
const read = document.querySelector("#read");

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("Not NEW");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(bookToAdd) {
    myLibrary.push(bookToAdd); 
    updateTable();
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const action = e.target.dataset.action;

        if (action === "submit") {
            const id = crypto.randomUUID();
            const newBook = new Book(id, title.value, author.value, pages.value, read.value);
            addBookToLibrary(newBook);
        } else if (action === "remove") {
            removeFromTable();
        }
    });
});

function updateTable () {
    const book = myLibrary[myLibrary.length -1];
    const newRow = document.createElement("tr");
    

    const columns = [
        {type: 'checkbox', value: ''},
        {type: 'text', value: book.title},
        {type: 'text', value: book.author},
        {type: 'text', value: book.pages},
        {type: 'text', value: book.read}
    ];

    columns.forEach(column => {
        const cell = document.createElement('td');

        if (column.type === 'checkbox') {
            const checkbox = document.createElement("input");
            checkbox.type = 'checkbox';
            checkbox.setAttribute("data-value", book.id);
            checkbox.classList.add('remove-checkbox');
            cell.appendChild(checkbox);
        } else {
            cell.textContent = column.value
        }

        newRow.appendChild(cell);
    });
    bookDisplay.appendChild(newRow);
}

function removeFromTable() {
    const currentCheckboxes = document.querySelectorAll('.remove-checkbox');
    
    currentCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const bookId = checkbox.dataset.value;
            
            const bookIndex = myLibrary.findIndex(book => book.id === bookId);
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
            }

            const row = checkbox.closest('tr');
            if (row) {
                row.remove();
            }
            
            console.log(`Removed book with ID: ${bookId}`);
        }
    });
}