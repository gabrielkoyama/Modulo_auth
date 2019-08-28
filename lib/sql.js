const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
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
			query = "INSERT INTO tb_user (usu_nm, usu_cpf) VALUES ?";
			var values = [
				[user.nome, user.cpf]
			];
			db.query(query,[values], (err, res) => {
				if(err) console.error(err);
				cb(res);
			});
		})
	}
}