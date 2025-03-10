require('dotenv').config();
const axios = require('axios'); // Sử dụng axios
const readline = require('readline');
const fs = require('fs');

async function generateTestCase(userInput) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("Error: API Key is missing. Please check your .env file.");
    return;
  }

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "deepseek/deepseek-chat:free",
      messages: [
        {
          role: "user",
          content: `${userInput}. Please generate the test steps in pure CodeceptJS format without additional explanations or comments.`
        }
      ]
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.data.choices || response.data.choices.length === 0) {
      console.error("Error: No response from API");
      return;
    }

    const testCaseContent = response.data.choices[0].message.content;

    // Tạo nội dung test theo chuẩn CodeceptJS
    const codeceptTestTemplate = `
Feature('Generated Test');
 ${testCaseContent}

`;

    const fileName = `tests/test_case_${userInput.replace(/[^a-zA-Z0-9]/g, '_')}_test.js`; // Tạo tên file hợp lệ
    fs.writeFileSync(fileName,codeceptTestTemplate);
    console.log(`Test case saved to ${fileName}`);
  } catch (error) {
    console.error("Error generating test case:", error.message);
  }
}

// Sử dụng readline để nhận nội dung từ người dùng
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Tell me your request API:", (userInput) => {
  generateTestCase(userInput);
  rl.close();