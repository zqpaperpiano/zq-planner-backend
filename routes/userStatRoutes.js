// routes/userStatRoutes.js
const express = require("express");
const router = express.Router();
const userStatController = require("../controllers/userStatController");
const verifyToken = require('../middleware/authMiddleware');

// Initialize user stats for a new user (POST /api/userStats/init)
router.get("/init", verifyToken, userStatController.initializeUserStats);
// Update user stats (POST /api/userStats/update)
router.post("/update", verifyToken, userStatController.updateUserStats);
// Get user stats (GET /api/userStats/:userId)
router.get("/:userId", verifyToken, userStatController.getUserStats);

module.exports = router;
