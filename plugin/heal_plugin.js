const event = require('codeceptjs').event;

module.exports = function () {
  event.dispatcher.on(event.test.failed, (test, err) => {
    console.log("\n🔴 Test failed: ", test.title);
    console.log("🛠️ Heal Plugin is trying to fix the issue...");

    // Ví dụ: Thử sửa selector lỗi
    if (err.message.includes('Field "input[name="q"]" was not found')) {
      console.log("✅ Sửa lại selector: Đổi input[name='q'] thành textarea[name='q']");
    }

    console.log("📌 Chi tiết lỗi: ", err.stack);
  });

  event.dispatcher.on(event.test.passed, (test) => {
    console.log("\n✅ Test passed after healing: ", test.title);
  });
};
