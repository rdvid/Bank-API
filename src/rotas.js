const express = require("express")
const listarCategorias = require("./controladores/categorias")
const { listarTransacoes, detalharTransacao, atualizarTransacao, cadastrarTransacao } = require("./controladores/transacoes")
const { cadastrarUsuario, loginUsuario, detalharUsuario, atualizarUsuario } = require("./controladores/usuarios")
const verificarLogin = require("./intermediarios/verificarLogin")
const { listarExtrato } = require("./controladores/extratos")
const rotas = express()

rotas.post("/usuario", cadastrarUsuario)
rotas.post("/login", loginUsuario)

rotas.use(verificarLogin)

rotas.get("/usuario", detalharUsuario)
rotas.put("/usuario", atualizarUsuario)

rotas.get("/categoria", listarCategorias)

rotas.get("/transacao/extrato", listarExtrato)

rotas.get("/transacao", listarTransacoes)
rotas.get("/transacao/:id", detalharTransacao)
rotas.post("/transacao", cadastrarTransacao)
rotas.put("/transacao/:id", atualizarTransacao)



module.exports = rotas