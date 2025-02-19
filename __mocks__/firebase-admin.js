const admin = jest.createMockFromModule("firebase-admin");

admin.initializeApp = jest.fn();

// Mock Firestore
const mockFirestore = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      set: jest.fn(() => Promise.resolve()),
      get: jest.fn(() =>
        Promise.resolve({
          exists: true,
          data: () => ({
            totalNumberOfDungeons: 0,
            noOfCompletedDungeons: 0,
            timeSpentInFocus: 0,
            noOfAbandonedDungeons: 0,
          }),
        })
      ),
      update: jest.fn(() => Promise.resolve()),
    })),
  })),
  runTransaction: jest.fn((updateFunction) => updateFunction({
    get: jest.fn(() =>
      Promise.resolve({
        exists: true,
        data: () => ({
          totalNumberOfDungeons: 0,
          noOfCompletedDungeons: 0,
          timeSpentInFocus: 0,
          noOfAbandonedDungeons: 0,
        }),
      })
    ),
    update: jest.fn(() => Promise.resolve()),
  })),
};

// Assign Firestore mock to admin.firestore()
admin.firestore = () => mockFirestore;

module.exports = admin;
