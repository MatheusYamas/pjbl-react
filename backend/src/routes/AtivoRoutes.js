const express = require('express');
const router = express.Router();
const AtivoController = require('../controllers/AtivoController');

router.get('/', AtivoController.listar);
router.post('/', AtivoController.criar);
// Implementar aqui também o atualizar e deletar NÃO ESQUECERRRRRRR

module.exports = router;