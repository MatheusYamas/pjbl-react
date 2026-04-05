const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ativoRoutes = require('./src/routes/AtivoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ system: "Gerenciador de Ativos", developer: "Matheus Yamamoto Dias" });
});


app.use('/api/ativos', ativoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});