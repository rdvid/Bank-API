const pool = require("../conexao")
const { coletarIdToken } = require("./usuarios")

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

        return res.status(200).json(transacao.rows[0])
    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}


const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const token = req.headers.authorization.split(' ')[1];
    const id = coletarIdToken(token)

    try {
        
        if(!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios"})
        }

        if(valor < 0){
            return res.status(400).json({mensagem: "Valor inválido"})
        }

        if(tipo !== 'entrada' && tipo !== 'saida'){
            return res.status(400).json({mensagem: "valor tipo precisa ser 'entrada' ou 'saida' (sem acentuação e/ou letras maiúsculas)."})
        }

        const dataDaTransacao = new Date(data);

        if(!dataDaTransacao){
            return res.status(400).json({mensagem: "por favor, informe uma data valida"})
        }

        var {rows} = await pool.query(`select descricao from categorias where id = $1`, [categoria_id])

        if(rows.length < 1){
            return res.status(404).json({mensagem: "não existe nenhuma categoria com esse id"})
        }

        var {rows} = await pool.query(`
            insert into transacoes
            (descricao, valor, data, categoria_id, usuario_id, tipo)
            values
            ($1, $2, $3, $4, $5, $6)
            returning *;
        `, [descricao, valor, dataDaTransacao, categoria_id, id, tipo]);

        const {...transacao} = rows[0]

        return res.status(201).json(transacao)


    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }

}


const atualizarTransacao = async (req, res) => {
    const {descricao, valor, data, categoria_id, tipo} = req.body;
    const {id} = req.params;

    try {
        if(!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios"})
        }

        if(valor < 0){
            return res.status(400).json({mensagem: "Valor inválido"})
        }

        if(tipo !== 'entrada' && tipo !== 'saida'){
            return res.status(400).json({mensagem: "valor tipo precisa ser 'entrada' ou 'saida' (sem acentuação e/ou letras maiúsculas)."})
        }

        const dataDaTransacao = new Date(data);

        if(!dataDaTransacao){
            return res.status(400).json({mensagem: "por favor, informe uma data valida"})
        }

        var {rows} = await pool.query(`select descricao from categorias where id = $1`, [categoria_id])

        if(rows.length < 1){
            return res.status(404).json({mensagem: "não existe nenhuma categoria com esse id"})
        }

        await pool.query(`
            update transacoes
            set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
            where id = $6;
        `, [descricao, valor, dataDaTransacao, categoria_id, tipo, id]);

        return res.status(201).send();

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno no servidor."})
    }


}

module.exports = {
    listarTransacoes,
    detalharTransacao,
    atualizarTransacao,
    cadastrarTransacao
}