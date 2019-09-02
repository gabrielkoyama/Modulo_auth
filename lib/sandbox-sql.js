const mysql 	= require('mysql');
const util 		= require('util');
require('dotenv').config()

const conn = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'fatec',
	database: 'AUTH'
});

const query = util.promisify(conn.query).bind(conn);

(async () => {
	try {
		const rows = await query('select count(*) as count from tb_user');
		console.log(rows);
	} finally {
		conn.end();
	}
})()