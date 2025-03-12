const event = require('codeceptjs').event;
const AIHelper = require('../helpers/ai_helper');

module.exports = function () {
  event.dispatcher.on(event.test.failed, async (test, err) => {
    console.log("\n🔴 Test failed: ", test.title);
    console.log("📌 Lỗi chi tiết: ", err.message);

    // Gọi AI để phân tích lỗi
    const fixSuggestion = await AIHelper.suggestFix(err.message);

    console.log("🛠️ AI đề xuất sửa lỗi: ", fixSuggestion);

    // Nếu có sửa, chạy lại test
    if (fixSuggestion) {
      console.log("🔄 Thử chạy lại test với sửa chữa AI...");
      await AIHelper.retryTest(test.file);
    }
  });

  event.dispatcher.on(event.test.passed, (test) => {
    console.log("\n✅ Test passed after healing: ", test.title);
  });
};
