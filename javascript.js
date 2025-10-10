const myLibrary = [];
const buttons = document.querySelectorAll(".btn");
const bookDisplay = document.querySelector(".tbl");

const title = document.querySelector("#book_name");
const author = document.querySelector("#book_author");
const pages = document.querySelector("#page_number");
const read = document.querySelector("#read");

class Book {
    constructor(id, title, author, pages, read) {
        if (!new.target) {
            throw Error("Not NEW");
        }
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    ChangeReadStatus() {
		this.read = !this.read;
		return this.read;
	}
}

function addBookToLibrary(bookToAdd) {
    myLibrary.push(bookToAdd); 
    renderLibrary();
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const action = e.target.dataset.action;

        if (action === "submit") {
            const id = crypto.randomUUID();
            const newBook = new Book(id, title.value, author.value, pages.value, read.checked);
            addBookToLibrary(newBook);
        } else if (action === "remove") {
            removeFromTable();
        }
    });
});

function renderLibrary () {
    let tableBody = document.querySelector("tbody");

    if (!tableBody) {
        const tbody = document.createElement("tbody")
        bookDisplay.appendChild(tbody);
        tableBody = tbody;
    } else {
        tableBody.innerHTML = '';
    }
    
    myLibrary.forEach(book => {
        const newRow = document.createElement("tr");
        

        const columns = [
            {type: 'remove-checkbox', value: ''},
            {type: 'text', value: book.title},
            {type: 'text', value: book.author},
            {type: 'text', value: book.pages},
            {type: 'read-button', value: book.read, id: book.id}
        ];

        columns.forEach(column => {
            const cell = document.createElement('td');

            if (column.type.includes('checkbox')) {
                const checkbox = document.createElement("input");
                checkbox.type = 'checkbox';
                checkbox.setAttribute("data-value", book.id);
                checkbox.classList.add('remove-checkbox');
                cell.appendChild(checkbox);
            } else if (column.type === 'read-button'){
                const readBtn = document.createElement("button");
                readBtn.setAttribute("data-value", column.id);
                readBtn.classList.add('read-status-btn');
                readBtn.innerText = column.value;
                readBtn.addEventListener('click', function() {
                    const bookToUpdate = myLibrary.find(b => b.id === column.id);
                    if (bookToUpdate) {
                        bookToUpdate.changeReadStatus();
                        renderLibrary();
                    }
                });

                cell.appendChild(readBtn);
            } else {
                cell.textContent = column.value
            }

            newRow.appendChild(cell);
        });
        tableBody.appendChild(newRow);
    });
}

function removeFromTable() {
    const currentCheckboxes = document.querySelectorAll('.remove-checkbox:checked');
    
    currentCheckboxes.forEach(checkbox => {
        const bookId = checkbox.dataset.value;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
        }
    });

    renderLibrary();
}
