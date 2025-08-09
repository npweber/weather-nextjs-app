module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}; 