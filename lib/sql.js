const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'fatec',
  database : 'AUTH'
});


var sql = module.exports = {
  findAllUsers: function(){
    connection.connect((error) => {
      if(error) console.log(error);
      sql = "SELECT * FROM tb_user;"
      connection.query(sql, function(err,result, fields){
        if(err) throw err;
        connection.end();
        return result
      })
    })
  },

  teste: function(){
    var teste = [{
      a: 'a',
      b: 'c'
    },
    {
      as: 'asd',
      da: 2
    }]

    return teste
  }
  
    // var sql = "SELECT * FROM tb_user;"
    // conn.query(sql, function (error, results, fields){
    //     if(error) return console.log(error);
    //     console.log(results);
    //     return results;
    //     conn.end();
    // });
}



// connection.connect(function(err){
//   if(err) return console.log(err);
//   console.log('conectou!');
//   createTable(connection);
// })

// function createTable(conn){
//   const sql = "CREATE TABLE IF NOT EXISTS USUARIO (\n"+
//               "ID int NOT NULL AUTO_INCREMENT,\n"+
//               "Nome varchar(150) NOT NULL,\n"+
//               "CPF char(11) NOT NULL,\n"+
//               "PRIMARY KEY (ID)\n"+
//               ");";
//   conn.query(sql, function (error, results, fields){
//       if(error) return console.log(error);
//       console.log('criou a tabela!');
//   });
// }

// EXEMPLO DE INSERCAO NO BD
// function addRows(conn){
//   const sql = "INSERT INTO Clientes(Nome,CPF) VALUES ?";
//   const values = [
//         ['teste1', '12345678901'],
//         ['teste1', '09876543210'],
//         ['teste3', '12312312399']
//       ];
//   conn.query(sql, [values], function (error, results, fields){
//           if(error) return console.log(error);
//           console.log('adicionou registros!');
//           conn.end();//fecha a conexão
//       });
// }