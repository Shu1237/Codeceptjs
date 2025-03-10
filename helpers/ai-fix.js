require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fixTestCase(testFile) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: API Key is missing. Please check your .env file.");
    return;
  }

  const filePath = path.join(__dirname, '../tests/', testFile);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File ${testFile} not found.`);
    return;
  }

  const testContent = fs.readFileSync(filePath, 'utf8');

  console.log(`🔍 Sending test file ${testFile} to AI for fixing...`);

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "deepseek/deepseek-chat:free",
      messages: [
        {
          role: "user",
          content: `Below is a faulty CodeceptJS test script:\n\n${testContent}\n\nAnalyze the errors and fix the code according to proper CodeceptJS standards. Please generate the test steps in pure CodeceptJS format without additional explanations or comments.`
        }
      ]
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.data.choices || response.data.choices.length === 0) {
      console.error("❌ Error: No response from AI.");
      return;
    }

    const fixedContent = response.data.choices[0].message.content;

    // Write the fixed content back to the test file
    fs.writeFileSync(filePath, fixedContent);
    console.log(`✅ AI has successfully fixed the errors: ${testFile}`);
  } catch (error) {
    console.error("❌ AI Request Error:", error.message);
  }
}

// Run the script with: node helpers/ai-fix.js <test filename>
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ Error: Please provide a test file name.");
} else {
  fixTestCase(args[0]);
}
