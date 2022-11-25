const {Sequelize , DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'sample_student_db',
    'root',
    'Xornor@123',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully!');
}).catch((error)=>{
    console.error('Unable to connect to the database:',error);
});

sequelize.query(
    'SELECT * FROM students WHERE student_id = ?',
    {
        replacements: ['3b1a7f1d-f27d-418d-92ca-5d6762ac5145'],
        type: sequelize.QueryTypes.SELECT
    }
).then(result => {
    console.log(result);
}).catch((error)=>{
    console.error('Failed to insert data:' , error);
});