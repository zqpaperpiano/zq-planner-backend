module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^firebase-admin$": "<rootDir>/__mocks__/firebase-admin.js",  
  },
};