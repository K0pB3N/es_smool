module.exports = {
  testEnvironmentOptions: { url: 'http://localhost/' },
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/tests/unit/*.test.(js)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@vue/test-utils$': '@vue/test-utils/dist/vue-test-utils.js',
    '^@vue/vue2-jest$': '@vue/vue2-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['html', 'text-summary'],
}
  // testMatch: [
  //   '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  // ],
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1',
  // },
  // snapshotSerializers: ['jest-serializer-vue']


// module.exports = {
//   testEnvironmentOptions: { url: 'http://localhost/' },
//   transform: {
//     '^.+\\.js$': 'babel-jest',
//     '^.+\\.vue$': 'vue-jest',
//     '^.+\\.jsx?$': 'babel-jest',
//     '^.+\\.svg$': '<rootDir>/__mocks__/svgTransform.js',
//     '^.+\\.css$': '<rootDir>/__mocks__/cssTransform.js',
//     '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/__mocks__/fileTransform.js',
//     '.*\\.(vue)$': 'vue-jest',
//     '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
//     '^.+\\.ts?$': 'ts-jest',
//     '^.+\\.tsx?$': 'ts-jest',
//     '^.+\\.svg$': 'jest-transform-stub',
//   }
// }