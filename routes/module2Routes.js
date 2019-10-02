const express 	= require('express');
const jwt = require('jsonwebtoken');
const router 	= express.Router();
const {auth} = require('../lib/auth');

router.get('/', auth, function(req, res, next) {
	user = jwt.decode(userToken, global.env.PASS_JWT)
	res.render('module2/index', {user: user.nome});
});

module.exports = router;