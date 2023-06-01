module.exports = {
  preset: 'jest-expo', // 👈 note this preset
  transform: {
    '\\.[jt]sx?$': 'babel-jest' // 👈 note this transform key
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@meteorrn|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
  ],
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageReporters: ['html'],
  setupFiles: ['./jestSetup.js']
}
