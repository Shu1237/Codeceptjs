require('dotenv').config();
const fs = require('fs');

if (fs.existsSync('./plugin/heal_plugin.js')) {
  require('./plugin/heal_plugin');
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
      
    },
    // ai_helper: {
    //   require: './helpers/ai_helper.js'
    // }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'demo2',
  plugins: {
    screenshotOnFail: {
      enabled: true,
      fullPage: true
    },
    // heal: {
    //   enabled: true,
    //   require: './plugin/heal_plugin.js',
    //   debug: true
    // }
  }
};
