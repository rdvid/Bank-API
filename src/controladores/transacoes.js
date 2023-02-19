const pool = require("../conexao")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const senhajwt = require("../senhajwt")


const listarTransacoes = async (req, res) => {
    try {
        
        const {rows} = await pool.query('select * from transacoes where usuario_id = $1', 
        [req.usuario.id])

        return res.json(rows)

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params

    try {
        const transacao = await pool.query('select * from transacoes where usuario_id = $1 and id = $2', 
        [req.usuario.id, id])

        if (!transacao) {
            return res.status(404).json({ mensagem: "Transação não existente"})
        }

        return res.status(200).json(transacao.rows)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    if(!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios"})
    }

    try {
        
    } catch (error) {
        
    }

}




const atualizarTransacao = async (req, res) => {


}


module.exports = {
    listarTransacoes,
    detalharTransacao,
    atualizarTransacao
}