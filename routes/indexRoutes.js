const express 	= require('express');
const router 	= express.Router();
const {auth} 	= require('../lib/auth');

router.get('/', function(req, res, next) {
	res.render('login');
});

router.get('/dashboard', auth, function(req, res, next) {
	console.log(userToken)
	res.render('dashboard', {user: 'Admin'});
});

module.exports = router;