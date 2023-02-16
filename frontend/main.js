
const serverApi = 'http://localhost:8000';
const books = [];
const users = [];
const overlay = document.getElementById('overlay');
const overlay1 = document.getElementById('overlay1');
const overlay2 = document.getElementById('overlay2');
const overlayForm = document.getElementById("overlay-form");
const overlayForm1 = document.getElementById("overlay-form1");
const overlayForm2 = document.getElementById("overlay-form2");
const overlayRemove = document.getElementById('overlay-remove');
const overlayRemove1 = document.getElementById('overlay-remove1');
const addBookbtn = document.getElementById('add-book-btn');
const formBtn = document.getElementById('form-btn');
const formBtnLog = document.getElementById('form-btn-log');
const formBtnSign = document.getElementById('form-btn-sign');
const logIn = document.getElementById('log-in-btn');
const signUp = document.getElementById('sign-up-btn');
const logOut = document.getElementById('log-out-btn');
let displayedUser = document.getElementById('logged-in-user');
let addBookContainer = document.getElementById('add-book');


let bookCardId = 0;
let readBtnId = 0;
let removeBtnId = 0;
let titleH5Id = 0;

function Book(title, author, page, read){
    this.title = title
    this.pages = page
    this.author = author
    this.read = read
};

function User(username, password){
    this.username = username;
    this.password = password;
}


document.addEventListener('click', (event) => {
    const target = event.target;
    if(target.id == 'add-book-btn'){
        overlay.style.display = 'block';
    }else if(target.id == 'log-in-btn' || target == 'reveal-log-in'){
        event.preventDefault();
        overlay2.style.display = 'none';
        overlay1.style.display = 'block';
    }else if(target.id == 'sign-up-btn' || target == 'reveal-sign-up'){
        event.preventDefault();
        overlay1.style.display = 'none';
        overlay2.style.display = 'block';
    } 

    if(target.id == 'form-btn-log'){
        event.preventDefault();
        const validation1 = overlayForm1.checkValidity();
        const validationReport1 = overlayForm1.reportValidity();
        const userLogIn = document.getElementById('username').value;
        const passLogIn = document.getElementById('password').value;
        addBookContainer = document.getElementById('add-book');
        if(validationReport1 == true){
            overlayForm1.reset();
            overlay1.style.display = 'none';
            getExistingUser(userLogIn, passLogIn,signUp, logIn, logOut,  displayedUser, addBookContainer);
        }
    }
    if(target.id == 'form-btn-sign'){
        event.preventDefault();
        const validation2 = overlayForm2.checkValidity();
        const validationReport2 = overlayForm2.reportValidity();
        const usernameCreation = document.getElementById('create_user').value;
        const userPass = document.getElementById('pass')
        const userPassValid = document.getElementById('pass_validation')
        const userPassValidText = document.getElementById('pass_validation').value;
        if(validationReport2 == true){
            const newUser = new User(usernameCreation, userPass.value);
            users.push(newUser);
            console.log(users);
            overlayForm2.reset();
            overlay2.style.display = 'none';
            createUserAccount(newUser); // post request to create new user in backend.
        }
    }

    if(target.id == 'overlay-remove'){
        overlay.style.display = 'none';
    }else if(target.id == 'overlay-remove1'){
        overlay1.style.display = 'none';
    }else if(target.id == 'overlay-remove2'){
        overlay2.style.display = 'none';
    } 

    if(target.id == 'log-out-btn'){
        event.preventDefault();
        signUp.style.display = 'block'
        logIn.style.display = 'block'
        logOut.style.display = 'none'
        displayedUser.innerText = '';
        addBookContainer.innerHTML = '';
    }
}) 

formBtn.addEventListener('click', (event) => {
    const validation = overlayForm.checkValidity();
    const validationReport = overlayForm.reportValidity();
    event.preventDefault();
    if(displayedUser.innerText != ''){
        if(validation == true){
            overlay.style.display = 'none';
            displayedUser = document.getElementById('logged-in-user');
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const readRadio = document.querySelector('input[name="read"]:checked').value;
            addBookContainer = document.getElementById('add-book');
            const cardDiv = document.createElement('div');
            const cardDiv2 = document.createElement('div');
            const cardDiv3 = document.createElement('div');
            const titleH5 = document.createElement('h5');
            const authorH5 = document.createElement('h5');
            const pagesH5 = document.createElement('h5');
            const removeBtn = document.createElement('button');
            const readBtn = document.createElement('button');
            
            const newBook = new Book(title, author, pages, readRadio);
            if(newBook.read == 'Yes'){
                newBook.read = 'true';
            }else if(newBook.read == 'No'){
                newBook.read = 'false';
            }
            addNewBook(newBook, displayedUser.innerText);
            books.push(newBook);
            console.log(newBook);
            addBookContainer.appendChild(cardDiv);
            cardDiv.classList = 'book-card';
            cardDiv.id = bookCardId++ + '.2';
            cardDiv.appendChild(cardDiv2);
            cardDiv.appendChild(cardDiv3);
            cardDiv2.classList = 'book-card1';
            cardDiv3.classList = 'book-card2';
            cardDiv2.appendChild(titleH5);
            cardDiv2.appendChild(authorH5);
            cardDiv2.appendChild(pagesH5);
            titleH5.innerText = title;
            titleH5.id = titleH5Id++ + '.3';
            authorH5.innerText = author;
            pagesH5.innerText = pages+' '+'pages';
            cardDiv3.appendChild(readBtn);
            cardDiv3.appendChild(removeBtn);
            if(readRadio == 'Yes'){
                let title = newBook.title
                let user = displayedUser.innerText
                readBtn.classList = 'btn btn-success';
                readBtn.innerText = 'Read';
                readBtn.id = readBtnId++ + '.1';
                readBtn.setAttribute('onclick', `readButton(`+readBtn.id+`,`+`"`+title+`"`+`,`+`"`+user+`"`+`,`+`"true")`);
            }else if(readRadio == 'No'){
                let title = newBook.title
                let user = displayedUser.innerText;
                readBtn.classList = 'btn btn-outline-success';
                readBtn.innerText = 'Read';
                readBtn.id = readBtnId++ + '.1';
                readBtn.setAttribute('onclick', `readButton(`+readBtn.id+`,`+`"`+title+`"`+`,`+`"`+user+`"`+`,`+`"false")`);
            }
            let user = displayedUser.innerText;
            removeBtn.classList = "btn btn-outline-success";
            removeBtn.innerText = 'Remove';
            removeBtn.id = removeBtnId++ + '.2';
            removeBtn.setAttribute('onclick', `removeBook(`+removeBtn.id+`,`+`"`+title+`"`+`,`+`"`+user+`")`);
            overlayForm.reset();
        };
    }else{
        overlay.style.display = 'none';
        overlayForm.reset();
        alert('Please Log In or Create An Account First');
    }
}); 

function removeBook(id,bookName,username){
    const removingDiv = document.getElementById(id);
    axios.delete(serverApi+`/delete/${bookName}/${username}`).then((response)=>{
        console.log(response.data);
        removingDiv.remove();
    });
};

function readButton(id, bookName, username, condition){
    console.log('hello');
    const readButtonCard = document.getElementById(`${id}`);
    console.log(readButtonCard.id)
    if(readButtonCard.className == 'btn btn-outline-success'){
        readButtonCard.classList = 'btn btn-success';
    }else if(readButtonCard.className == 'btn btn-success'){
        readButtonCard.classList = 'btn btn-outline-success';
    }
    axios.put(serverApi+`/update/${bookName}/${username}/${condition}`).then((response)=>{
        if(response.data == 'Read Value updated'){
            // readButtonCard.removeAttribute('onclick');
            // console.log(`${id}`);
            readButtonCard.setAttribute('onclick', `readButton(`+id+`,`+`"`+bookName+`"`+`,`+`"`+username+`"`+`,`+`"false")`);
            console.log('Read Value updated - condition = false');
        }else if(response.data == 'Read Value updated-2'){
            // readButtonCard.removeAttribute('onclick');
            // console.log(`${id}`);
            readButtonCard.setAttribute('onclick', `readButton(`+id+`,`+`"`+bookName+`"`+`,`+`"`+username+`"`+`,`+`"true")`);
            console.log('Read Value updated - condition = true');
        }
    }).catch(error => {
        console.log(error);
    });
}; 

function createUserAccount(createdUser) {
    axios.post(serverApi+'/user', createdUser).then(response => {
        if(response.data == 'User successfully created'){
            alert('User successfully created');
        }else if(response.data == 'User exists already'){
            alert('Username exists already');
        }
    })
};

function getExistingUser(username, password, signUp, logIn, logOut, displayedUser, container){
    axios.get(serverApi+`/login/${username}/${password}`).then(response => {
        if(response.data == `User ${username} Exists`){
            signUp.style.display = 'none'
            logIn.style.display = 'none'
            logOut.style.display = 'block' 
            displayedUser.innerText = `${username}`;
            axios.get(serverApi+`/load-login/${username}/${password}`).then(response =>{
                console.log(response.data);
                renderBooks(response.data, container, displayedUser);
            })
        }
    }).catch(error => {
        if(error){
            alert('Login failed. Check your login credentials or create an account.');
        }
    })
};

function addNewBook(createdBook, username){
    axios.post(serverApi+`/books/${username}`, createdBook).then(response => {
        if(response.data == true){
            // alert(`${username} Book added successfully`);
        }
    });
}; 

function renderBooks(response, container, displayedUser){
    for(i=0;i<response.length;i++){
        let addBookContainer = container;
        const cardDiv = document.createElement('div');
        const cardDiv2 = document.createElement('div');
        const cardDiv3 = document.createElement('div');
        const titleH5 = document.createElement('h5');
        const authorH5 = document.createElement('h5');
        const pagesH5 = document.createElement('h5');
        const removeBtn = document.createElement('button');
        const readBtn = document.createElement('button');

        addBookContainer.appendChild(cardDiv);
        cardDiv.classList = 'book-card';
        cardDiv.id = bookCardId++ + '.2';
        cardDiv.appendChild(cardDiv2);
        cardDiv.appendChild(cardDiv3);
        cardDiv2.classList = 'book-card1';
        cardDiv3.classList = 'book-card2';
        cardDiv2.appendChild(titleH5);
        cardDiv2.appendChild(authorH5);
        cardDiv2.appendChild(pagesH5);
        titleH5.innerText = response[i].title;
        titleH5.id = titleH5Id++ + '.3';
        authorH5.innerText = response[i].author;
        pagesH5.innerText = response[i].pages+' '+'pages';
        cardDiv3.appendChild(readBtn);
        cardDiv3.appendChild(removeBtn);
            if(response[i].read == 'true'){
                let title = response[i].title
                let user = displayedUser.innerText
                readBtn.classList = 'btn btn-success';
                readBtn.innerText = 'Read';
                readBtn.id = readBtnId++ + '.1';
                readBtn.setAttribute('onclick', `readButton(`+readBtn.id+`,`+`"`+title+`"`+`,`+`"`+user+`"`+`,`+`"true")`);
            }else if(response[i].read == 'false'){
                let title = response[i].title
                let user = displayedUser.innerText;
                readBtn.classList = 'btn btn-outline-success';
                readBtn.innerText = 'Read';
                readBtn.id = readBtnId++ + '.1';
                readBtn.setAttribute('onclick', `readButton(`+readBtn.id+`,`+`"`+title+`"`+`,`+`"`+user+`"`+`,`+`"false")`);
            }
            let user = displayedUser.innerText;
            removeBtn.classList = "btn btn-outline-success";
            removeBtn.innerText = 'Remove';
            removeBtn.id = removeBtnId++ + '.2';
            removeBtn.setAttribute('onclick', `removeBook(`+removeBtn.id+`,`+`"`+title+`"`+`,`+`"`+user+`")`);
    }

}



