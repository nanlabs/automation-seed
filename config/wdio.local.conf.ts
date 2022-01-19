export const config: WebdriverIO.Config = {
  specs: ['./test/specs/**/*.ts'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      acceptInsecureCerts: true,
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.google.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: [['allure', { outputDir: 'reports' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  // autoCompileOpts: {
  //   autoCompile: true,
  //   tsNodeOpts: {
  //     transpileOnly: true,
  //     project: 'tsconfig.json',
  //   },
  // },
  // beforeSession: async function () {
	// 	require('@babel/register');
	// },
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
  onComplete: async function() {
		console.log('// Test execution has completed //');
	},
	onPrepare: async function () {
		console.log('// Test execution has started //');
	},
};
