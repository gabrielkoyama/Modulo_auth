const mysql 	= require('mysql');
const sha256 	= require('sha256');
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

var sql = module.exports = {
	getDB: function( callback ){
		connection.connect((error) => {
			if (error) console.error(error);
			callback(connection);
		})
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
			result = await query(str);	
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

	findUserModuleByUserId: async function(user_id){
		let result;
		var str='';

		str += 'SELECT ';
		str += 'm.mod_nm AS moduleName,';
		str += 'm.mod_link AS moduleLink,';
		str += 'u.usu_nm AS userNome,';
		str += 'u.usu_email AS userEmail ';
		str += 'FROM tb_usu_module_permission AS ump,';
		str += 'tb_user AS u,';
		str += 'tb_module AS m ';
		str += 'WHERE ump.mde_usu_cd = u.usu_cd ';
		str += 'AND m.mod_cd = ump.mde_mod_cd ';
		str += `AND u.usu_cd = ${parseInt(user_id)};`;

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
	insertOneModule: async function(mod){
		let result;

		str = 'INSERT INTO tb_module ';
		str += '(mod_nm, ';
		str += 'mod_descricao, ';
		str += 'mod_link) ';
		str += 'VALUES ?';
		
		try {
			var values = [
				[mod.nome, mod.descricao, mod.link]
			];
			result = await query(str, [values]);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;
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

	deletePermissionById: async function(id){
		let result;

		str = `DELETE FROM tb_usu_module_permission `
		str += `WHERE mde_usu_cd = ${id};`

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
	},


	infoBoxesUsers: async function(){
		let result;
		str = 'select count(*) as total from tb_user;'
		try {
			result = await query(str);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;
	},

	infoBoxesModules: async function(){
		let result;
		str = 'select count(*) as total from tb_module;'
		try {
			result = await query(str);	
		} catch (error) {
			console.error(error)
			result = {error}
		}
		return result;
	}

	// ===========================================

}