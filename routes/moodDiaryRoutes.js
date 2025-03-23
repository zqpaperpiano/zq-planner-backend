const express = require('express')
const moodDiaryController = require('../controllers/moodDiaryController')
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware')

router.post('/create-new-entry', verifyToken, moodDiaryController.createNewMoodDiaryEntry);
router.get('/get-all-entries', verifyToken, moodDiaryController.getAllMoodDiaryEntries);
router.get('/get-todays-entry', verifyToken, moodDiaryController.getTodaysMoodDiaryEntry);

module.exports = router;