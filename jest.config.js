module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(expo-status-bar|react-native|@react-native|expo|@expo|@unimodules|unimodules|@react-navigation)/)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect'
  ],
};