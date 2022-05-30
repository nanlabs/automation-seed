require('ts-node').register({
  transpileOnly: false,
  files: true,
  project: './tsconfig.json',
});

const path = require('path');
const merge = require('deepmerge');
const commonConfig = require('./config/wdio.common.conf.ts');
const envConfig = require('./config/wdio.env.conf.ts');
const suitesConfig = require('./config/wdio.suites.conf.ts');
const capabilitiesConfig = require('./config/wdio.capabilities.conf.ts');

const { EXECUTION_MODES, getExecutionMode, getAdditionalConfigs } = require('./config/env');

const CONFIGS = getAdditionalConfigs();

const configs = [commonConfig.config, suitesConfig.config, envConfig.config];

const appendConfig = (configName, availableValues) => {
  if (availableValues && !availableValues.includes(configName)) {
    throw new Error(`\`${configName}\` is not a valid value. Available values: ${availableValues.join(', ')}`);
  }

  const { config } = require(path.join(__dirname, 'config', `wdio.${configName}.conf.ts`));
  configs.push(config);
};

appendConfig(getExecutionMode(), EXECUTION_MODES);
CONFIGS.forEach((config) => appendConfig(config));

configs.push(capabilitiesConfig.config);

const config = configs.reduce((acc, config) => {
  // the clone false option is needed to avoid loosing the original `this` context
  return merge(acc, config, { clone: false });
}, {});

if (process.env.DEBUG_CONFIG) {
  console.log(JSON.stringify(config, null, 2));
}

exports.config = config;
