
# EDIT
# url -X POST http://localhost:8888/user/edit -H Content-Type: application/json -d {"id": 1, "nome":"fa", "senha": "asd", "cpf": "123456"}

# ADD -- OK
curl -X POST http://localhost:8888/user/add -H "Content-Type: application/json" -d '{"nome": "sadsd", "senha":"fa", "email": "asd@ads", "sobrenome": "sobrenome", "data_nasc": "12/02/0213", "cpf":"123"}'

# DELETE
# url -X POST http://localhost:8888/user/edit -H Content-Type: application/json -d {"id": 1, "nome":"fa", "senha": "asd", "cpf": "123456"}

# READ
# url -X POST http://localhost:8888/user/edit -H Content-Type: application/json -d {"id": 1, "nome":"fa", "senha": "asd", "cpf": "123456"}
