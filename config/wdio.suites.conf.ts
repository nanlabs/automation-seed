export const config: Partial<WebdriverIO.Config> = {
  suites: {
    'debug': [],
    'ci.periodic': ['./test/specs/**/*.ts'],
    'ci.pull_request': ['./test/specs/**/*.ts'],
  },
};
