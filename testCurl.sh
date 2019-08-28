
# EDIT -- OK 
# curl -X POST http://localhost:8888/user/edit -H "Content-Type: application/json" -d '{"id":1, "nome": "aaaaaa", "senha":"fa", "email": "asd@ads", "sobrenome": "sobrenome", "data_nasc": "12/02/0213", "cpf":"123"}'

# ADD -- OK
# curl -X POST http://localhost:8888/user/add -H "Content-Type: application/json" -d '{"nome": "sadsd", "senha":"fa", "email": "asd@ads", "sobrenome": "sobrenome", "data_nasc": "12/02/0213", "cpf":"123"}'

# DELETE -- OK
# curl -X POST http://localhost:8888/user/delete -H "Content-Type: application/json" -d '{"id": 1}'

# READ -- OK
# curl http://localhost:8888/user
