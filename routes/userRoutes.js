const express 	= require('express');
const sql 		= require('../lib/sql');
const {auth, basicAuth}	= require('../lib/auth');

const router  	= express.Router();


// =============== CRUD USERS =====================
router.get('/', auth, async function(req, res) {
	res.render('dashboard/user', {user:'Admin'});
});

router.get('/findById/:id',auth, async function(req, res) {
	if(req.params){
		let user = await sql.findByIdUser(req.params.id);
		res.send(user);
	}else res.sendStatus(500)
});

router.post('/insert', auth,async function(req, res) {
	
	if(req.body){
		var auxArrayPermissions = [];
		Object.keys(req.body).map(el => {
			if(req.body[el].includes("on")) auxArrayPermissions.push(el)
		})
		if (typeof req.body.permissions === 'array')
			auxArrayPermissions = req.body.permissions
		else if (typeof req.body.permissions === 'string')
			auxArrayPermissions = [req.body.permissions];
		var data = {
			name: 		req.body.nome,
			psw: 		req.body.senha,
			email:  	req.body.email,
			sobrenome: 	req.body.sobrenome,
			data_nasc: 	new Date().toLocaleString('pt-BR').slice(0,-3),
			cpf: 		req.body.cpf || null,
			permission: auxArrayPermissions
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
			else res.redirect('/dashboard/user');
		}

	}else res.send('err')

});

router.post('/getModulesFromUser', auth, async (req, res) => {
	if (req.body) {
		let user_modules = await sql.findUserModuleByUserId(req.body.id);
		let modules = await sql.findAllModule();
		res.send({'user_modules': user_modules, 'modules': modules});
	}
	else
	{
		res.sendStatus(500);
	}
})

router.post('/delete',auth, async function(req, res) {
	if(req.body){
		await sql.deleteOneUser(req.body.id)
		res.sendStatus(200);
	}else{
		res.sendStatus(500);
	}
});

router.post('/edit',auth, async function(req, res) {
	if(req.body){
		var data = {
			id:  		req.body.id,
			name: 		req.body.nome,
			psw: 		req.body.senha,
			email:  	req.body.email,
			sobrenome: 	req.body.sobrenome || null,
			data_nasc: 	new Date(), //dando erro ao editar *incorrect datetime value
			cpf: 		req.body.cpf || null,
			permission: req.body.permissions
		}

		// update nas permissoes
		let permDel 	= await sql.deletePermissionById(data.id);
		let permUpdate 	= await sql.setPermissions({id: data.id, permission: data.permission});

		let edit = await sql.updateUser(data)

		if(permDel.error || permUpdate.error || edit.error) res.sendStatus(500)
		else res.send(200);
	}else{
		res.send(500);
	}
});

router.post('/setPermission',auth, async function(req, res){
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

router.get('/getUsers',auth, async (req, res, next) => {
	let users = await sql.findAllUser() 
	res.send(users)
})


router.get('/getTotalUsers',auth, async (req, res, next) => {
	let users = await sql.infoBoxesUsers() 
	res.send(users)
})

module.exports = router;