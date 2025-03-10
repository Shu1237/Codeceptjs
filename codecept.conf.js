require('dotenv').config();
require('./heal');
const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
const { request } = require('playwright');

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://google.com',
      show: true
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
      enabled: false,
    },
    heal: {
      enabled: true,
    },
  }
};