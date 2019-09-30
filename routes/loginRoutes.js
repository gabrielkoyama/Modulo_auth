const express 	= require('express');
const router 	= express.Router();
const sql 		= require('../lib/sql');
const sha256 	= require('sha256');
const jwt 		= require('jsonwebtoken');


router.get('/', function(req, res) {
	res.render('login');
});

// sign in
router.post('/sign-in', async function(req, res) {
	if(req.body.email && req.body.senha){
		let user = await sql.findByEmailUser(req.body.email);
		if(user.length == 0){
			res.send('usuario nao existe')
		}else{
			if(user[0].senha == sha256(req.body.senha)){
				data = {
					nome: user[0].nome,
					email: user[0].email
				}
				userToken =	jwt.sign(data, process.env.PASS_JWT);
				res.redirect('/middleware');
			}else{
				res.send('senha incorreta');
			}
		}
	}else{
		res.send('email e senha required!');
	}
});

// sign out
router.get('/sign-out', async function(req, res) {
	global.userToken='';
	res.redirect('/')
})


module.exports = router;