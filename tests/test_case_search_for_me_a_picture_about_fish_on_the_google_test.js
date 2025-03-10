
Feature('Generated Test');

Scenario('Search for a fish picture on Google', ({ I }) => {
    I.amOnPage('https://www.google.com');
    I.fillField('textarea[name="q"]', 'fish');
    I.pressKey('Enter');
    I.waitForElement('img[alt="fish"]', 5);
    I.seeElement('img[alt="fish"]');
});


