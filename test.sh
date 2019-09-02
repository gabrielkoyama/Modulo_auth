# ========================== USER =============================
    
    # EDIT -- OK 
    # curl -X POST http://localhost:8888/user/edit -H "Content-Type: application/json" -d '{"id":1, "nome": "aaaaaa", "senha":"fa", "email": "asd@ads", "sobrenome": "sobrenome", "data_nasc": "12/02/0213", "cpf":"123"}'

    # ADD -- OK
    # curl -X POST http://localhost:8888/user/insert -H "Content-Type: application/json" -d '{"nome": "sadsd", "senha":"fa", "email": "asd@ads", "sobrenome": "sobrenome", "data_nasc": "12/02/0213", "cpf":"123"}'

    # DELETE -- OK
    # curl -X POST http://localhost:8888/user/delete -H "Content-Type: application/json" -d '{"id": 1}'

    # READ -- OK
    # curl http://localhost:8888/user

    #LOGIN
    # curl -X POST http://localhost:8888/user/login -H "Content-Type: application/json" -d '{"email": "asdsad", "senha": "123"}

# ======================================================


# ========================== MODULE =============================

    # READ - OK
    # curl http://localhost:8888/module

    # ADD 
    # curl -X POST http://localhost:8888/module/insert -H "Content-Type: application/json" -d '{"nome": "Module 3", "descricao":"Teste", "link": "asdjsadioaj"}'

    # EDIT 
    # curl -X POST http://localhost:8888/module/edit -H "Content-Type: application/json" -d '{"id":5, "nome": "Module teste", "descricao":"fa", "link": "asd@ads"}'

    # DELETE 
    # curl -X POST http://localhost:8888/module/delete -H "Content-Type: application/json" -d '{"id": 1}'

# ======================================================

# ========================== PERMISSION =============================

    # curl -X POST http://localhost:8888/user/setPermission -H "Content-Type: application/json" -d '{"id": 1, }'

# ======================================================


