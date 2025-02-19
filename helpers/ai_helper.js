// helpers/ai_helper.js
const fetch = require('node-fetch');
const Helper = require('@codeceptjs/helper');

class AI extends Helper {
  async request(messages) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages: messages
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        throw new Error("No response from DeepSeek");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error in AI helper:", error.message);
      throw error;
    }
  }
}

module.exports = AI;