const mysql 	= require('mysql');
const sha256 	= require('sha256');
const util 		= require('util');
require('dotenv').config()

if(!process.env.DB_HOST) console.error('undeclared variables!')
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

const query = util.promisify(connection.query).bind(connection);

var sql = module.exports = {

	teste: async () => {
		let result;
		try {
			result = await query('select 1count(*) as count from tb_user');
		} catch (error) {
			result = {error};
		}
		return result;
	},

	// ============ GET CONNECTION =========
	getDB: function( callback ){
		connection.connect((error) => {
			if (error) console.error(error);
			callback(connection);
		})

	},
	// ======================================

	// ============= USER CRUD ================
	findAllUser: async function ( callback ) {
		let result;
		query = `SELECT `
		query += `usu_cd as id, `;
		query += `usu_nm as nome, `;
		query += `usu_psw as senha, `;
		query += `usu_email as email, `;
		query += `usu_sobrenome as sobrenome, `;
		query += `usu_data_nasc as data_nasc, `;
		query += `usu_cpf as cpf `;
		query += `FROM tb_user;`
		
		try {
			result = await query(query);
		} catch (error) {
			result = {error};
		}

		return result;
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
	insertOneUser: async function(user, cb){
		let result;

		var qry = 'INSERT INTO tb_user ';
		qry += '(usu_nm, usu_psw, ';
		qry += 'usu_email, ';
		qry += 'usu_sobrenome, ';
		qry += 'usu_data_nasc , ';
		qry += 'usu_cpf) ';
		qry += 'VALUES ( ';
		qry += `"${user.name}", `;
		qry += `"${sha256(user.psw)}"`;
		qry += `"${user.email}",`;
		qry += `"${user.sobrenome}",`;
		qry += `"${user.data_nasc}",`;
		qry += `"${user.cpf}")`;

		try {
			result = await query(qry);	
		} catch (error) {
			console.error(error)
			result = {error}
		}

		return result;
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
	setPermissions: function (id, permission){
		return new Promise(function(resolve, reject){
			sql.getDB(db => {
				query = 'INSERT INTO tb_usu_module_permission ';
				query += 'mde_mod_cd, mde_usu_cd ) ';
				query += 'VALUES ?';
				var values = [
					[id, permission ]
				];
				db.query(query,[values], (error, result) => {
					if(error) {
						console.error(error);
						reject(error)
					}else resolve(result)
				});
			})
		})
	}

	// ===========================================

}