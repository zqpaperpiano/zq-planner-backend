const express = require('express');
const dungeonController = require('../controllers/dungeonController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/create-new-dungeon', dungeonController.createNewDungeon);
router.get('/get-dungeon', verifyToken, dungeonController.getDungeonById);
router.get('/get-all-dungeons', verifyToken, dungeonController.getAllDungeons);
router.post('/update-dungeon-details', verifyToken, dungeonController.updateDungeonDetails); 
router.post('/update-dungeon-completion', verifyToken, dungeonController.updateDungeonCompletions);
router.delete('/delete-dungeon', verifyToken, dungeonController.deleteDungeon);

module.exports = router;