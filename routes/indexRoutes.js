const express 	= require('express');
const jwt = require('jsonwebtoken');

const router 	= express.Router();
const {auth, basicAuth} 	= require('../lib/auth');


router.get('/', function(req, res, next) {
	userToken = "";
	res.render('login');
});

router.get('/dashboard', auth, function(req, res, next) {
	user = jwt.decode(userToken, global.env.PASS_JWT)
	res.render('dashboard/index', {user: user.nome});
});

module.exports = router;