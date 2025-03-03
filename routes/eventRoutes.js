const express = require('express')
const router = express.Router();
const eventController = require('../controllers/eventController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/createNewEvent', verifyToken, eventController.createNewEvent);
router.get('/getAllEvents/:userId', verifyToken, eventController.getAllEvents);
router.get('/getEventById/:eventId', verifyToken, eventController.getEventById);
router.post('/updateEvent', verifyToken, eventController.updateEvent);
router.delete('/deleteEvent/:eventId', verifyToken, eventController.deleteEvent);

module.exports = router;