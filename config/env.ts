import path from 'path';

export type WebDriverLogTypes = WebdriverIO.Config['logLevel'];

export type ExecutionMode = 'docker' | 'remote' | 'local';

export const EXECUTION_MODES: ExecutionMode[] = ['docker', 'remote', 'local'];

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

export const getRemoteExecutionServerHost = (): string | undefined => process.env.SELENIUM_HUB_URL || 'localhost';

export const getRemoteExecutionServerPort = (): number => {
  const port = process.env.SELENIUM_HUB_PORT;

  return port ? parseInt(port) : 4444;
};

export const getAdditionalConfigs = (): string[] => (process.env.CONFIGS || '')?.split(',').filter(Boolean);

export const getWebdriverLogLevel = (): WebDriverLogTypes =>
  (process.env.WEBDRIVER_LOGLEVEL || 'info') as WebDriverLogTypes;

export const getWebdriverSpecFileRetries = (): number =>
  process.env.WEBDRIVER_SPEC_FILE_RETRIES ? parseInt(process.env.WEBDRIVER_SPEC_FILE_RETRIES, 10) : 0;

export const getWebdriverOutputDir = (): string | undefined =>
  process.env.OUTPUT_DIR ? path.resolve(__dirname, process.env.OUTPUT_DIR) : undefined;

export type DisaredCapabilityName = 'chrome' | 'mobile_chrome' | 'firefox' | 'safari';

export const getDesiredCapabilitiesNames = (): DisaredCapabilityName[] => {
  const capabilitiesNames: DisaredCapabilityName[] = ['chrome', 'firefox', 'mobile_chrome', 'safari'];
  return capabilitiesNames.filter((name) => !!process.env[name.toUpperCase()]);
};

export const getCapabilitiesMaxInstances = (): number =>
  process.env.MAX_INSTANCES ? parseInt(process.env.MAX_INSTANCES) : 3;

export const getCapabilityMaxInstances = (capabilityName: DisaredCapabilityName): number => {
  const maxInstances = process.env[capabilityName.toUpperCase()] || '';

  return maxInstances ? parseInt(maxInstances) : 1;
};

export const getCapabilityOptionsOverride = (): Partial<WebDriver.DesiredCapabilities> =>
  getExecutionMode() === 'local'
    ? {}
    : {
        'selenoid:options': {
          enableVNC: true,
          enableVideo: true,
        },
      };

// isHeadlessMode: if process.env.BROWSER_VISIBLE has any falsy value, the browser will open in headless mode
export const isHeadlessMode = () => isFalsy(process.env.BROWSER_VISIBLE);

const isFalsy = (val: string | undefined): boolean => ['false', '0', 'no', 'n', 'f', '', undefined].includes(val);
