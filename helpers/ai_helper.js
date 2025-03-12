const { Helper } = require("codeceptjs");
const axios = require("axios");
require("dotenv").config();

class AIHelper extends Helper {
  constructor(config) {
    super(config);
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.apiUrl = "https://openrouter.ai/api/v1/chat/completions";
  }

  async suggestFix(errorMessage) {
    console.log("🤖 AI đang phân tích lỗi...");

    try {
      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          prompt: `Bạn là chuyên gia kiểm thử tự động. Hãy phân tích lỗi sau và đề xuất cách sửa chữa: ${errorMessage}`,
          temperature: 0.7,
          max_tokens: 200,
        }
      );

      return response.data.candidates[0].output || "Không có gợi ý từ AI.";
    } catch (error) {
      console.error("❌ Lỗi khi gọi API Gemma:", error.response?.data || error.message);
      return "Không thể lấy gợi ý sửa lỗi từ AI.";
    }
  }

  async retryTest(testFile) {
    console.log(`🔄 Chạy lại test: ${testFile}`);
    const { exec } = require("child_process");

    exec(`npx codeceptjs run --grep "${testFile}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Lỗi khi chạy lại test: ${stderr}`);
      } else {
        console.log(`✅ Kết quả test mới: ${stdout}`);
      }
    });
  }
}

module.exports = AIHelper;
