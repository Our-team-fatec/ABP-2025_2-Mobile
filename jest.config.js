module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(expo-status-bar|react-native|@react-native|expo|@expo|@unimodules|unimodules|@react-navigation|expo-router)/)',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest-setup.js',
    '@testing-library/jest-native/extend-expect'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};