const express 	= require('express');
const jwt = require('jsonwebtoken');
const sql = require('../lib/sql');

const router 	= express.Router();
const {auth} 	= require('../lib/auth');


router.get('/', auth, async function(req, res) {
	user = jwt.decode(global.userToken,  global.env.PASS_JWT);
	let apps = await sql.findUserModuleByUserId(user.id);
	if(apps.error || apps.length == 0) res.redirect('/dashboard/');
	else res.render('apps', {apps});
});


module.exports = router;