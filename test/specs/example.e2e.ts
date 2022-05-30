import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';
import allureReporter from '@wdio/allure-reporter';

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    allureReporter.addFeature('Login');

    await LoginPage.open();

    await LoginPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
  });
});
