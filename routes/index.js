const express 	= require('express');
const router 	= express.Router();
const sql 		= require('../lib/sql');

router.get('/login', function(req, res, next) {
	res.render('index');
});

router.get('/', function(req, res, next) {
	res.render('index');
});

module.exports = router;