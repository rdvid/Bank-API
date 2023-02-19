const express = require("express")
const listarCategorias = require("./controladores/categorias")
const { cadastrarUsuario, loginUsuario, detalharUsuario, atualizarUsuario } = require("./controladores/usuarios")
const verificarLogin = require("./intermediarios/verificarLogin")
const rotas = express()

rotas.post("/usuario", cadastrarUsuario)
rotas.post("/login", loginUsuario)

rotas.use(verificarLogin)

rotas.get("/usuario", detalharUsuario)
rotas.put("/usuario", atualizarUsuario)

rotas.get("/categoria", listarCategorias)

module.exports = rotas