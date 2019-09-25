const express 	= require('express');
const sha256 	= require('sha256');
const sql 		= require('../lib/sql');
const router  	= express.Router();

// =============== CRUD USERS =====================
router.get('/', async function(req, res) {
	let users = await sql.findAllUser() 
	res.send(users);
});

router.get('/findById/:id', async function(req, res) {
	if(req.params){
		let user = await sql.findByIdUser(req.params.id);
		res.send(user);
	}else res.sendStatus(500)
});

router.post('/insert', async function(req, res) {
	
	if(req.body){
		var data = {
			name: 		req.body.nome,
			psw: 		req.body.senha,
			email:  	req.body.email,
			sobrenome: 	req.body.sobrenome,
			data_nasc: 	new Date().toLocaleString('pt-BR').slice(0,-3),
			cpf: 		req.body.cpf,
			permission: req.body.permission
		}

		// verifica mesmo e-mail
		let verify = await sql.findByEmailUser(data.email);
		if(verify.length > 0){
			res.send('email ja existente');

		}else{
			// insere o usuario
			let response = await sql.insertOneUser(data);
		
			//retorna o usuario cadastrado
			let user = await sql.findByEmailUser(data.email);
		
			// seta permissoes
			let perm = await sql.setPermissions({id:user[0].id, permission: data.permission});
		
			if(response.error || user.error || perm.error) res.send('error');
			else res.send('ok');
		}

	}else res.send('err')

});

router.post('/delete', async function(req, res) {
	if(req.body){
		await sql.deleteOneUser(req.body.id)
		res.sendStatus(200);
	}else{
		res.sendStatus(500);
	}
});

router.post('/edit', async function(req, res) {
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
		let edit = await sql.updateUser(data)
		res.send(200);
	}else{
		res.send(500);
	}
});

// ================== LOGIN ========================
router.post('/login', async function(req, res) {
	if(req.body.email && req.body.senha){

		let user = await sql.findByEmailUser(req.body.email);

		if(user.length == 0){
			res.send('usuario nao existe')
		}else{
			if(user[0].senha == sha256(req.body.senha)){
				let allUsers = await sql.findAllUser();
				console.log(allUsers);
				res.render('main', {users: allUsers});
			}else{
				res.send('senha incorreta');
			}
		}
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

module.exports = router;