const books = [
    {
        'title': 'The Wheel Of Time: Eye Of The World',
        'pages': 782,
        'author' : 'Robert Jordan',
        'read': 'yes'
    }
];
const overlay = document.getElementById('overlay');
const overlayForm = document.getElementById("overlay-form");
const overlayRemove = document.getElementById('overlay-remove');
const addBookbtn = document.getElementById('add-book-btn');
const formBtn = document.getElementById('form-btn');

const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const pages = document.getElementById('pages').value;
const read = document.getElementById('read');
let btnId = 0;

formBtn.addEventListener('click', (event) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read');
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

        addBookContainer.appendChild(cardDiv);
        cardDiv.classList = 'book-card';
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
        cardDiv3.appendChild(removeBtn);
        removeBtn.classList = "btn btn-outline-success";
        removeBtn.innerText = 'Remove';
        removeBtn.id = btnId++;
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


