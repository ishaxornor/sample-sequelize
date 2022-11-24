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

    ///Inserting/Creating a book 

    // Book.create({
    //         title: "Clean Code",
    //         author: "Robert Cecil Martin",
    //         release_date: "2021-12-14",
    //         subject: 3
    //     }).then(res => {
    //         console.log(res)
    //     }).catch((error)=>{
    //         console.error('Failed to create a new record:', error);
    //     });

    //     Book.create({
    //         title: "help",
    //         author: "Robert Hood",
    //         release_date: "2021-12-14",
    //         subject: 3
    //     }).then(res => {
    //         console.log(res)
    //     }).catch((error)=>{
    //         console.error('Failed to create a new record:', error);
    //     });

    //------------------------------------------------------------------------------------------------//

    //Selecting all records / findall book

    // Book.findAll().then(res =>{
    //     console.log(res)
    // }).catch((error) =>{
    //     console.log('Failed to retrieve data: ' , error);
    // });

    //------------------------------------------------------------------------------------------------//

    //Selecting with the where Clause
    // Book.findOne({
    //     where: {
    //         id:"4"
    //     }
    // }).then(res =>{
    //     console.log(res)
    // }).catch((error) => {
    //     console.log.error('Failed to retrieve data: ',error);
    // });

    //------------------------------------------------------------------------------------------------//

    //Delete a record
    Book.destroy({
        where:{
            id:2
        }
    }).then(()=>{
        console.log("Succesfully deleted record.")
    }).catch((error)=>{
        console.error('Failed to delete record: ' , error);
    });

}).catch((error)=>{
    console.log('Unable to create table: ' , error);
});