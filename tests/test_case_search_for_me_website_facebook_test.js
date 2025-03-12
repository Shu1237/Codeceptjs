
Feature('Facebook Website');

Scenario('Open Facebook and verify title', async ({ I }) => {
  I.amOnPage('https://www.facebook.com/');
  I.seeTitle('Facebook – log in or sign up');
});

Scenario('Verify email and password fields are present', async ({ I }) => {
  I.amOnPage('https://www.facebook.com/');
  I.seeElement('#email');
  I.seeElement('#pass');
});

Scenario('Attempt login with invalid credentials', async ({ I }) => {
  I.amOnPage('https://www.facebook.com/');
  I.fillField('#email', 'invalid_email@example.com');
  I.fillField('#pass', 'invalid_password');
  I.click('#loginbutton');
  I.waitForElement('div[aria-atomic="true"]', 10); // Wait for error message
  I.seeElement('div[aria-atomic="true"]');
});

Scenario('Verify "Create New Account" link is present', async ({ I }) => {
  I.amOnPage('https://www.facebook.com/');
  I.seeElement('a[data-testid="open-registration-flow"]');
});

Scenario('Verify Forgot password link is present', async ({ I }) => {
  I.amOnPage('https://www.facebook.com/');
  I.seeElement('a[href="https://www.facebook.com/login/identify/?ctx=recover&ars=royal_blue_bar"]');
});

