const express = require('express');
const app = express();

// const db = mysql.createConnection({
//     user:'root',
//     host:'localhost',
//     password:'Xornor@123',
//     database:'practiceSequelize'
// });

const db = require('./models');

const { User } = require('./models');

app.get("/select", (req, res) => {
    // User.findAll({where: {firstName: "John"}})
    User.findAll()
        .then((users) => {
            res.send(users);
        }).catch((err) => {
            console.log(err);
        });


});

app.get("/insert", (req, res) => {
    User.create({
        firstName: "John",
        age: 19,
    }).catch((err) => {
        if (err) {
            console.log(err);
        }
    });

    res.send("insert");
});

app.get("/delete", (req, res) => {
    User.destroy({ where: { id: 5 } });
    res.send("delete");
});


db.sequelize.sync().then((req) => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})

