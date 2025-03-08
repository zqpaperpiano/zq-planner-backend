// controllers/userStatController.js
const userStatService = require("../services/userStatService");

// 1️⃣ Initialize stats for a new user
exports.initializeUserStats = async (req, res) => {
    try {
        const uid = req.user.uid;
        if (!uid) {
            return res.status(400).json({ error: "uid is required" });
        }

        const stats = await userStatService.initializeUserStats(uid);
        return res.status(201).send(stats);
    } catch (error) {
        console.error("Error initializing user stats:", error);
        res.status(500).json({ error: error.message });
    }
};

// 2️⃣ Update specific user stats
exports.updateUserStats = async (req, res) => {
    try {
        const { updates } = req.body; // Get uid and updates from request body
        const uid = req.user.uid;

        if (!uid || !updates) {
            return res.status(400).json({ error: "uid and updates are required" });
        }

        const updatedStats = await userStatService.updateUserStats(uid, updates);
        return res.status(200).json({ message: "User stats updated", updatedStats });
    } catch (error) {
        console.error("Error updating user stats:", error);
        res.status(500).json({ error: error.message });
    }
};

// 3️⃣ Get user stats
exports.getUserStats = async (req, res) => {
    try {   
        const uid = req.user.uid;
        if (!uid) {
            return res.status(400).json({ error: "uid is required" });
        }

        const stats = await userStatService.getUserStats(uid);
        return res.status(200).json({ stats });
    } catch (error) {
        console.error("Error retrieving user stats:", error);
        res.status(500).json({ error: error.message });
    }
};
