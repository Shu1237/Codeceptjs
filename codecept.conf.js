const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
require("./heal")
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost',
      show: true
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'AI-Testing',

  // openAI
  // ai: {
  //   request: async messages => {
  //     const OpenAI = require('openai')
  //     const openai = new OpenAI({apiKey: process.env['OPENAI_API_KEY']})
  
  //     const completion = await openai.chat.completions.create({
  //       model: 'gpt-3.5-turbo',
  //       messages,
  //     })
  
  //     return completion?.choices[0]?.message?.content
  //   }
  // }

  //groq
  ai: {
    request: async messages => {
      const Groq = require('groq-sdk')
  
      const client = new Groq({
        apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
        apiKey: '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',
      })
  
      const chatCompletion = await client.chat.completions.create({
        messages,
        model: 'mixtral-8x7b-32768',
      })
      return chatCompletion.choices[0]?.message?.content || ''
    }
  },

  


  plugins: {
    heal: {
      enabled: true
    },
  },
};