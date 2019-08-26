const express 	= require('express');
const router 	= express.Router();
const sql 		= require('../lib/sql');

router.get('/', async function(req, res, next) {
	// let users = await sql.findAllUsers();
	// console.log(users);
	let a = await sql.teste();
	console.log(a);
	res.render('index');
});

module.exports = router;