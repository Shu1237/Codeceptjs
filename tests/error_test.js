Feature('Login Form');

Scenario('Đăng nhập với lỗi locator', ({ I }) => {
  I.amOnPage('https://github.com/login');              // Truy cập trang đăng nhập GitHub
  I.fillField('Username or email address', 'testuser'); // Điền username
  I.fillField('Password', 'testpass123');              // Điền password
  I.click('');            // Lỗi: Click vào phần tử không tồn tại
});