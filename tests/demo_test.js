Feature('Google Search');

Scenario('Search with incorrect selector', ({ I }) => {
    I.amOnPage('https://www.google.com');
    I.fillField('input[name="wrong_q"]', 'CodeceptJS'); // Sai selector
    I.pressKey('Enter');
    I.see('CodeceptJS');
});
