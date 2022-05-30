import { getWebdriverLogLevel, getWebdriverOutputDir, getWebdriverSpecFileRetries } from './env';

export const config: Partial<WebdriverIO.Config> = {
  logLevel: getWebdriverLogLevel(),
  specFileRetries: getWebdriverSpecFileRetries(),
  outputDir: getWebdriverOutputDir(),
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [['allure', { outputDir: 'reports' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  headers: {
    'Automation-Key': 'test',
  },
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
  onComplete: async function () {
    console.log('// Test execution has completed //');
  },
  onPrepare: async function () {
    console.log('// Test execution has started //');
  },
};
