const express = require("express");
const app = express();

//body-parser-middleware
app.use(express.urlencoded({extended:true}));
// statiska tillgångar såsom css, bilder
app.use(express.static("public"));
app.listen(3400);


//get-routes för att visa login- och registerformulär
app.get("/register",(req,res)=>{res.redirect("/register.html")});
app.get("/login",(req,res)=>{res.redirect("/login.html")});

// post-routes
app.post("/register", register);
app.post("/login", login);

// route som vi bara kan besöka som inloggade 
app.get("/secret", secret);


// controllers
function register(){}
function login(){}
function secret(){}

