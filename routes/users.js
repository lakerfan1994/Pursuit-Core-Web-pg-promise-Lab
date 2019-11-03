const express = require('express');
const router = express.Router();
const connectionString = {
	host: 'localhost',
	port: 5432, 
	database: 'mydb',
	user: 'Chuck',
	password: 2494
};
const pgp = require('pg-promise')();
const db = pgp(connectionString);

router.get('/all', (req, res) => {
	db.any('SELECT * FROM users')
	.then(data => {
		const response  = {
			users: data
		};
		res.json(response);

	})
	.catch(err => {
		res.send(err);
	})
  // Get users from the database
  	
});

router.post('/register', async (req, res) => {
    const user = req.body;
    console.log(user);
    try{
   		 let response = await db.none('INSERT INTO users(firstname, lastname, age) VALUES($1, $2, $3)', [user.firstname, user.lastname, user.age]);
	} 
	catch(err){
		console.log(err);
	}

	let messageToUser = {addedUser: req.body};
   	res.send(messageToUser);
});

module.exports = router;