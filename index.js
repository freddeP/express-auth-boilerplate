const express = require("express");
const app = express();

// kryptering av lösenord 
const bcrypt = require("bcryptjs");

// database

const Database = require("@replit/database");
const db = new Database();




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
async function register(req,res){

	try{
		// skapa en RIKTIG kopia
	let user = {...req.body};
	user.password = await bcrypt.hash(user.password,12);

	user.id = "id_"+user.email+"_"+Date.now();

	await db.set(user.id,user);

	res.send(user);
	}
	catch(err){
		res.send("error");
	}


}
async function login(req,res){


let user = await userExist(req.body.email);

if(!user) return res.send("Login error");

if( await bcrypt.compare(req.body.password, user.password))
{
	res.send("logged in");
}
else{
	res.send("wrong password");
}


}
function secret(req,res){}





async function getAllUsers(){

	let keys = await db.list();
	let users = [];
	for(let key of keys){

		users.push( await db.get(key)  )

	}
	return users;

}

async function userExist(email){

	let users = await getAllUsers();

	let user = users.find(function(u){

	return	u.email == email

	});

	return user;


}