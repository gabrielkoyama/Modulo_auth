const express 	= require('express');
const router 	= express.Router();
const {auth} 	= require('../lib/auth');

router.get('/', auth, function(req, res, next) {
	res.render('apps');
});

module.exports = router;