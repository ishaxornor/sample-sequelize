const {Sequelize , Datatypes, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
    'hello_world_db',
    'root',
    'Xornor@123',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully');
}).catch((error)=>{
    console.error('Unable to connect to the database');
});

const Book = sequelize.define("books",{
    title:{
        type:DataTypes.STRING,
        allowNull : false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    release_date : {
        type : DataTypes.DATEONLY,
    },
    subject: {
        type: DataTypes.INTEGER,
    }
});
sequelize.sync().then(()=>{
    console.log('Book table created succesfully !');
}).catch((error)=>{
    console.log('Unable to create table: ' , error);
});