const mysql 	= require('mysql');
const sha256 	= require('sha256');
const util 		= require('util');
require('dotenv').config()

const connection = mysql.createConnection({
	host: global.env.DB_HOST,
	port: global.env.DB_PORT,
	user: global.env.DB_USER,
	password: global.env.DB_PASSWORD,
	database: global.env.DB_DATABASE
});

const query = util.promisify(connection.query).bind(connection);

var sql = module.exports = {
	getDB: function( callback ){
		connection.connect((error) => {
			if (error) console.error(error);
			callback(connection);
		})
	},
	teste: async () => {
		let result;
		try {
			result = await query('select count(*) as count from tb_user');
		} catch (error) {
			result = {error};
		}
		return result;
	},

	// ============= USER CRUD ================
	findAllUser: async function ( callback ) {
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
			result = {error};
		}

		return result;
	},
	findByIdUser: async function (id ) {
		let result;
		str = `SELECT `
		str += `usu_cd as id, `;
		str += `usu_nm as nome, `;
		str += `usu_psw as senha, `;
		str += `usu_email as email, `;
		str += `usu_sobrenome as sobrenome, `;
		str += `usu_data_nasc as data_nasc, `;
		str += `usu_cpf as cpf `;
		str += `FROM tb_user WHERE usu_cd = ${id};`
		
		try {
			result = await query(str);
		} catch (error) {
			result = {error};
		}

		return result;
	},
	findByEmailUser: async function (email ) {
		let result;

		str = `SELECT `
		str += `usu_cd as id, `;
		str += `usu_nm as nome, `;
		str += `usu_psw as senha, `;
		str += `usu_email as email `;
		str += `FROM tb_user WHERE usu_email = "${email}";`;

		try {
			result = await query(str);
		} catch (error) {
			result = {error};
		}

		return result;
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
		qry += `"${sha256(user.psw)}",`;
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
	deleteOneUser: async function(id){
		let result;
		
		str = `DELETE FROM tb_user `
		str += `WHERE usu_cd = ${id};`

		try {
			result = await query(qry);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;

	},
	updateUser: async function(user){
		let result;

		str = `UPDATE tb_user `;
		str += `SET usu_nm = "${user.name}", `;
		str += `usu_psw = "${user.psw}", `;
		str += `usu_email = "${user.email}", `;
		str += `usu_sobrenome = "${user.sobrenome}", `;
		str += `usu_data_nasc = "${user.data_nasc}", `;
		str += `usu_cpf = "${user.cpf}" `;
		str += `WHERE usu_cd = ${user.id};`;

		try {
			result = await query(str);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;
	},
	// =========================================


	// ============== MODULES ===================
	findAllModule: async function ( ) {
		let result;

		str = `SELECT `
		str += `mod_cd as id, `;
		str += `mod_nm as nome, `;
		str += `mod_descricao as descricao, `;
		str += `mod_link as link `;
		str += `FROM tb_module;`

		try {
			result = await query(str);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;
	},
	findByIdModule: async function (id ) {
		let result;

		str = `SELECT `
		str += `mod_cd as id, `;
		str += `mod_nm as nome, `;
		str += `mod_descricao as descricao, `;
		str += `mod_link as link `;
		str += `FROM tb_module WHERE mod_cd = ${id};`;
		
		try {
			result = await query(str);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;

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
	deleteOneModule: async function(id){
		let result;

		str = `DELETE FROM tb_module `
		str += `WHERE mod_cd = ${id};`

		try {
			result = await query(str);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;
			
	},
	updateModule: async function(mod){
		let result;

		str = `UPDATE tb_module `;
		str += `SET mod_nm = "${mod.nome}", `;
		str += `mod_descricao = "${mod.descricao}", `;
		str += `mod_link = "${mod.link}" `;
		str += `WHERE mod_cd = ${mod.id};`;
		try {
			result = await query(str);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;
	},
	// ===========================================

	// ============== MODULES ===================
	setPermissions: async function (data){
		let result;
		let err={};
		let str = '';
		for (let index = 0; index < data.permission.length; index++) {
			str=``
			str += `INSERT INTO tb_usu_module_permission `;
			str += `( mde_usu_cd, mde_mod_cd ) `;
			str += `VALUES (${data.id}, ${data.permission[index]});`;

			try {
				result = await query(str)
			} catch (error) {
				result = {error}
			}
		}
		return result;
	}

	// ===========================================

}