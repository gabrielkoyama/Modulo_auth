const express 	= require('express');
const router 	= express.Router();
const sql 		= require('../lib/sql');

router.get('/login', function(req, res, next) {
	res.render('index');
});

router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/main', function(req, res, next) {
	res.render('main');
});

module.exports = router;