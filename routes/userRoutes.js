const express = require('express');
const userController = require('../controllers/userController');
const router =  express.Router();

router.post('/new-user', userController.createNewUser);
router.get('/get-user', userController.getUserByEmail);
router.get('/all-users', userController.getAllUsers);
router.post('/updateDisplayInfo', userController.updateDisplayInformation);
router.post('/log-in', userController.getUserLogin);

module.exports = router;