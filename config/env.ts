import path from 'path';

/**
 * `DisaredCapabilityName` is a sum type that defines the possible capability names
 * to use.
 */
export type DisaredCapabilityName = 'chrome' | 'mobile_chrome' | 'firefox' | 'safari';

/**
 * `WebDriverLogTypes` is an alias of type WebdriverIO.Config['logLevel']
 * that defines the level of logging verbosity.
 */
export type WebDriverLogTypes = WebdriverIO.Config['logLevel'];

/**
 * `ExecutionMode` is a sum type that defines the possible execution modes to use.
 * Each execution mode is related with the file `config/wdio.${mode}.conf.ts`.
 */
export type ExecutionMode = 'docker' | 'remote' | 'local';

/**
 * `EXECUTION_MODES` list of possible execution modes.
 *
 * @type {ExecutionMode[]}
 */
export const EXECUTION_MODES: ExecutionMode[] = ['docker', 'remote', 'local'];

/**
 * `getExecutionMode` is a function that returns the correct mode to use based on
 * the environment variable `MODE`.
 *
 * @default `local`
 *
 * @returns {ExecutionMode} the execution mode to use
 */
export const getExecutionMode = (): ExecutionMode => {
  const executionMode = EXECUTION_MODES.includes(process.env.MODE as never)
    ? (process.env.MODE as ExecutionMode)
    : 'local';

  if (executionMode === 'docker') {
    console.warn('Execution mode with Docker Service is not supported yet. Will use `local` mode instead');
    return 'local';
  }

  return executionMode;
};

/**
 * `getRemoteExecutionServerHost` is a function that returns the
 * selenium hub host based on the environment variable `SELENIUM_HUB_HOST`.
 *
 * @default `localhost`
 *
 * @returns {string | undefined} the selenium hub host.
 */
export const getRemoteExecutionServerHost = (): string | undefined => process.env.SELENIUM_HUB_HOST || 'localhost';

/**
 * `getRemoteExecutionServerPort` is a function that returns the
 * selenium hub port based on the environment variable `SELENIUM_HUB_PORT`.
 *
 * @default `4444`
 *
 * @returns {number} the selenium hub port.
 */
export const getRemoteExecutionServerPort = (): number => {
  const port = process.env.SELENIUM_HUB_PORT;

  return port ? parseInt(port) : 4444;
};

/**
 * `getAdditionalConfigs` is a function that returns a list of configs
 * based on the environment variable `CONFIGS`.
 *
 * Each config will be associated with the path `config/wdio.${configName}.conf.ts`.
 *
 * @example
 * process.env.CONFIGS = 'config1,config2,config3'
 * const configs = getAdditionalConfigs()
 * console.log(configs) // ['config1', 'config2', 'config3']
 *
 * @returns {string[]} additional config files to be used.
 */
export const getAdditionalConfigs = (): string[] =>
  (process.env.CONFIGS || '')
    ?.split(',')
    .map((str) => str.trim())
    .filter(Boolean);

/**
 * `getWebdriverLogLevel` is a function that returns the level of logging verbosity.
 *
 * @default `info`
 *
 * @returns {WebDriverLogTypes} returns the level of logging verbosity
 */
export const getWebdriverLogLevel = (): WebDriverLogTypes =>
  (process.env.WEBDRIVER_LOGLEVEL || 'info') as WebDriverLogTypes;

/**
 * `getWebdriverSpecFileRetries` is a function that returns the
 * number of spec file retries based on the environment variable `WEBDRIVER_SPEC_FILE_RETRIES`.
 *
 * @default `0`
 *
 * @returns {number} number of spec file retries.
 */
export const getWebdriverSpecFileRetries = (): number =>
  process.env.WEBDRIVER_SPEC_FILE_RETRIES ? parseInt(process.env.WEBDRIVER_SPEC_FILE_RETRIES, 10) : 0;

/**
 * `getWebdriverOutputDir` is a function that returns the
 * output dir for logs based on the environment variable `OUTPUT_DIR`.
 *
 * @returns {string | undefined} output dir for logs.
 */
export const getWebdriverOutputDir = (): string | undefined =>
  process.env.OUTPUT_DIR ? path.resolve(__dirname, process.env.OUTPUT_DIR) : undefined;

/**
 * `getDesiredCapabilitiesNames` is a function that returns the available capabilities names.
 *
 * @returns {DisaredCapabilityName[]} available capabilities names.
 */
export const getDesiredCapabilitiesNames = (): DisaredCapabilityName[] => {
  const capabilitiesNames: DisaredCapabilityName[] = ['chrome', 'firefox', 'mobile_chrome', 'safari'];
  return capabilitiesNames.filter((name) => !!process.env[name.toUpperCase()]);
};

/**
 * `getCapabilitiesMaxInstances` is a function that returns the
 * number of max instances to run in parallel based on the environment variable `MAX_INSTANCES`.
 *
 * @default `0`
 *
 * @returns {number} number of max instances to run in parallel.
 */
export const getCapabilitiesMaxInstances = (): number =>
  process.env.MAX_INSTANCES ? parseInt(process.env.MAX_INSTANCES) : 3;

/**
 * `getCapabilityMaxInstances` is a function that returns the
 * number of max instances to run in parallel based on the environment variable for that browser.
 *
 * @param {DisaredCapabilityName} capabilityName - Capability name.
 *
 * @default `0`
 *
 * @returns {number} number of max instances to run in parallel for a given browser.
 */
export const getCapabilityMaxInstances = (capabilityName: DisaredCapabilityName): number => {
  const maxInstances = process.env[capabilityName.toUpperCase()] || '';

  return maxInstances ? parseInt(maxInstances) : 1;
};

/**
 * `getCapabilityOptionsOverride` is a function that returns the options overrides based on
 * the execution mode.
 *
 * @returns Partial<WebDriver.DesiredCapabilities> - options override for capabilities
 */
export const getCapabilityOptionsOverride = (): Partial<WebDriver.DesiredCapabilities> =>
  getExecutionMode() === 'local'
    ? {}
    : {
        'selenoid:options': {
          enableVNC: true,
          enableVideo: isVideoRecordingEnabled(),
        },
      };

/**
 * `isVideoRecordingEnabled` is a function that returns the
 * capabilities should be recorded or not based on the environment variable `ENABLE_VIDEO`.
 *
 * If `process.env.ENABLE_VIDEO` has not any falsy value and it is not being executed
 * in headless mode, the browser will be recorded.
 *
 * @returns {boolean} capabilities should use headless mode or not.
 */
export const isVideoRecordingEnabled = (): boolean => !isHeadlessMode() && !isFalsy(process.env.ENABLE_VIDEO);

/**
 * `isHeadlessMode` is a function that returns the
 * capabilities should use headless mode or not based on the environment variable `BROWSER_VISIBLE`.
 *
 * If `process.env.BROWSER_VISIBLE` has any falsy value, the browser will open in headless mode.
 *
 * @returns {boolean} capabilities should use headless mode or not.
 */
export const isHeadlessMode = () => isFalsy(process.env.BROWSER_VISIBLE);

const isFalsy = (val: string | undefined): boolean => ['false', '0', 'no', 'n', 'f', '', undefined].includes(val);
