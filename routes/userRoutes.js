const express = require('express');
const userController = require('../controllers/userController');
const router =  express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/new-user', verifyToken, userController.createNewUser);
router.get('/get-user', userController.getUserByEmail);
router.get('/all-users', userController.getAllUsers);
router.post('/updateDisplayInfo', userController.updateDisplayInformation);
router.post('/log-in', userController.getUserLogin);
router.post('/newUserPreferences', userController.updateUserPreferences);
router.post('/getUser', userController.getUserByUid);
router.get('/hi-user', userController.hiUser);

module.exports = router;