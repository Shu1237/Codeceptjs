Feature('Demo Test'); // Tên của feature này

Scenario('Kiểm tra tiêu đề trang Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.seeInTitle('Google');
});

Scenario('Tìm kiếm trên Google', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.fillField('q', 'CodeceptJS');
  I.pressKey('Enter'); // Giả lập nhấn Enter thay vì nhấn nút
  I.wait(2); // Đợi vài giây để trang kết quả hiển thị
  I.see('CodeceptJS');
});

Scenario('Kiểm tra hiển thị nút Google Search', ({ I }) => {
  I.amOnPage('https://www.google.com');
  I.seeElement('input[name="btnK"]'); // Kiểm tra xem nút "Google Search" có tồn tại không
});