const express 	= require('express');
const sha256 	= require('sha256');
const sql 		= require('../lib/sql');
const router  	= express.Router();

// =============== CRUD USERS =====================
router.get('/', function(req, res) {
	sql.findAllUser( (err, response) => {
		if(err) console.error(err);
		res.send(response);
	});
});

router.get('/findById/:id', function(req, res) {
	if(req.params){
		sql.findByIdUser( req.params.id, (err, response) => {
			if(err) console.error(err);
			res.send(response);
		});
	}else{
		res.sendStatus(500);
	}
});

router.post('/insert', function(req, res) {
	var data = {
		name: 		req.body.nome,
		psw: 		req.body.senha,
		email:  	req.body.email,
		sobrenome: 	req.body.sobrenome,
		data_nasc: 	new Date().toLocaleString('pt-BR').slice(0,-3),
		cpf: 		req.body.cpf
	}
	sql.insertOneUser(data, (err, response) => {
		if(err) res.sendStatus(500);
		else res.sendStatus(200);
	});
});

router.post('/delete', function(req, res) {
	if(req.body){
		console.log(req.body.id);
		sql.deleteOneUser(req.body.id, function(err, response){
			if(err) console.error(err);
			res.sendStatus(200);
		});
	}else{
		res.sendStatus(500);
	}
});

router.post('/edit', function(req, res) {
	if(req.body){
		var data = {
			id:  		req.body.id,
			name: 		req.body.nome,
			psw: 		req.body.senha,
			email:  	req.body.email,
			sobrenome: 	req.body.sobrenome,
			data_nasc: 	new Date().toLocaleString('pt-BR').slice(0,-3),
			cpf: 		req.body.cpf
		}
		sql.updateUser(data, function(err, response){
			if(err) console.error(err)
			res.send(200);
		});
	}else{
		res.send(500);
	}
});

// ================== LOGIN ========================
router.post('/login', function(req, res) {
	if(req.body.email && req.body.senha){
		sql.findByEmailUser(req.body.email, (err, response) => {
			if(err) console.error(err);
			else{
				
				// verifica se existe
				if(response.length > 0){

					// verifica se a senha esta correta
					if(response[0].senha == sha256(req.body.senha)){
						res.send('ok');
					}else{
						res.send('senha incorreta');
					}
				}else{
					res.send('usuario nao existe');
				}
			}
		});
	}else{
		res.send('email e senha required!');
	}
});

// =============== PERMISSIONS =====================
router.post('/', function(req, res){

	if(req.body){
		var data = {
			id: req.body.id,
			permission: req.body.permissions
		}

		sql.setPermissions(data, (err, response) => {
			if(err) res.send(err);
			else res.send(response); 
		})

	}else {
		res.send('err');
	}

})
module.exports = router;
