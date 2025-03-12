require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const TEST_FOLDER = path.join(__dirname, '../tests/'); // Ensure correct path

async function fixTestFile(filePath) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: API Key is missing. Please check your .env file.");
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File ${filePath} not found.`);
    return;
  }

  const testContent = fs.readFileSync(filePath, 'utf8');

  console.log(`🔍 Sending ${filePath} to AI for fixing...`);

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "google/gemma-3-27b-it:free",
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

    const fixedContent = response.data.choices[0].message?.content;
    if (!fixedContent) {
      console.error("❌ Error: AI response is empty.");
      return;
    }

    // Save the fixed file
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`✅ AI has successfully fixed: ${filePath}`);
  } catch (error) {
    console.error("❌ AI Request Error:", error.response ? error.response.data : error.message);
  }
}

// Find all test files and heal them
fs.readdir(TEST_FOLDER, (err, files) => {
  if (err) {
    console.error("❌ Error reading test folder:", err);
    return;
  }

  const testFiles = files.filter(file => file.endsWith('_test.js'));
  if (testFiles.length === 0) {
    console.log("⚠️ No test files found in the folder.");
    return;
  }

  console.log(`🔎 Found ${testFiles.length} test files. Healing...`);

  testFiles.forEach(testFile => {
    fixTestFile(path.join(TEST_FOLDER, testFile));
  });
});
