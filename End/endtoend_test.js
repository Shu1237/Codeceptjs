Feature('Date Checker');

Scenario('Check a valid date', async ({ I }) => {
    I.amOnPage('/');
    I.fillField('#day', '15');
    I.fillField('#month', '8');
    I.fillField('#year', '2024');
    I.click('.button-check');
    I.waitForText('Valid Date', 2, '#result'); // Cập nhật theo thông báo thực tế
});

Scenario('Check an invalid date (e.g., Feb 30)', async ({ I }) => {
    I.amOnPage('/');
    I.fillField('#day', '30');
    I.fillField('#month', '2');
    I.fillField('#year', '2024');
    I.click('.button-check');
    I.waitForText('Invalid Date', 2, '#result');
});

Scenario('Check a leap year date (e.g., Feb 29, 2024)', async ({ I }) => {
    I.amOnPage('/');
    I.fillField('#day', '29');
    I.fillField('#month', '2');
    I.fillField('#year', '2024');
    I.click('.button-check');
    I.waitForText('Valid Date', 2, '#result');
});

Scenario('Check a non-leap year invalid date (e.g., Feb 29, 2023)', async ({ I }) => {
    I.amOnPage('/');
    I.fillField('#day', '29');
    I.fillField('#month', '2');
    I.fillField('#year', '2023');
    I.click('.button-check');
    I.waitForText('Invalid Date', 2, '#result');
});


