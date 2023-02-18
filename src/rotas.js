const express = require("express")
const { cadastrarUsuario, loginUsuario, detalharUsuario } = require("./controladores/usuarios")
const verificarLogin = require("./intermediarios/verificarLogin")
const rotas = express()

rotas.post("/usuario", cadastrarUsuario)
rotas.post("/login", loginUsuario)

//rotas.use(verificarLogin)

rotas.get("/usuario", detalharUsuario)


module.exports = rotas