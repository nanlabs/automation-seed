export const config: WebdriverIO.Config = {
  specs: ['./test/specs/**/*.ts'],
  exclude: [],
  maxInstances: 5,
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub', // Required to work with wdio v6+
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: '94.0',
      'selenoid:options': {
        enableVNC: true,
        enableVideo: true,
      },
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.google.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [['docker', {
    image: 'aerokube/selenoid',
    healthCheck: 'http://localhost:4444/status',
    options: {
        p: ['4444:4444'],
        // addHost: ['dockerhost:192.168.1.101'],
        // shmSize: '2g'
    }
  }]],
  framework: 'mocha',
  reporters: [['allure', { outputDir: 'reports' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
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
