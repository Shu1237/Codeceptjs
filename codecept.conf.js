const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// Turn on headless mode when running with HEADLESS=true environment variable
setHeadlessWhen(process.env.HEADLESS === 'true');

// Enable all common plugins
setCommonPlugins();

require("./heal"); // Đảm bảo file heal.js tồn tại nếu bạn require nó

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './End/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://127.0.0.1:5500/',
      show: true,
    },
  },

  
  include: {
    I: './steps_file.js',
  },
  name: 'AI-Testing',
  ai: {
    request: async (messages) => { // Tham số phải là "messages" để khớp với định dạng chat
      const axios = require('axios'); // Sử dụng axios để gọi API OpenRouter

      try {
        const response = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: 'open-r1/olympiccoder-7b:free', // Sửa tên model (gemma-3 không tồn tại trong free tier)
            messages: messages, // Truyền messages trực tiếp
            temperature: 0.7,
            max_tokens: 200,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || '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'}`,
              'Content-Type': 'application/json',
            },
            timeout: 10000,
          }
        );

        return response.data.choices[0]?.message?.content || '';
      } catch (error) {
        console.error('❌ Lỗi khi gọi OpenRouter API:', error.message);
        return null;
      }
    },
  },
  plugins: {
    heal: {
      enabled: true,
      debug: true, // Thêm debug để xem log healing
    },
  },
};