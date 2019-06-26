const express = require('express');
const router = express.Router();
const challController = require('../app/api/controllers/challs');

router.get('/', challController.getAll);
router.post('/', challController.create);
router.get('/:challId', challController.getById);
router.put('/:challId', challController.updateById);
router.delete('/:challId', challController.deleteById);

module.exports = router;