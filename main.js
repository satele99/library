const books = [];
const overlay = document.getElementById('overlay');
const overlayForm = document.getElementById("overlay-form");
const overlayRemove = document.getElementById('overlay-remove');
const addBookbtn = document.getElementById('add-book-btn');
const formBtn = document.getElementById('form-btn');
let bookCardId = 0;
let readBtnId = 0;
let removeBtnId = 0;

function Book(title, author, page, read){
    this.title = title
    this.pages = page
    this.author = author
    this.read = read
};



formBtn.addEventListener('click', (event) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readRadio = document.querySelector('input[name="read"]:checked').value;
    const validation = overlayForm.checkValidity();
    const validationReport = overlayForm.reportValidity();
    event.preventDefault();

    if(validation == true){
        overlay.style.display = 'none';
        const addBookContainer = document.getElementById('add-book');
        const cardDiv = document.createElement('div');
        const cardDiv2 = document.createElement('div');
        const cardDiv3 = document.createElement('div');
        const titleH5 = document.createElement('h5');
        const authorH5 = document.createElement('h5');
        const pagesH5 = document.createElement('h5');
        const removeBtn = document.createElement('button');
        const readBtn = document.createElement('button');

        const newBook = new Book(title, author, pages, readRadio);
        books.push(newBook);

        addBookContainer.appendChild(cardDiv);
        cardDiv.classList = 'book-card';
        cardDiv.id = bookCardId++;
        cardDiv.appendChild(cardDiv2);
        cardDiv.appendChild(cardDiv3);
        cardDiv2.classList = 'book-card1';
        cardDiv3.classList = 'book-card2';
        cardDiv2.appendChild(titleH5);
        cardDiv2.appendChild(authorH5);
        cardDiv2.appendChild(pagesH5);
        titleH5.innerText = title;
        authorH5.innerText = author;
        pagesH5.innerText = pages+' '+'pages';
        cardDiv3.appendChild(readBtn);
        cardDiv3.appendChild(removeBtn);
        if(readRadio == 'Yes'){
            readBtn.classList = 'btn btn-success';
            readBtn.innerText = 'Read';
            readBtn.id = readBtnId++;
        }else if(readRadio == 'No'){
            readBtn.classList = 'btn btn-outline-success';
            readBtn.innerText = 'Read';
            readBtn.id = readBtnId++;
        }
        removeBtn.classList = "btn btn-outline-success";
        removeBtn.innerText = 'Remove';
        removeBtn.id = removeBtnId++;
        removeBtn.setAttribute('onclick', 'removeBook('+removeBtn.id+')');
        overlayForm.reset();
    };
});

overlayRemove.addEventListener('click', () => {
    if(event.target.id == 'overlay-remove'){
        overlay.style.display = 'none';
    }
})

addBookbtn.addEventListener('click', () => {
    overlay.style.display = 'block';
})

function removeBook(id){
    const removingDiv = document.getElementById(id);
    removingDiv.remove();
}

