const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to set the auth token cookie
router.post('/setAuthToken', authMiddleware.setAuthTokenCookie);

module.exports = router;
