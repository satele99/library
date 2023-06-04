const port = 8000;
const http = require('http');
const express = require('express');
// const uuid = require('uuid');
const app = express();
// const uniqueId = uuid();
const cors = require('cors');
const server = http.createServer(app);
const {Sequelize, DataTypes, where} = require('sequelize');
const sequelizeConnection = new Sequelize('postgres://amirhali:c09VwNBjfbij2m3nugIRQbxL6e78HHhe@dpg-chue4v7dvk4olip1130g-a:5432/postgres99', {
    define:{
        schema: 'dc_fullstack_library'
    }
});

app.use(express.json());
sequelizeConnection.createSchema('dc_fullstack_library')
const User = sequelizeConnection.define('users', {
    username:{
        type: DataTypes.STRING,
        field: 'username'
    },
    password:{
        type: DataTypes.STRING,
        field: 'password'
    }
}, {
    timestamps: false
});

const Movie = sequelizeConnection.define('movie', {
    title:{
        type: DataTypes.STRING,
        field: 'movie_title'
    },
    year:{
        type: DataTypes.INTEGER,
        field: 'year_of_release'
    },
    watched:{
        type: DataTypes.STRING,
        field: 'watch_status'
    },
    uuid:{
        type: DataTypes.UUID,
        field: 'unique_id',
        primaryKey: true
    }
}, {
    timestamps: false
});

const Music = sequelizeConnection.define('music', {
    title:{
        type: DataTypes.STRING,
        field: 'song_title'
    },
    artist:{
        type: DataTypes.STRING,
        field: 'artist'
    },
    favorite:{
        type: DataTypes.STRING,
        field: 'favorite'
    },
    uuid:{
        type: DataTypes.UUID,
        field: 'unique_id', 
        primaryKey: true
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
        type: DataTypes.STRING,
        field: 'read_already'

    }, 
    uuid:{
        type: DataTypes.UUID,
        field: 'unique_id',
        primaryKey: true
    }
}, {
    timestamps: false
});

User.hasMany(Book);
User.hasMany(Movie);
User.hasMany(Music);
Book.belongsTo(User, {foreignKey:{allowNull: false}});
Movie.belongsTo(User, {foreignKey:{allowNull: false}});
Music.belongsTo(User, {foreignKey:{allowNull: false}});

app.listen(port, '127.0.0.1', ()=> {
    console.log(`Server started at port ${port}`);
});
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

sequelizeConnection.authenticate().then(()=> {
    console.log('Database connected successfully');
});

sequelizeConnection.sync().then(()=>{
    console.log('tables created');
});

app.get('/load/:username/:password', (req, res) =>{
    const loggedUser = req.params['username'];
    const loggedPw = req.params['password'];
    let foundUser
    sequelizeConnection.sync().then(()=> {
        return User.findOne({where:{username: loggedUser, password: loggedPw}})
    }).then((found)=>{
        foundUser = found.dataValues.id;
        return Book.findAll({where:{userId: foundUser}})
    }).then((books)=>{
        if(books){
            res.send(books);
        }else{
            res.send('None - user needs to add books');
        }
    })
});
app.get('/music-load/:username/:password', (req, res) =>{
    const loggedUser = req.params['username'];
    const loggedPw = req.params['password'];
    let foundUser
    sequelizeConnection.sync().then(()=> {
        return User.findOne({where:{username: loggedUser, password: loggedPw}})
    }).then((found)=>{
        foundUser = found.dataValues.id;
        return Music.findAll({where:{userId: foundUser}})
    }).then((books)=>{
        if(books){
            res.send(books);
        }else{
            res.send('None - user needs to add books');
        }
    })
});
app.get('/movie-load/:username/:password', (req, res) =>{
    const loggedUser = req.params['username'];
    const loggedPw = req.params['password'];
    let foundUser
    sequelizeConnection.sync().then(()=> {
        return User.findOne({where:{username: loggedUser, password: loggedPw}})
    }).then((found)=>{
        foundUser = found.dataValues.id;
        return Movie.findAll({where:{userId: foundUser}})
    }).then((books)=>{
        if(books){
            res.send(books);
        }else{
            res.send('None - user needs to add books');
        }
    })
});

app.get('/login/:username/:password', (req, res)=> {
    const getUser = req.params['username'];
    const getPass = req.params['password'];
    User.findOne({
        where: {username: getUser, 
                password: getPass}
    }).then(user => {
        if(user){
            res.status(200).send(user);
        }else{
            res.status(302).send('User Not Found')
        }
    })
})


app.post('/user', (req, res)=> {
    const addUser = req.body;
    User.findOne({where:{username: addUser.username}}).then((user)=>{
        if(user){
            return res.send('User exists already');
        }else if (!user){
            User.create({
                username: `${addUser.username}`,
                password: `${addUser.password}`
            }); 
            return res.status(201).send('User successfully created');
        };
    })
})

let foundUserData, foundBookData;
app.post('/books/:username', (req, res)=> {
    const addBook = req.body;
    const user = req.params['username'];
    sequelizeConnection.sync().then(()=> {
        Book.create({
            title: `${addBook.title}`,
            author: `${addBook.author}`,
            pages: `${addBook.pages}`,
            read: `${addBook.read}`,
            uuid: `${addBook.uuid}`
        }); 
        return User.findOne({where:{username: `${user}`}});
    }).then((data)=>{
        res.status(201);
        foundUserData = data;
        return Book.findAll({where:{uuid: addBook.uuid}});
    }).then((data)=>{
        foundBookData = data;
        if(foundBookData == null){
            Book.destroy({where:{uuid: addBook.uuid}});
            res.status(409).send('Failed to find book.');
        }else{
            foundUserData.addBook(foundBookData);
            res.status(201).send(true);
        }
    }).catch(error => {
        res.status(501).send(error);
        console.log(error)
    });
});
let foundMusicData;
app.post('/music/:username', (req, res)=> {
    const addSong = req.body;
    const user = req.params['username'];
    sequelizeConnection.sync().then(()=> {
        Music.create({
            title: `${addSong.title}`,
            artist: `${addSong.artist}`,
            favorite: `${addSong.favorite}`,
            uuid: `${addSong.uuid}`
        }); 
        return User.findOne({where:{username: `${user}`}});
    }).then((data)=>{
        res.status(201);
        foundUserData = data;
        return Music.findByPk(addSong.uuid);
    }).then((data)=>{
        foundMusicData = data;
        if(foundMusicData){
            foundUserData.addMusic(foundMusicData);
            res.status(201).send(true);
        }
    }).catch(error => {
        res.status(273).send(error)
    });
}); 
app.post('/movie/:username', (req, res)=> {
    const addMovie = req.body;
    const user = req.params['username'];
    let foundMovieData
    sequelizeConnection.sync().then(()=> {
        Movie.create({
            title: `${addMovie.title}`,
            year: `${addMovie.year}`,
            watched: `${addMovie.watched}`,
            uuid: `${addMovie.uuid}`
        }); 
        return User.findOne({where:{username: `${user}`}})
    }).then((data)=>{
        res.status(201);
        foundUserData = data;
        return Movie.findByPk(addMovie.uuid);
    }).then((data)=>{
        foundMovieData = data;
        if(foundMovieData){
            foundUserData.addMovie(foundMovieData);
            res.status(201).send(true);
        }
    }).catch(error => {
        res.status(501).send(error)
    });
});

app.put(`/update/:book/:username/:condition`, (req, res) => {
    const bookName = req.params['book'];
    const username1 = req.params['username']; 
    const condition = req.params['condition'];

    let putBook, putUser
    sequelizeConnection.sync().then(()=> {
        return Book.findOne({where: {title: bookName}});
    }).then((data) => {
        putBook = data;
        return User.findOne({where: {username: username1}});
    }).then((data)=> {
        putUser = data;
        if(condition == 'true'){
            Book.update({read: 'false'}, {where: {
                uuid: putBook.dataValues.uuid
            }}).then(()=>{ return res.send('Read Value updated');});
        }else if (condition == 'false') {
            Book.update({read: 'true'}, {where: {
                uuid: putBook.dataValues.uuid
            }}).then(()=>{ return res.send('Read Value updated-2');});
        };
    }).catch(error => {
        res.status(404).send(error);
    })
});
app.put(`/update-music/:song/:username/:condition`, (req, res) => {
    const songName = req.params['song'];
    const username1 = req.params['username']; 
    const condition = req.params['condition'];

    let putBook, putUser
    sequelizeConnection.sync().then(()=> {
        return Music.findOne({where: {title: songName}});
    }).then((data) => {
        putBook = data;
        return User.findOne({where: {username: username1}});
    }).then((data)=> {
        putUser = data;
        if(condition == 'true'){
            Music.update({favorite: 'false'}, {where: {
                uuid: putBook.dataValues.uuid
            }}).then(()=>{ return res.send('Read Value updated');});
        }else if (condition == 'false') {
            Music.update({favorite: 'true'}, {where: {
                uuid: putBook.dataValues.uuid
            }}).then(()=>{ return res.send('Read Value updated-2');});
        };
    }).catch(error => {
        res.status(404).send(error);
    })
});
app.put(`/update-movie/:movie/:username/:condition`, (req, res) => {
    const movieName = req.params['movie'];
    const username1 = req.params['username']; 
    const condition = req.params['condition'];

    let putBook, putUser
    sequelizeConnection.sync().then(()=> {
        return Movie.findOne({where: {title: movieName}});
    }).then((data) => {
        putBook = data;
        return User.findOne({where: {username: username1}});
    }).then((data)=> {
        putUser = data;
        if(condition == 'true'){
            Movie.update({watched: 'false'}, {where: {
                uuid: putBook.dataValues.uuid
            }}).then(()=>{ return res.send('Read Value updated');});
        }else if (condition == 'false') {
            Movie.update({watched: 'true'}, {where: {
                uuid: putBook.dataValues.uuid
            }}).then(()=>{ return res.send('Read Value updated-2');});
        };
    }).catch(error => {
        res.status(404).send(error);
    })
});
let deleteBook, deleteUser
app.delete('/delete/:book/:username', (req, res)=> {
    const book = req.params['book'];
    const username = req.params['username'];

    sequelizeConnection.sync().then(()=>{
        return Book.findOne({where:{title:book}})
    }).then((found)=>{
        deleteBook = found
        return User.findOne({where:{username: username}})
    }).then((foundUser)=>{
        deleteUser = foundUser
        Book.destroy({where:{uuid: deleteBook.dataValues.uuid}}).then(()=>{
            res.send('Delete Successful');
        })
    }).catch(error=>{
        res.status(404).send(error);
    });
});
app.delete('/delete-music/:song/:username', (req, res)=> {
    const song = req.params['song'];
    const username = req.params['username'];

    sequelizeConnection.sync().then(()=>{
        return Music.findOne({where:{title:song}})
    }).then((found)=>{
        deleteBook = found
        return User.findOne({where:{username: username}})
    }).then((foundUser)=>{
        deleteUser = foundUser
        Music.destroy({where:{uuid: deleteBook.dataValues.uuid}}).then(()=>{
            res.send('Delete Successful');
        })
    }).catch(error=>{
        res.status(404).send(error);
    });
});
app.delete('/delete-movie/:movie/:username', (req, res)=> {
    const movie = req.params['movie'];
    const username = req.params['username'];

    sequelizeConnection.sync().then(()=>{
        return Movie.findOne({where:{title:movie}})
    }).then((found)=>{
        deleteBook = found
        return User.findOne({where:{username: username}})
    }).then((foundUser)=>{
        deleteUser = foundUser
        Movie.destroy({where:{uuid: deleteBook.dataValues.uuid}}).then(()=>{
            res.send('Delete Successful');
        })
    }).catch(error=>{
        res.status(404).send(error);
    });
});

