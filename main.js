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
    const validation = overlayForm.checkValidity();
    const validationReport = overlayForm.reportValidity();
   if(validation == true){
       overlayForm.preventDefault();
   }

    
        // overlay.style.display = 'none';
    
        // const addBookContainer = document.getElementById('add-book');
        // const cardDiv = document.createElement('div');
    
        // addBookContainer.appendChild(cardDiv);
        // cardDiv.classList = 'book-card';
        // cardDiv.innerText = 'New Book';
   
});

overlayRemove.addEventListener('click', () => {
    if(event.target.id == 'overlay-remove'){
        overlay.style.display = 'none';
    }
})

addBookbtn.addEventListener('click', () => {
    overlay.style.display = 'block';
})


