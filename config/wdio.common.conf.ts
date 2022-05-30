import { getWebdriverLogLevel, getWebdriverOutputDir, getWebdriverSpecFileRetries } from './env';
import allure from 'allure-commandline';

export const config: Partial<WebdriverIO.Config> = {
  logLevel: getWebdriverLogLevel(),
  specFileRetries: getWebdriverSpecFileRetries(),
  outputDir: getWebdriverOutputDir(),
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    [
      'allure',
      {
        outputDir: 'allure-results',
        addConsoleLogs: true,
      },
    ],
  ],
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
  onComplete: function () {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);

      generation.on('exit', function (exitCode: number) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log('Allure report successfully generated');
        resolve();
      });
    });
  },
  onPrepare: async function () {
    console.log('// Test execution has started //');
  },
};
