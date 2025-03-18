
Feature('Google Search');

Scenario('User searches for food', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.fillField('q', 'food');
  I.pressKey('Enter');
  I.waitForElement('h3', 5);
});
