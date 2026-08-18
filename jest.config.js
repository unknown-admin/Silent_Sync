module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js',
  ],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/shared/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/shared/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@constants/(.*)$': '<rootDir>/src/shared/constants/$1',
    '^@app-types/(.*)$': '<rootDir>/src/shared/types/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-navigation|react-native-.*|@notifee|zustand|@tanstack|lucide-react-native)',
  ],
};
