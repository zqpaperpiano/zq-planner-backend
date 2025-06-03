const express = require('express');
const dungeonController = require('../controllers/dungeonController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/create-new-dungeon', verifyToken, dungeonController.createNewDungeon);
router.get('/get-dungeon', verifyToken, dungeonController.getDungeonById);
router.get('/get-all-dungeons/:userId', verifyToken, dungeonController.getAllDungeons);
router.post('/update-dungeon-details', verifyToken, dungeonController.updateDungeonDetails); 
router.delete('/delete-dungeon', verifyToken, dungeonController.deleteDungeon);
router.post('/completed-dungeon', verifyToken, dungeonController.completedDungeon);

module.exports = router;   