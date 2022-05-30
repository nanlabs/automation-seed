import { getRemoteExecutionServerHost, getRemoteExecutionServerPort } from './env';

export const config: Partial<WebdriverIO.Config> = {
  hostname: getRemoteExecutionServerHost(),
  path: '/wd/hub', // Required to work with wdio v6+
  port: getRemoteExecutionServerPort(),
};
