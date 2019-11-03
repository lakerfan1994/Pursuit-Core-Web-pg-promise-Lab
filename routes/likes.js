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













module.exports = router;