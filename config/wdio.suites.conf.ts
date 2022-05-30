export const config: Partial<WebdriverIO.Config> = {
  suites: {
    debug: [],
    'ci.report': ['./test/specs/**/*.ts'],
    'ci.periodic': ['./test/specs/**/*.ts'],
    'ci.pull_request': ['./test/specs/**/*.ts'],
  },
};
