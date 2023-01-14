const books = [
    {
        'title': 'The Wheel Of Time: Eye Of The World',
        'pages': 782,
        'author' : 'Robert Jordan',
        'read': 'yes'
    }
];
const formBtn = document.getElementById('form-btn');

formBtn.addEventListener('click', () => {
    console.log('hello')
});


function on() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
};

// function createBook() {
//     console.log('added')
//     const addBookContainer = document.getElementById('add-book');
//     const cardDiv = document.createElement('div');

//     addBookContainer.appendChild(cardDiv);
//     cardDiv.classList = 'book-card';
//     cardDiv.innerText = 'New Book';
// };