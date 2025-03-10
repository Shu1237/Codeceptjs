require('dotenv').config();

// Kiểm tra xem file heal.js có tồn tại không trước khi require
const fs = require('fs');
if (fs.existsSync('./heal.js')) {
  require('./heal');
}

const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS === 'true');
setCommonPlugins();

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.google.com/',
      show: true,
      waitForTimeout: 5000,
      smartWait: 3000 // Giảm thời gian chờ để tối ưu tốc độ
    },
    AI: {
      require: './helpers/ai_helper.js'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'demo2',
  plugins: {
    screenshotOnFail: {
      enabled: true, // ✅ Bật tính năng chụp màn hình khi test fail
      fullPage: true
    },
    heal: {
      enabled: true,
      require: './plugin/heal_plugin.js',
      debug: true
    },
    retryFailedStep: {
      enabled: true,
      retries: 2
    }
  }
};
