import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/$1',
  },
};

export default config;
