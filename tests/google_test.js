
Feature('Google Tests');

Scenario('Kiểm tra tiêu đề trang Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.seeInTitle('Google');
});

Scenario('Tìm kiếm từ khóa trên Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.fillField('q', 'CodeceptJS');
  I.pressKey('Enter');
  I.waitForElement('#search', 10);
  I.see('CodeceptJS');
});

Scenario('Kiểm tra footer trên Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.scrollToBottom();
  I.see('Advertising');
  I.see('Privacy');
  I.see('Terms');
});

Scenario('Kiểm tra lỗi khi truy cập trang không tồn tại', ({ I }) => {
  I.amOnPage('https://www.google.com/nonexistent');
  I.waitForElement('//body', 10);
  I.see('404');
});