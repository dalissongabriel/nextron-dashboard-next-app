const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
