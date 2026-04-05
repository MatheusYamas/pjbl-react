const express = require('express');
const router = express.Router();
const AtivoController = require('../controllers/AtivoController');

router.get('/', AtivoController.list);
router.post('/', AtivoController.create);
router.get('/:id', AtivoController.searchId);
router.put('/:id', AtivoController.update);
router.delete('/:id', AtivoController.delete);  

module.exports = router;