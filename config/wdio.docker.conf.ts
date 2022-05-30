export const config: Partial<WebdriverIO.Config & { dockerOptions: WebdriverIO.ServiceOption }> = {
  hostname: 'localhost',
  path: '/wd/hub', // Required to work with wdio v6+
  port: 4444,
  services: ['docker'],
  dockerOptions: {
    image: 'aerokube/selenoid',
    healthCheck: 'http://localhost:4444/status',
    options: {
      p: ['4444:4444'],
    },
  },
};
