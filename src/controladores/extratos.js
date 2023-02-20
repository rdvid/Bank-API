const pool = require("../conexao")

const listarExtrato = async (req, res) => {
    try {
        const {rows} = await pool.query('select * from transacoes where usuario_id = $1', 
        [req.usuario.id])

        let entrada = 0, saida = 0;

        if(rows.length < 1){
            return res.json({entrada: 0, saida: 0})
        }

        for(row of rows){
            if(row.tipo === 'entrada'){
                entrada += row.valor
            }else{
                saida += row.valor
            }
        }

        return res.json({
            entrada, 
            saida
        })

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"})
    }
}


module.exports = {
    listarExtrato
}