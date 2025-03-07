// services/userStatService.js
const {db} = require('../config/db');

// Reference to the userStats collection
const userStatsRef = db.collection("userStats");

// 1️⃣ Initialize user stats when a new user signs up
exports.initializeUserStats = async (userId) => {
    const stats = {
        totalNumberOfDungeons: 0,
        noOfCompletedDungeons: 0,
        timeSpentInFocus: 0, // in minutes
        noOfAbandonedDungeons: 0,
    };

    await userStatsRef.doc(userId).set(stats);
    return stats;
};

// 2️⃣ Update specific user stats
exports.updateUserStats = async (userId, updates) => {
    const userStatDoc = userStatsRef.doc(userId);

    await db.runTransaction(async (transaction) => {
        const userStatSnapshot = await transaction.get(userStatDoc);

        if (!userStatSnapshot.exists) {
            throw new Error("User stats not found");
        }

        // Merge existing stats with the updates
        const currentStats = userStatSnapshot.data();
        const updatedStats = { ...currentStats };

        for (const [key, value] of Object.entries(updates)) {
            if (typeof value === "number") {
                updatedStats[key] = (updatedStats[key] || 0) + value;
            }
        }

        transaction.set(userStatDoc, updatedStats);
    });

    const updatedSnapshot = await userStatDoc.get();
    return updatedSnapshot.data();
};

// 3️⃣ Retrieve user stats
exports.getUserStats = async (userId) => {
    const userStatDoc = await userStatsRef.doc(userId).get();

    if (!userStatDoc.exists) {
        throw new Error("User stats not found");
    }

    return userStatDoc.data();
};
