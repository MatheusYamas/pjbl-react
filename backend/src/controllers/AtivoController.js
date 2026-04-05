const db = require('../config/db');

const AtivoController = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const [rows] = await db.query('SELECT * FROM ativos LIMIT ? OFFSET ?', [limit, offset]);
            const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM ativos');

            res.json({ data: rows, meta: { total, page, limit } });
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar ativos" });
        }
    },

    searchId: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM ativos WHERE id = ?', [req.params.id]);
            if (rows.length === 0) return res.status(404).json({ error: "Ativo não encontrado" });
            res.json(rows[0]);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar ativo" });
        }
    },

    create: async (req, res) => {
        const { ticker, tipo, quantidade, preco_medio, data_compra } = req.body;

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
    },

    update: async (req, res) => {
        const { ticker, tipo, quantidade, preco_medio, data_compra } = req.body;
        try {
            const [result] = await db.query(
                'UPDATE ativos SET ticker=?, tipo=?, quantidade=?, preco_medio=?, data_compra=? WHERE id=?',
                [ticker, tipo, quantidade, preco_medio, data_compra, req.params.id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ error: "Ativo não encontrado" });
            res.json({ message: "Ativo atualizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar no banco" });
        }
    },

    delete: async (req, res) => {
        try {
            const [result] = await db.query('DELETE FROM ativos WHERE id = ?', [req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ error: "Ativo não encontrado" });
            res.json({ message: "Ativo removido com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar ativo" });
        }
    }
};

module.exports = AtivoController;