const port = 8000;
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const server = http.createServer(app);
const {Sequelize, DataTypes, where} = require('sequelize');
const sequelizeConnection = new Sequelize('postgres://amirhali:satele@localhost:4000/amirhali', {
    define:{
        schema: 'dc_fullstack_library'
    }
});

app.use(express.json());

const User = sequelizeConnection.define('users', {
    username:{
        type: DataTypes.STRING,
        field: 'username',
        primaryKey: true
    },
    password:{
        type: DataTypes.STRING,
        field: 'password'
    }
}, {
    timestamps: false
});

const Book = sequelizeConnection.define('books', {
    title:{
        type: DataTypes.STRING,
        field: 'book_title'
    },
    author:{
        type: DataTypes.STRING,
        field: 'author_name'
    },
    pages:{
        type: DataTypes.INTEGER,
        field: 'page_count'
    },
    read:{
        type: DataTypes.BOOLEAN,
        field: 'read_already'
    }
}, {
    timestamps: false
});

User.hasMany(Book, {as: 'Book'});
Book.belongsTo(User);

app.listen(port, '127.0.0.1', ()=> {
    console.log(`Server started at port ${port}`);
});
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

sequelizeConnection.authenticate().then(()=> {
    console.log('Database connected successfully');
});

sequelizeConnection.sync().then(()=>{
    console.log('tables created');
});


app.get('/login/:username/:password', (req, res)=> {
    const getUser = req.params['username'];
    const getPass = req.params['password'];
    User.findOne({
        where: {username: getUser, 
                password: getPass}
    }).then(user => {
        if(user){
            res.status(200).send(`User ${getUser} Exists`);
        }else{
            console.log('User Not Found');
            res.status(302).send('User Not Found')
        }
    })
})


app.post('/user', (req, res)=> {
    const addUser = req.body;
    User.findByPk(addUser.username).then((user)=>{
        if(user){
            return res.send('User exists already');
        }else if (!user){
            User.create({
                username: `${addUser.username}`,
                password: `${addUser.password}`
            }) 
            return res.status(201).send('User successfully created');
        }
    })
})

let foundUserData, foundBookData;
app.post('/books/:username', (req, res, next)=> {
    const addBook = req.body;
    const user = req.params['username'];
    sequelizeConnection.sync().then(()=> {
        Book.create({
            title: `${addBook.title}`,
            author: `${addBook.author}`,
            pages: `${addBook.pages}`,
            read: `${addBook.read}`
        }); 
        return User.findOne({where:{username: `${user}`}})
    }).then((data)=>{
        foundUserData = data;
        return Book.findOne({where:{title: `${addBook.title}`}});
    }).then((data)=>{
        foundBookData = data;
        foundUserData.addBook(foundBookData);
    }).catch(error => {
        console.log(error);
        finished = false
    });
    res.status(201).send(true);
    next();
}); 

app.put(`/update/:bookname/:username`, (req, res) => {
    const bookName = req.params['bookname'];
    const username = req.params['username'];

})

