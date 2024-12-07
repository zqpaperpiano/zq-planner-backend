const express = require('express');
const dungeonController = require('../controllers/dungeonController');
const router = express.Router();

router.post('/createNewDungeon', dungeonController.createNewDungeon);

module.exports = router;