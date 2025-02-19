const userStatService = require("../services/userStatService");
const admin = require("firebase-admin");

const db = admin.firestore(); // This will use the mocked Firestore from __mocks__/firebase-admin.js

describe("User Stats Service", () => {
    const userId = "testUser123";

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mock calls before each test
    });

    test("should initialize user stats correctly", async () => {
        await userStatService.initializeUserStats("newUser456");
        expect(db.collection).toHaveBeenCalledWith("userStats");
        expect(db.collection().doc).toHaveBeenCalledWith("newUser456");
        expect(db.collection().doc().set).toHaveBeenCalledWith({
            totalNumberOfDungeons: 0,
            noOfCompletedDungeons: 0,
            timeSpentInFocus: 0,
            noOfAbandonedDungeons: 0,
        });
    });

    test("should update user stats correctly", async () => {
        const updates = { totalNumberOfDungeons: 1 };
        await userStatService.updateUserStats(userId, updates);

        expect(db.collection).toHaveBeenCalledWith("userStats");
        expect(db.collection().doc).toHaveBeenCalledWith(userId);
        expect(db.collection().doc().update).toHaveBeenCalledWith(updates);
    });

    test("should retrieve user stats correctly", async () => {
        const stats = await userStatService.getUserStats(userId);
        expect(stats.totalNumberOfDungeons).toBe(0);
    });

    test("should throw error when updating non-existent user stats", async () => {
        db.collection().doc().get.mockResolvedValueOnce({ exists: false }); // Simulate missing user

        await expect(userStatService.updateUserStats("nonExistentUser", { totalNumberOfDungeons: 1 }))
            .rejects
            .toThrow("User stats not found");
    });
});
