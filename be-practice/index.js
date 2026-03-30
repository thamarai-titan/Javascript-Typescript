const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function testGemini() {
    try {
        // CHANGED: Using 'gemini-3-flash-preview' instead of 'gemini-3-flash'
        const model = genAI.getGenerativeModel({
            model: 'gemini-3-flash-preview', 
        });

        const prompt = "Generate a professional button component in React.js with Tailwind CSS.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const fileName = 'GeneratedContent.js';
        await writegeneratedContentToFile(fileName, text);

    } catch (error) {
        // Pro-Tip: Adding more detail to the error log helps debugging
        console.error('Error generating content:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
        }
    }
}

testGemini();

async function writegeneratedContentToFile(fileName, content) {
    await fs.writeFile(fileName, content);
}