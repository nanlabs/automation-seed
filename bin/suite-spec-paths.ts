import glob from 'glob';
import { config } from '../config/wdio.suites.conf';

export const getSuiteSpecFiles = (
  globs: string | string[],
): string[] => {
  const files = Array.isArray(globs) ? globs : [globs];
  const specs = files.reduce((acc, file) => [...acc, ...glob.sync(file)], [] as string[]);
  return specs;
};

const suiteName = process.argv[2];

if (!suiteName) {
  process.exit(0);
}

if (!config.suites) {
  process.exit(0);
}

const suite = config.suites[suiteName];

if (!suite) {
  process.exit(0);
}

const suiteChunk = getSuiteSpecFiles(suite);

for (const spec of suiteChunk) {
  console.log(spec);
}