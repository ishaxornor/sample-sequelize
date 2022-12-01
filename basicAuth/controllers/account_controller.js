var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var session = require('express-session');
var models = require('../models');
var Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

var accountRoutes = express.Router();

accountRoutes.get('/login' , function(req,res){
    res.render('account/login');
});

accountRoutes.get('/register' , function(req,res){
    res.render('account/register' , {errors : ""});
});

//register
accountRoutes.post('/register',function(req,res){
    var matched_users_promise = models.User.findAll({
        where: Sequelize.or(
            {username : req.body.username},
            {email: req.body.email}
        )
    });

    matched_users_promise.then(function(users){
        if(users.length ==0){
            const passwordHash = bcrypt.hashSync(req.body.password,10);
            models.User.create({
                username: req.body.username,
                email: req.body.email,
                password: passwordHash
            }).then(function(){
                let newSession = req.session;
                newSession.email = req.body.email;
                res.redirect('/');
            });
        }else {
            res.render('account/register' , {errors: "Username or Email already in user"});
        }
    })
});


//login
accountRoutes.post('/login', function(req,res){
    var matched_users_promise = models.User.findAll({
        where: Sequelize.and(
            {email : req.body.email},
        )
    });

    matched_users_promise.then(function(users){
        if(users.length > 0){
            let user = users[0];
            let passwordHash = user.password;

            // bcrypt.compareSync(req.body.password,passwordHash) = 
            //which will convert our entered password to password hash and then it compares this 
            //resultant password hash with the password hash stored in the database , 
            //if we get true then password is matched .

            if(bcrypt.compareSync(req.body.password , passwordHash)){    
                req.session.email = req.body.email;
                res.redirect('/');
            }
            else {
                res.redirect('/register');
            }
        }

        else {
            res.redirect('/login');
        }
    });
});

module.exports = { "AccountRoutes" : accountRoutes};