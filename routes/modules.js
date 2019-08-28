const express 	= require('express');
const sha256 	= require('sha256');
const sql 		= require('../lib/sql');
const router  	= express.Router();

router.get('/', function(req, res, next) {
	sql.findAll( (err, response) => {
		if(err) console.error(err);
		res.send(response);
	});
});

router.get('/findById/:id', function(req, res, next) {
	if(req.params){
		sql.findById( req.params.id, (err, response) => {
			if(err) console.error(err);
			res.send(response);
		});
	}else{
		res.sendStatus(500);
	}
});

router.post('/add', function(req, res, next) {
	var data = {
		name: 		req.body.nome,
		psw: 		req.body.senha,
		email:  	req.body.email,
		sobrenome: 	req.body.sobrenome,
		data_nasc: 	new Date().toLocaleString('pt-BR').slice(0,-3),
		cpf: 		req.body.cpf
	}
	sql.insertOne(data, response => {
		res.sendStatus(200);
	});
});

router.post('/delete', function(req, res, next) {
	if(req.body){
		console.log(req.body.id);
		sql.delete(req.body.id, function(err, response){
			if(err) console.error(err);
			res.sendStatus(200);
		});
	}else{
		res.sendStatus(500);
	}
});

router.post('/edit', function(req, res, next) {
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
		sql.update(data, function(err, response){
			if(err) console.error(err)
			res.send(200);
		});
	}else{
		res.send(500);
	}
});

module.exports = router;
