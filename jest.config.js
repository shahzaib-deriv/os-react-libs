export default {
  testEnvironment: "jsdom",
  transform: {},
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};
