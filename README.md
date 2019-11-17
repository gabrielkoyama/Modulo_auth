# Modulo_auth

### O Projeto

Este projeto tem em vista solucionar um problema de autênticidade de acesso a
recursos dentro de um sistema de informação em conjunto com a empresa ***Visiona***, então, faz-se isto por meio de *token*s únicos para
cada usuário gerados no momento do login e, através do sistema, o *token* é carregado e
permitido se ainda válido no momento.   
Para solucionar certos problemas, tais como:   
 - Senhas de produção em arquivos disponível para desenvolvedores.   
 
 Durante a implantação de novo código de software em um servidor de produção, optou-se por implantação automática utilizando o SemaphoreCI.

### Tecnologias Utilizadas

Para o desenvolvimento deste projeto, optou-se por utilizar estas tecnologias:

* NodeJS
   - Escolhido por ser rápido, flexível e de fácil implantação na empresa *Visiona*, pois já o utilizam.
* Express
   - Framework web minimalista para NodeJS.
* JSON Web Token
   - Tornou-se uma opção por ser capaz de gerar um token passível de ser digitalmente assinado e protegido por algorítmos globalmente aceitos.
* MySQL
   - Se trata de um Banco de Dados relacional muito popular, que serve para armazenar o que cada usuário pode acessar.
* SemaphoreCI
   - É uma plataforma de integração e entrega contínua com suporte a aplicações nativas na nuvem.

### Como Reproduzir
''
### Solução
No sistema, é feito um cadastro das módulos existentes no sistema, de tal forma, que seja possível limitá-los a certos usuários o acesso a estes módulos.   
Um usuário logado adentra estes casos:
 * Pode acessar os módulos que lhe são permitidos.
 * Pode sair.
 * Caso entre na página de algum módulo não permitido, o mesmo é forçado a sair, logo, volta a página de login.

#### Referências

NodeJS: https://nodejs.org/en/docs/   
ExpressJS: https://expressjs.com/pt-br/   
JSON Web Tokens: https://jwt.io/   
MySQL: https://www.mysql.com/   
SemaphoreCI: https://docs.semaphoreci.com/category/56-guided-tour

