
Feature('Generated Test');

Scenario('search apple', ({ I }) => {
  I.amOnPage('https://www.apple.com');
  I.fillField('q', 'apple');
  I.pressKey('Enter');
  I.see('apple');
});


