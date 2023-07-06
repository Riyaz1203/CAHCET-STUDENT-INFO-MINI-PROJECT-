
require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000 ;
const DB_URI = process.env.DB_URI ;

// database

mongoose.connect(DB_URI , {useNewUrlParser :true , useUnifiedTopology:true});
var db=mongoose.connection;
db.on("error",(error) => console.log(error));
db.once("open",() => console.log("connected to database"));


// middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret:'my secret key',
    saveUninitialized:true,
    resave:false
}));

app.use((req,res,next)=>{
res.locals.message = req.session.message;
delete req.session.message;
next();
});

app.set('view engine','ejs');


app.use("",require("./routes/routes"));

app.use(express.static("uploads"));

app.listen(PORT , () =>{
    console.log('server started')
})

app.use(express.static(__dirname + '/public'));


  