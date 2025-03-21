// services/userStatService.js
const {db} = require('../config/db');

// Reference to the userStats collection
const userStatsRef = db.collection("userStats");

// 1️⃣ Initialize user stats when a new user signs up
exports.initializeUserStats = async (uid) => {

    try{
        const userStatDoc = await userStatsRef.doc(uid).get();
        if(userStatDoc.exists){
            return userStatDoc.data();
        }else{
            const stats = await userStatsRef.doc(uid).set({
                totalNumberOfDungeons: 0,
                noOfCompletedDungeons: 0,
                timeSpentInFocus: 0, // in minutes
                noOfCompletedFocusSessions: 0,
                noOfAbandonedFocusSessions: 0,
                noOfAbandonedDungeons: 0,
                level: 1,
                xp: 0,
                toNextLevel: 150,
            })
            return stats;
        }
    }catch(err){
        throw err;
    }

   
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

    console.log('received: ', userStatDoc.data());

    return userStatDoc.data();
};
