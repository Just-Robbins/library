const myLibrary = [];
const submitBtn = document.querySelector(".btn");
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
    console.log(myLibrary);
}

submitBtn.addEventListener("click", () => {
    const id = crypto.randomUUID();

    const newBook = new Book (id,title.value,author.value,pages.value,read.value);
    addBookToLibrary(newBook);
});


