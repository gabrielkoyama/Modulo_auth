const mysql = require('mysql');
const sha256 	= require('sha256');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'fatec',
	database: 'AUTH'
});

var sql = module.exports = {
	getDB: function( callback ){
		connection.connect((error) => {
			if (error) console.error(error);
			callback(connection);
		})

	},
	findAllUsers: function ( callback ) {
		let res;
		try {
			sql.getDB(db => {
				db.query("SELECT * FROM tb_user", (err, result) => {
					if (err) console.error(err);
					res = result;
					console.log(result);
					callback( res )
				});
			})
		} catch (error) {
			res = {error};			
			callback( res )
		}
	},
	insertOne: function(user, cb){
		sql.getDB(db => {
			query = "INSERT INTO tb_user (usu_nm, usu_psw, usu_email, usu_sobrenome, usu_data_nasc , usu_cpf) VALUES ?";
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
	delete: function(id, cb){
		sql.getDB(db => {
			query = `DELETE FROM tb_user WHERE usu_cd = ${id};`
			db.query(query, (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	},

	update: function(user, cb){
		// !!!!!!!!!! FAZENDO !!!!!!!!
		sql.getDB(db => {
			query = `UPDATE tb_user 
			SET usu_nm = "${user.name}", 
			usu_psw = "${user.psw}", 
			usu_psw = "${user.psw}", 
			usu_psw = "${user.psw}", 
			usu_cpf = "${user.cpf}" 
			WHERE usu_cd = ${user.id} ;`
			db.query(query, (err, res) => {
				if(err) console.error(err);
				cb(err, res);
			});
		})
	}
}