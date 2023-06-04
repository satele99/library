const {Sequelize, DataTypes, where} = require('sequelize');
const sequelizeConnection = new Sequelize('postgres://postgres:satele99@localhost:5432/amirhali', {
    define:{
        schema: 'dc_fullstack_library'
    }
});

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

sequelizeConnection.authenticate().then(()=> {
    console.log('Database connected successfully');
});

sequelizeConnection.sync().then(()=>{
    console.log('tables created');
});