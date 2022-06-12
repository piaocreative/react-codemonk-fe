module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/**/*/Loadable*.{js,jsx}',
    '!app/utils/*.{js,jsx}',
    '!app/utils/Fields.js',
    '!app/utils/formValidations.js',
    '!app/components/ShowMore/*.{js,jsx}',
  ],
  testPathIgnorePatterns: ['<rootDir>/internals/', '<rootDir>/app/utils/', '<rootDir>/app/components/ShowMore/'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 50,
      functions: 70,
      lines: 70,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    'react-testing-library/cleanup-after-each',
    '<rootDir>/initializeTestSetup.js',
  ],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
};
