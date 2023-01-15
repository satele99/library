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
        
        addBookContainer.appendChild(cardDiv);
        cardDiv.classList = 'book-card';
        cardDiv.innerText = title+' '+author+' '+pages;
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


