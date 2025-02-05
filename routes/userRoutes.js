const express = require('express');
const userController = require('../controllers/userController');
const router =  express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/new-user', verifyToken, userController.createNewUser);
router.post('/googleUser', verifyToken, userController.gettingGoogleLogins);
router.get('/all-users', userController.getAllUsers);
router.post('/updateDisplayInfo', userController.updateDisplayInformation);
router.post('/log-in', verifyToken, userController.getUserLogin);
router.post('/newUserPreferences', userController.updateUserPreferences);
router.post('/getUser', verifyToken, userController.getUserByUid);
router.post('/updateUserEventCategories', verifyToken, userController.updateUserEventCategories);

module.exports = router;

