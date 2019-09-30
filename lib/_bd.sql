-- run mysql -u <user> -p < _bd.sql
CREATE DATABASE IF NOT EXISTS AUTH;
USE AUTH;

CREATE TABLE IF NOT EXISTS tb_user (
	usu_cd INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	usu_nm VARCHAR(50), 
	usu_psw VARCHAR(64),
	usu_email VARCHAR(50), 
	usu_sobrenome VARCHAR(50),
	usu_data_nasc TIMESTAMP,
	usu_cpf VARCHAR(50) NOT NULL
);

-- MODULE - aplicacao
CREATE TABLE IF NOT EXISTS tb_module (
	mod_cd INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	mod_nm VARCHAR(50),
	mod_descricao VARCHAR(64),
	mod_link VARCHAR(50)
);

-- MODULE - tabela intermediária
CREATE TABLE IF NOT EXISTS tb_usu_module_permission(
	mde_cd INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	mde_mod_cd INT NOT NULL,
	mde_usu_cd INT NOT NULL,
	FOREIGN KEY (mde_mod_cd) REFERENCES tb_module(mod_cd),
	FOREIGN KEY (mde_usu_cd) REFERENCES tb_user(usu_cd)
);
-- ------------------- INSERTS MODULES ---------------------------
	-- Module dashboard
	INSERT INTO tb_module (mod_nm, mod_descricao, mod_link)
	VALUES ('Dashboard', 'Dashboard para controle de usuarios', 'http://localhost:3000');

	-- Module 1
	INSERT INTO tb_module (mod_nm, mod_descricao, mod_link)
	VALUES ('Module1', 'Modulo exemplo M2', 'http://localhost:3001');

	-- Module 2
	INSERT INTO tb_module (mod_nm, mod_descricao, mod_link)
	VALUES ('Module2', 'Modulo exemplo M2', 'http://localhost:3002');

-- ------------------- INSERTS TESTE ---------------------------
INSERT INTO tb_user (
	usu_nm, 
	usu_psw, 
	usu_email, 
	usu_sobrenome, 
	usu_data_nasc, 
	usu_cpf) 
VALUES (
	'gabriel', -- senha 123
	'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 
	'gabriel', -- email gabriel sem validacoes ainda
	'alves', 
	'2017-06-15 09:34:21', 
	'123');
-- SELECT * FROM tb_user;

INSERT INTO tb_user (
	usu_nm, 
	usu_psw, 
	usu_email, 
	usu_sobrenome, 
	usu_data_nasc, 
	usu_cpf) 
VALUES (
	'gustavo', -- senha 123
	'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 
	'gustavo@gmail.com', -- email gabriel sem validacoes ainda
	'henrique', 
	'2017-06-15 09:34:21', 
	'12321983721');
