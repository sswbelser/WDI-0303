// Server-side Node.js

var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());
var bodyParser = require("body-parser");
var _ = require("underscore");

// serve js and css files from public folder
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

// Sample hardcoded database
var users = [
	{
		id: 1,
		firstname: "Sabastian",
		lastname: "Belser",
		age: 26
	},
	{
		id: 2,
		firstname: "Bob",
		lastname: "Snyder",
		age: 30
	},
	{
		fistname: "Rachel",
		lastname: "Johnson",
		age: 28
	}
];

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
})

// Display whole array
app.get("/users", function(req, res) {
	res.json(users);
});

// Add more array objects
app.post("/users", function(req, res) {
	var newUser = req.body;
	users.push(newUser);
	res.json(users);
});

// Modify specific array object
app.put("/users/:id", function(req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	foundUser.age = req.body.age;
	res.json(foundUser);
});

// Delete specific array object
app.delete("/users/:id", function(req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});
	var index = users.indexOf(foundUser);
	users.splice(index, 1);
	res.json(foundUser);
});

app.listen(3000);