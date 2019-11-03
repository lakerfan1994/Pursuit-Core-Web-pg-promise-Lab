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

router.get('/all', async (req, res) => {
	let response;
	try{
		response = await db.any('SELECT * FROM posts');
		res.send(response);
	}
	catch(err){
		console.log('this broke :(');
	}
	console.log(response);

});

router.get('/:user_id', async (req, res) => {
	let response;
	try{
		response = await db.any(`SELECT * FROM posts WHERE poster_id = ${req.params.user_id}`);
		res.send(response);
	}
	catch(err){
		console.log("You done f'ed up");
		console.log(err);
	}
});

router.post('/register', async (req, res) => {
	const post = req.body;
	console.log(post);
	let response;
    try{
   		response = await db.none('INSERT INTO posts(poster_id, body) VALUES($1, $2)', [post.poster_id, post.text]);
	} 
	catch(err){
		console.log(err);
	}

	let messageToUser = {addedPost: req.body};
   	res.send(messageToUser);
})



module.exports = router;