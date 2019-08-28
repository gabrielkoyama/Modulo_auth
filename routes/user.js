const express 	= require('express');
const router  	= express.Router();
const sql 		= require('../lib/sql');

router.get('/', async function(req, res, next) {
	// sql.findAllUsers(response => {
	// 	res.send(response);
	// });

	// sql.insertOne({nome: 'gabriel', cpf: '123435'}, response => {
	// 	res.send('ok');
	// });

});

module.exports = router;
