<div align="center">
<h1>Automation Seed</h1>

[Docs](#) |
[Contributing](https://github.com/nanlabs/automation-seed/blob/main/CONTRIBUTING.md)

</div>
<div align="center">

[![Periodic Check][workflowbadge]][workflowurl]
[![Report Deployment][deploydocsbadge]][deploydocsurl]
[![License: MIT][licensebadge]][licenseurl]

</div>

---

- [Quickstart](#quickstart)
- [Dependencies](#dependencies)
- [Executing Tests](#executing-tests)
  - [Available Scripts](#available-scripts)
  - [Execute Suite](#execute-suite)
  - [Execute Spec Files](#execute-spec-files)
    - [Capabilities](#capabilities)
  - [Environment Variables](#environment-variables)
- [Remote Tests execution using Selenoid](#remote-tests-execution-using-selenoid)
- [CI/CD](#cicd)
- [Config Files](#config-files)
  - [Reporters](#reporters)
  - [Spec](#spec)
- [Creating Tests](#creating-tests)

## Quickstart

```sh
$ git clone git@github.com:nanlabs/automation-seed.git
$ cd automation-seed
$ nvm use
$ yarn
$ yarn test --help
```

## Dependencies

This installation guide assumes you have chocolatey for Windows, brew for Mac OS, or are running a Debian based Linux distro. Additionally, you should have NVM and yarn installed on your system.

- **OpenJDK**: JDK is required for being able to run tests locally on your machine. The only tested and proven version is OpenJDK 11 JRE.

  - Linux: `sudo apt install openjdk-11-jre-headless`
  - Mac: `brew tap AdoptOpenJDK/openjdk && brew install adoptopenjdk11-jre`
  - Windows: `choco install adoptopenjdk11jre`

- **NodeJS**: The easiest way to install NodeJS is with NVM. To install the correct version of NodeJS, set the current active directory of a terminal session to the cloned repository location and run `nvm install`

- **Framework Dependencies**: To intall the required dependencies, set the current active directory of a terminal session to the cloned repository location and run `yarn install`

- **Visual Studio**: To be able to utilize debugging you'll need VS Code.

## Executing Tests

You can specify the `suite`s within `./config/wdio.suites.conf.ts`.

### Available Scripts

- `yarn test:local` will execute the tests using your local machine capabilities
- `yarn test:remote` will execute the tests using the capabilities from Selenoid - Check the section [Remote Tests execution using Selenoid](#remote-tests-execution-using-selenoid) for more information about remote execution.
- `yarn test:docker` - _Soon_.

### Execute Suite

> Example:

```sh
FIREFOX=1 yarn test:local --suite ci.periodic
```

### Execute Spec Files

> Example:

```sh
FIREFOX=1 yarn test:local --spec "./test/specs/**/*.ts"
```

#### Capabilities

You can specify the following environment variables to set the capabilities you want to use:

```sh
# Will use upto one instance of chrome, upto three instances of firefox and 2 instances of safari
# locally
CHROME=1 FIREFOX=3 SAFARI=2 yarn test:local --suite ci.periodic

# Will use upto two instances of chrome and one instance of firefox in the remote server
CHROME=2 FIREFOX=1 yarn test:remote --suite ci.periodic
```

### Environment Variables

- `WEBDRIVER_LOGLEVEL`: will specify the loglevel for webdriver. `info` by default.
- `WEBDRIVER_SPEC_FILE_RETRIES`: The number of retry attempts for an entire specfile when it fails as a whole. `0` by default.
- `OUTPUT_DIR`: if set, it will specify the directory in which we want to store all the logs. Will print the logs on the `stdout` by default.
- `MAX_INSTANCES`, `CHROME`, `FIREFOX`, `SAFARI` are used to specify the capabilities of the test execution.
- `BROWSER_VISIBLE` will execute the browser without `headless` mode.

**Example:**

```sh
FIREFOX=1
BROWSER_VISIBLE=true
export FIREFOX BROWSER_VISIBLE
yarn test:local --suite ci.periodic
```

---

## Remote Tests execution using Selenoid

When using the `remote` execution mode it is needed to provide a url and port for a running Selenium Hub. For that we hightly recommend using [Selenoid](https://github.com/aerokube/selenoid).

You can give it a try locally as follows:

```sh
yarn selenoid --start --ui
FIREFOX=1 yarn test:remote --suite ci.periodic
```

you can learn more about the `selenoid` script by running `yarn selenoid --help`.

It is possible to specify another Selenium Hub with the env variables `SELENIUM_HUB_URL` and `SELENIUM_HUB_PORT`.

## CI/CD

We have different workflows that will be used on CI/CD using Github Actions. The workflows will be executed using Selenoid so it is needed to only use the `yarn test:remote` script inside them:

You can go to [Actions](https://github.com/nanlabs/automation-seed/actions) to see the list of available workflows.

For example, you can use the Custom Workflow Execution to execute any specific suite on Github Actions using Selenoid:

![image](https://user-images.githubusercontent.com/17727170/170927815-498019e1-ef7b-4bba-8694-9a1c79805c45.png)

---

## Config Files

Config files are used to specify the settings for the browser, logging, reporter and other configurations. Each config is setup for a different environment with the server or local runner set and the browers to run the tests on defined.

The different configs can be found under `./config/`. Each config inherits from `wdio.common.conf.ts` but a config property set in the main config can be overwritten in any inherited config.

### Reporters

We use two different reporters in this framework. This allows to have results displayed either to the terminal used for executing tests or sent directly to GitHub Pages.

### Spec

Test reporter, that prints detailed results to console and is useful for running and debugging tests locally.

## Creating Tests

You can read the full documentation about how to create tests, the existing tools and design patterns we use [here](./TESTS_DESIGN.md)

[workflowbadge]: https://github.com/nanlabs/automation-seed/actions/workflows/periodic.yml/badge.svg
[deploydocsbadge]: https://github.com/nanlabs/automation-seed/actions/workflows/main.yml/badge.svg
[licensebadge]: https://img.shields.io/badge/License-MIT-blue.svg
[workflowurl]: https://github.com/nanlabs/automation-seed/actions/workflows/periodic.yml
[deploydocsurl]: https://github.com/nanlabs/automation-seed/actions/workflows/main.yml
[licenseurl]: https://github.com/nanlabs/automation-seed/blob/main/LICENSE
