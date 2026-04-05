const db = require('../config/db');

const AtivoController = {
    listar: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM ativos');
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar ativos" });
        }
    },

    criar: async (req, res) => {
        const { ticker, tipo, quantidade, preco_medio, data_compra } = req.body;

        // Validação Simples (Requisito 25)
        if (!ticker || !tipo || !quantidade) {
            return res.status(400).json({ error: "Campos obrigatórios ausentes" });
        }

        try {
            await db.query(
                'INSERT INTO ativos (ticker, tipo, quantidade, preco_medio, data_compra) VALUES (?, ?, ?, ?, ?)',
                [ticker, tipo, quantidade, preco_medio, data_compra]
            );
            res.status(201).json({ message: "Ativo cadastrado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao salvar no banco" });
        }
    }
    // Implementar aqui também o atualizar e deletar NÃO ESQUECERRRRRRR
};

module.exports = AtivoController;