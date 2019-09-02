const express = require('express');
const sha256 = require('sha256');
const sql = require('../lib/sql');
const router = express.Router();

// oq falta:
// crud module
// listar todos os modules do usuario -- change finds do user c um left join
// editar modules do user 
// funcionalidade para remover todos os modules
// select * from tb_user, tb_module where usu_module_permission = mod_cd;

router.get('/', function (req, res, next) {
	sql.findAllModule((err, response) => {
		if (err) console.error(err);
		res.send(response);
	});
});

router.get('/findById/:id', function (req, res, next) {
	if (req.params) {
		sql.findByIdModule(req.params.id, (err, response) => {
			if (err) console.error(err);
			res.send(response);
		});
	} else {
		res.sendStatus(500);
	}
}); 

router.post('/insert', function (req, res, next) {
	var data = {
		nome: 			req.body.nome,
		descricao: 		req.body.descricao,
		link: 			req.body.link,
	}
	sql.insertOneModule(data, response => {
		res.sendStatus(200);
	});
});

router.post('/delete', function (req, res, next) {
	if (req.body) {
		console.log(req.body.id);
		sql.deleteOneModule(req.body.id, function (err, response) {
			if (err) console.error(err);
			res.sendStatus(200);
		});
	} else {
		res.sendStatus(500);
	}
});

router.post('/edit', function (req, res, next) {
	if (req.body) {
		var data = {
			id: 			req.body.id,
			nome: 			req.body.nome,
			descricao: 		req.body.descricao,
			link: 			req.body.link,
		}
		sql.updateModule(data, function (err, response) {
			if (err) console.error(err)
			res.send(200);
		});
	} else {
		res.send(500);
	}
});

module.exports = router;