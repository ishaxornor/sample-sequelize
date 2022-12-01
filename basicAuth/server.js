var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
let ejs = require("ejs");

const app = express();

var AccountRoutes = require('./controllers/account_controller');
var HomeRoutes = require('./controllers/home_controller');


var port = process.env.PORT ||3000;

app.set('view engine' , 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use(session({secret: 'randomstringsessionsecret'}));
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.use('/',AccountRoutes.AccountRoutes);

app.use(function(req,res,next){
    if(req.session.email == null || req.session.email.length == 0){
        res.redirect('/login');
    } else {
        next();
    }
});
app.use('/', HomeRoutes.HomeRoutes);

app.listen(port);