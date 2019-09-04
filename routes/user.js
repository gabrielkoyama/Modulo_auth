const express 	= require('express');
const sha256 	= require('sha256');
const sql 		= require('../lib/sql');
const router  	= express.Router();

// =============== CRUD USERS =====================
router.get('/', async function(req, res) {
	let users = await sql.findAllUser() 
	res.send(users);
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

router.post('/insert', async function(req, res) {
	var data = {
		name: 		req.body.nome,
		psw: 		req.body.senha,
		email:  	req.body.email,
		sobrenome: 	req.body.sobrenome,
		data_nasc: 	new Date().toLocaleString('pt-BR').slice(0,-3),
		cpf: 		req.body.cpf
	}

	let response = await sql.insertOneUser(data);
	if(response.error) res.send('error')
	else res.send('ok');
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

router.post('/setPermission', async function(req, res){
	if(req.body){
		var data = {
			id: req.body.id,
			permission: req.body.permission
		}
		let result = await sql.setPermissions(data)
	}else {
		res.send('err');
	}
})

router.get('/teste', async function(req, res){
	let testeCount = await sql.teste();
	console.log(testeCount)
})

module.exports = router;