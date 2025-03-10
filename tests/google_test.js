Feature('Google Tests');

// Test case 1: Kiểm tra tiêu đề trang Google
Scenario('Kiểm tra tiêu đề trang Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.seeInTitle('Google');
});

// Test case 2: Tìm kiếm từ khóa
Scenario('Tìm kiếm từ khóa trên Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.fillField('q', 'CodeceptJS');
  I.pressKey('Enter');
  I.see('CodeceptJS');
});

// Test case 3: Kiểm tra footer trên Google
Scenario('Kiểm tra footer trên Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.scrollPageToBottom();
  I.see('Advertising');
  I.see('Privacy');
  I.see('Terms');
});

// Test case 4: Kiểm tra lỗi khi truy cập trang không tồn tại
Scenario('Kiểm tra truy cập trang không tồn tại', ({ I }) => {
  I.amOnPage('https://www.google.com/nonexistent');
  I.see('404');
});
