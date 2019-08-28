-- run mysql -u <user> -p < _bd.sql
CREATE DATABASE IF NOT EXISTS AUTH;
USE AUTH;

CREATE TABLE IF NOT EXISTS tb_user(
	usu_cd INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	usu_nm VARCHAR(50), 
	usu_cpf VARCHAR(50)
);

-- ------------------- INSERTS TESTE ---------------------------
-- INSERT INTO tb_user (usu_nm, usu_cpf) VALUES ('Teste1', '123');
-- INSERT INTO tb_user (usu_nm, usu_cpf) VALUES ('Teste2', '123');
-- INSERT INTO tb_user (usu_nm, usu_cpf) VALUES ('Teste3', '123');
-- INSERT INTO tb_user (usu_nm, usu_cpf) VALUES ('Teste4', '123');
-- INSERT INTO tb_user (usu_nm, usu_cpf) VALUES ('Teste5', '123');

SELECT * FROM tb_user;