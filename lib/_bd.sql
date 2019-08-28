-- run mysql -u <user> -p < _bd.sql
CREATE DATABASE IF NOT EXISTS AUTH;
USE AUTH;

CREATE TABLE IF NOT EXISTS tb_user(
	usu_cd INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	usu_nm VARCHAR(50), 
	usu_psw VARCHAR(64),
	usu_email VARCHAR(50), 
	usu_sobrenome VARCHAR(50),
	usu_data_nasc TIMESTAMP,
	usu_cpf VARCHAR(50) NOT NULL
);

-- ------------------- INSERTS TESTE ---------------------------
-- INSERT INTO tb_user (usu_nm, usu_psw, usu_email, usu_sobrenome, usu_data_nasc, usu_cpf) VALUES ('usu_nm', 'usu_psw', 'usu_email', 'usu_sobrenome', '2017-06-15 09:34:21', 'usu_cpf');

-- SELECT * FROM tb_user;