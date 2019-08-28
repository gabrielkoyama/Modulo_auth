const express 	= require('express');
const sha256 	= require('sha256');
const sql 		= require('../lib/sql');
const router  	= express.Router();

router.get('/', function(req, res, next) {
	sql.findAllUsers(response => {
		res.send(response);
	});
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
		res.send(200);
	});
});

router.post('/delete', function(req, res, next) {
	if(req.body.id){
		sql.delete(req.body.id, function(err, response){
			if(err) console.error(err)
			console.log(err)
			console.log(response)
			res.send(200);
		});
	}else{
		res.send(500);
	}
});

router.post('/edit', function(req, res, next) {
	// !!!!!!!!!! FAZENDO !!!!!!!!
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
