const express 	= require('express');
const jwt = require('jsonwebtoken');
const mysql 	= require('mysql');
const util 		= require('util');
require('dotenv').config()

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

const query = util.promisify(connection.query).bind(connection);

findAllUser = async function ( ) {
	let result;
	str = `SELECT `
	str += `	usu_cd as id, `;
	str += `	usu_nm as nome, `;
	str += `	usu_psw as senha, `;
	str += `	usu_email as email, `;
	str += `	usu_sobrenome as sobrenome, `;
	str += `	usu_data_nasc as data_nasc, `;
	str += `	usu_cpf as cpf `;
	str += `FROM tb_user;`
	
	try {
		result = await query(str);
	} catch (error) {
		console.log(error)
		result = {error};
	}
	return result;
}
const router 	= express.Router();
const {auth, basicAuth} 	= require('../lib/auth');


router.get('/', async function(req, res, next) {
	let user = await findAllUser()
	console.log(user)
	userToken = "";
	res.render('login');
});

router.get('/dashboard', auth, function(req, res, next) {
	user = jwt.decode(userToken, process.env.PASS_JWT)
	res.render('dashboard/index', {user: user.nome});
});

module.exports = router;