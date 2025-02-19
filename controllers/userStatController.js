// controllers/userStatController.js
const userStatService = require("../services/userStatService");

// 1️⃣ Initialize stats for a new user
exports.initializeUserStats = async (req, res) => {
    try {
        const { userId } = req.body; // Get userId from request body

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const stats = await userStatService.initializeUserStats(userId);
        return res.status(201).json({ message: "User stats initialized", stats });
    } catch (error) {
        console.error("Error initializing user stats:", error);
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ Update specific user stats
exports.updateUserStats = async (req, res) => {
    try {
        const { userId, updates } = req.body; // Get userId and updates from request body

        if (!userId || !updates) {
            return res.status(400).json({ error: "userId and updates are required" });
        }

        const updatedStats = await userStatService.updateUserStats(userId, updates);
        return res.status(200).json({ message: "User stats updated", updatedStats });
    } catch (error) {
        console.error("Error updating user stats:", error);
        res.status(500).json({ error: error.message });
    }
};

// 3️⃣ Get user stats
exports.getUserStats = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from URL parameter

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const stats = await userStatService.getUserStats(userId);
        return res.status(200).json({ stats });
    } catch (error) {
        console.error("Error retrieving user stats:", error);
        res.status(500).json({ error: error.message });
    }
};
