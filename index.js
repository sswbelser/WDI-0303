// Server-side Node.js

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var _ = require("underscore");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

var users = [
	{
		id: 1,
		username: "sswbelser",
		firstname: "Sabastian",
		lastname: "Belser",
		age: 26
	},
	{
		id: 2,
		username: "bobstopher",
		firstname: "Bob",
		lastname: "Snyder",
		age: 30
	},
	{
		id: 3,
		username: "winnar",
		fistname: "Rachel",
		lastname: "Johnson",
		age: 28
	}
];

app.post("/users", function(req, res) {
	var newUser = req.body;
	users.push(newUser);
	res.json(users);
});

app.put("/users/:id", function(req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});
	foundUser.username = req.body.username;
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	foundUser.age = req.body.age;
	res.json(foundUser);
});

app.delete("/users/:id", function(req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});
	var index = users.indexOf(foundUser);
	users.splice(index, 1);
	res.json(foundUser);
});

app.get("/users", function(req, res) {
	res.json(users);
});

app.listen(3000);