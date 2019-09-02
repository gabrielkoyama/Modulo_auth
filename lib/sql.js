const mysql 	= require('mysql');
const sha256 	= require('sha256');
require('dotenv').config()

if(!process.env.DB_HOST) console.error('undeclared variables!')
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});
var sql = module.exports = {
	// ============ GET CONNECTION =========
	getDB: function( callback ){
		connection.connect((error) => {
			if (error) console.error(error);
			callback(connection);
		})

	},
	// ======================================

	// ============= USER CRUD ================
	findAllUser: function ( callback ) {
		sql.getDB(db => {
			query = `SELECT `
			query += `usu_cd as id, `;
			query += `usu_nm as nome, `;
			query += `usu_psw as senha, `;
			query += `usu_email as email, `;
			query += `usu_sobrenome as sobrenome, `;
			query += `usu_data_nasc as data_nasc, `;
			query += `usu_cpf as cpf `;
			query += `FROM tb_user;`
			console.error(query);
			db.query(query, (err, result) => {
				if (err) console.error(err);
				callback( err, result );
			});
		})
	},
	findByIdUser: function (id, callback ) {
		sql.getDB(db => {
			query = `SELECT `
			query += `usu_cd as id, `;
			query += `usu_nm as nome, `;
			query += `usu_psw as senha, `;
			query += `usu_email as email, `;
			query += `usu_sobrenome as sobrenome, `;
			query += `usu_data_nasc as data_nasc, `;
			query += `usu_cpf as cpf `;
			query += `FROM tb_user WHERE usu_cd = ${id};`
			db.query(query, (err, result) => {
				if (err) console.error(err);
				callback( err, result );
			});
		})
	},
	findByEmailUser: function (email, callback ) {
		sql.getDB(db => {
			query = `SELECT `
			query += `usu_cd as id, `;
			query += `usu_nm as nome, `;
			query += `usu_psw as senha, `;
			query += `usu_email as email `;
			query += `FROM tb_user WHERE usu_email = "${email}";`
			db.query(query, (err, result) => {
				if (err) console.error(err);
				callback( err, result );
			});
		})
	},
	insertOneUser: function(user, cb){
		sql.getDB(db => {
			query = 'INSERT INTO tb_user ';
			query += '(usu_nm, usu_psw, ';
			query += 'usu_email, ';
			query += 'usu_sobrenome, ';
			query += 'usu_data_nasc , ';
			query += 'usu_cpf) ';
			query += 'VALUES ?';
			var values = [
				[user.name, sha256(user.psw), user.email, user.sobrenome, user.data_nasc, user.cpf]
			];
			console.log(JSON.stringify(values))
			db.query(query,[values], (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	},
	deleteOneUser: function(id, cb){
		sql.getDB(db => {
			query = `DELETE FROM tb_user `
			query += `WHERE usu_cd = ${id};`
			db.query(query, (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	},
	updateUser: function(user, cb){
		sql.getDB(db => {
			query = `UPDATE tb_user `;
			query += `SET usu_nm = "${user.name}", `;
			query += `usu_psw = "${user.psw}", `;
			query += `usu_email = "${user.email}", `;
			query += `usu_sobrenome = "${user.sobrenome}", `;
			query += `usu_data_nasc = "${user.data_nasc}", `;
			query += `usu_cpf = "${user.cpf}" `;
			query += `WHERE usu_cd = ${user.id};`;
			db.query(query, (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	},
	// =========================================


	// ============== MODULES ===================
	findAllModule: function ( callback ) {
		sql.getDB(db => {
			query = `SELECT `
			query += `mod_cd as id, `;
			query += `mod_nm as nome, `;
			query += `mod_descricao as descricao, `;
			query += `mod_link as link `;
			query += `FROM tb_module;`
			console.error(query);
			db.query(query, (err, result) => {
				if (err) console.error(err);
				callback( err, result );
			});
		})
	},
	findByIdModule: function (id, callback ) {
		sql.getDB(db => {
			query = `SELECT `
			query += `mod_cd as id, `;
			query += `mod_nm as nome, `;
			query += `mod_descricao as descricao, `;
			query += `mod_link as link `;
			query += `FROM tb_module WHERE mod_cd = ${id};`;
			db.query(query, (err, result) => {
				if (err) console.error(err);
				callback( err, result );
			});
		})
	},
	insertOneModule: function(mod, cb){
		sql.getDB(db => {
			query = 'INSERT INTO tb_module ';
			query += '(mod_nm, ';
			query += 'mod_descricao, ';
			query += 'mod_link) ';
			query += 'VALUES ?';
			var values = [
				[mod.nome, mod.descricao, mod.link]
			];
			db.query(query,[values], (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	},
	deleteOneModule: function(id, cb){
		sql.getDB(db => {
			query = `DELETE FROM tb_module `
			query += `WHERE mod_cd = ${id};`
			db.query(query, (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	},
	updateModule: function(mod, cb){
		sql.getDB(db => {
			query = `UPDATE tb_module `;
			query += `SET mod_nm = "${mod.nome}", `;
			query += `mod_descricao = "${mod.descricao}", `;
			query += `mod_link = "${mod.link}" `;
			query += `WHERE mod_cd = ${mod.id};`;
			db.query(query, (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	},
	// ===========================================

	// ============== MODULES ===================
	setPermissions: function(data, cb){
		sql.getDB(db => {
			query = 'INSERT INTO tb_usu_module_permission ';
			query += 'mde_mod_cd, mde_usu_cd ) ';
			query += 'VALUES ?';
			var values = [
				[data.usu_id, data.permission ]
			];
			db.query(query,[values], (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	}

	// ===========================================

}