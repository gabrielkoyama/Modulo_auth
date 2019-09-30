const express = require('express');
const sql = require('../lib/sql');
const {auth}	= require('../lib/auth');

const router = express.Router();

router.get('/',auth, async function (req, res) {
	res.render('module', {user: 'Admin'})
});

router.get('/findById/:id',auth, async function (req, res) {
	if (req.params) {
		let response = await sql.findByIdModule(req.params.id)
		res.send(response);
	} else {
		res.sendStatus(500);
	}
}); 

router.post('/insert',auth, async function (req, res) {
	if(req.body){

		data = {
			nome: req.body.nome,
			descricao: req.body.descricao,
			link: req.body.link
		}

		let addModule = await sql.insertOneModule(data);
		if(addModule.error) res.sendStatus(500)
		else {
			console.log('deu tudo certo')
			res.sendStatus(200)
		}
	}else{
		res.sendStatus(500)
	}
});

router.get('/getModules', auth,async function (req, res) {
	let response = await sql.findAllModule()
	res.send(response);
})

router.get('/getById/:id',auth, async function (req, res) {
	if(req.params.id) {
		let response = await sql.findByIdModule(req.params.id)
		res.send(response);
	}
	else res.sendStatus(500)
})

router.get('/deleteById/:id',auth, async function (req, res) {
	if (req.params) {
		await sql.deleteOneModule(req.params.id)
		res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});

router.post('/edit', auth,async function (req, res) {
	if (req.body) {
		var data = {
			id: 			req.body.id,
			nome: 			req.body.nome,
			descricao: 		req.body.descricao,
			link: 			req.body.link,
		}
		let response = await sql.updateModule(data)
		if(response.error) res.sendStatus(500)
		else res.sendStatus(200);
	} else {
		res.sendStatus(500);
	}
});

router.get('/getAll',auth, async function (req, res) {
	let response = await sql.findAllModule();
	if(response.error) res.sendStatus(500)
	else res.send(response);

})


module.exports = router;