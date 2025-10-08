const myLibrary = [];

// DOM Elements
const bookDisplay = document.querySelector(".tbl");
const bookForm = document.querySelector("#book-form"); // Assuming you have a form element
const addButton = document.querySelector("[data-action='submit']");
const removeButton = document.querySelector("[data-action='remove']");

// Book Constructor
function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw new Error("Book must be called with 'new' keyword");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
    return this.read;
};

// Add book to library
function addBookToLibrary(bookToAdd) {
    myLibrary.push(bookToAdd); 
    renderLibrary();
}

// Remove books from library
function removeFromLibrary() {
    const checkboxes = document.querySelectorAll('.remove-checkbox:checked');
    
    checkboxes.forEach(checkbox => {
        const bookId = checkbox.dataset.bookId;
        const bookIndex = myLibrary.findIndex(book => book.id === bookId);
        
        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
        }
    });

    renderLibrary();
}

// Render the entire library
function renderLibrary() {
    let tableBody = document.querySelector("tbody");

    // Create tbody if it doesn't exist
    if (!tableBody) {
        tableBody = document.createElement("tbody");
        bookDisplay.appendChild(tableBody);
    }
    
    // Clear existing content
    tableBody.innerHTML = '';
    
    // Render each book
    myLibrary.forEach(book => {
        const row = createBookRow(book);
        tableBody.appendChild(row);
    });
}

// Create a table row for a single book
function createBookRow(book) {
    const row = document.createElement("tr");
    
    // Remove checkbox cell
    row.appendChild(createRemoveCheckboxCell(book.id));
    
    // Book info cells
    row.appendChild(createTextCell(book.title));
    row.appendChild(createTextCell(book.author));
    row.appendChild(createTextCell(book.pages));
    
    // Read status button cell
    row.appendChild(createReadStatusCell(book));
    
    return row;
}

// Create remove checkbox cell
function createRemoveCheckboxCell(bookId) {
    const cell = document.createElement('td');
    const checkbox = document.createElement("input");
    
    checkbox.type = 'checkbox';
    checkbox.classList.add('remove-checkbox');
    checkbox.dataset.bookId = bookId;
    
    cell.appendChild(checkbox);
    return cell;
}

// Create text cell
function createTextCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

// Create read status button cell
function createReadStatusCell(book) {
    const cell = document.createElement('td');
    const button = document.createElement("button");
    
    button.classList.add('read-status-btn');
    button.dataset.bookId = book.id;
    button.textContent = book.read ? "Read" : "Not Read";
    
    // Add visual indicator
    button.classList.add(book.read ? 'read' : 'unread');
    
    button.addEventListener('click', handleReadStatusToggle);
    
    cell.appendChild(button);
    return cell;
}

// Handle read status toggle
function handleReadStatusToggle(e) {
    const bookId = e.target.dataset.bookId;
    const book = myLibrary.find(b => b.id === bookId);
    
    if (book) {
        book.toggleReadStatus();
        renderLibrary();
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('book_name');
    const author = formData.get('book_author');
    const pages = formData.get('page_number');
    const read = formData.get('read') === 'on';
    
    // Validate inputs
    if (!title || !author || !pages) {
        alert('Please fill in all fields');
        return;
    }
    
    const newBook = new Book(
        crypto.randomUUID(),
        title,
        author,
        parseInt(pages, 10),
        read
    );
    
    addBookToLibrary(newBook);
    
    // Reset form
    e.target.reset();
}

// Event Listeners
if (bookForm) {
    bookForm.addEventListener('submit', handleFormSubmit);
}

if (addButton && !bookForm) {
    // If using a button instead of form submit
    addButton.addEventListener('click', () => {
        const title = document.querySelector("#book_name").value;
        const author = document.querySelector("#book_author").value;
        const pages = document.querySelector("#page_number").value;
        const read = document.querySelector("#read").checked;
        
        if (!title || !author || !pages) {
            alert('Please fill in all fields');
            return;
        }
        
        const newBook = new Book(
            crypto.randomUUID(),
            title,
            author,
            parseInt(pages, 10),
            read
        );
        
        addBookToLibrary(newBook);
        
        // Reset inputs
        document.querySelector("#book_name").value = '';
        document.querySelector("#book_author").value = '';
        document.querySelector("#page_number").value = '';
        document.querySelector("#read").checked = false;
    });
}

if (removeButton) {
    removeButton.addEventListener('click', removeFromLibrary);
}

// Initial render
renderLibrary();