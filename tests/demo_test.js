
Feature('Google Search');

Scenario('Search with correct selector', async ({ I }) => {
    I.amOnPage('https://www.google.com');
    I.fillField('//input[@name="q"]', 'CodeceptJS');
    I.pressKey('Enter');
    I.waitForElement('//div[@id="search"]', 10);
    I.seeElement('//div[@id="search"]');
});
