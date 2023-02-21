const pool = require("../conexao")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const senhajwt = require("../senhajwt")

const coletarIdToken = (token) => {
    let tokenDecode = jwt.decode(token, {complete: true});
    return tokenDecode.payload.id;
}

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Os campos nome, email e senha são obrigatórios"})
    }

    try {
        const verificarEmail = await pool.query(`select * from usuarios where email = $1`, 
        [email]
        )

        if (verificarEmail.rowCount != 0) {
            return res.status(400).json({ mensagem: "Email já consta no nosso cadastro"})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const novoUsuario = await pool.query(`insert into usuarios (nome, email, senha) 
        values ($1, $2, $3) returning *`, 
        [nome, email, senhaCriptografada])

        const { senha: _, ...usuario} = novoUsuario.rows[0]

        console.log(senha, usuario)

        return res.status(201).json(usuario)
        
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor"})
    }
}

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body

    if(!email || !senha) {
        return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)."})
    }

    try {
        const usuario = await pool.query(`select * from usuarios where email = $1`,
        [email])

        if(usuario.rowCount < 1){
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)."})
        }

        const verificarSenha = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!verificarSenha) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)."})
        }

        const token = jwt.sign({ id: usuario.rows[0].id}, senhajwt, {expiresIn: "6h"})

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        return res.json({
            usuario: usuarioLogado,
            token
        })
    } catch (error) { 
        return res.status(500).json({ mensagem: "Erro interno do servidor"})
    }
}

const detalharUsuario = async (req, res) => {
    try {
        const {rows} = await pool.query('select * from usuarios where id = $1', [req.usuario.id])
        
        const {senha: _, ...usuarioInfo} = rows[0]

        return res.status(200).json(usuarioInfo)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}


const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Os campos nome, email e senha são obrigatórios"})
    }

    try {
        const checarEmail = await pool.query("select * from usuarios where email = $1", 
        [email])

        if (checarEmail.rowCount == 0 || checarEmail.rowCount > 0 && req.usuario.id == checarEmail.rows[0].id) {
            const senhaNova = await bcrypt.hash(senha, 10)
        
        await pool.query('update usuarios set nome = $1, email = $2, senha = $3 where id = $4', 
        [nome, email, senhaNova, req.usuario.id])

        return res.status(201).json()
        }

        return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário."})
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }

}

module.exports = {
    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario,
    coletarIdToken
}
