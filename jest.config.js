module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts?(x)?$": "ts-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testRegex: "^.+\\.test.ts?(x)?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
