require('dotenv').config();//allowing access to process.env.OPENROUTER_API_KEY
const axios = require('axios'); // sends API requests.
const readline = require('readline'); // input by user
const fs = require('fs');// read and write file
const path = require('path'); // manages file paths to ensure correct storage locations.

async function generateTestCase(userInput) {
  const apiKey = process.env.OPENROUTER_API_KEY; //   => from .env 
  if (!apiKey) {
    console.error(" Error: API Key is missing. Please check your .env file.");
    return;
  }

  try {
    //  send request to api gemma
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "user",
            content: `${userInput}. Please generate the test steps in pure CodeceptJS format without additional explanations or comments.`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    // check respone
    if (!response.data.choices || response.data.choices.length === 0) {
      console.error(" Error: No response from API.");
      return;
    }

    const testCaseContent = response.data.choices[0]?.message?.content;
    if (!testCaseContent) {
      console.error(" Error: AI response is missing content.");
      return;
    }

    // proccess name file 
    const safeFileName = userInput
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 50); // avoid exceed 50 char

    const testFilePath = path.join(__dirname, "tests", `test_case_${safeFileName}_test.js`);

    // create find in forder tests
    if (!fs.existsSync(path.dirname(testFilePath))) {
      fs.mkdirSync(path.dirname(testFilePath), { recursive: true });
    }

    // input text in file
    fs.writeFileSync(testFilePath, testCaseContent, "utf8");
    console.log(` Test case saved to: ${testFilePath}`);
  } catch (error) {
    console.error(" Error generating test case:", error.response?.data || error.message);
  }
}

// User input prompt
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Tell me your request API: ", (userInput) => {
  generateTestCase(userInput);
  rl.close();
});
