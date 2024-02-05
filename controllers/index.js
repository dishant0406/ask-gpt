const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai')

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const genAIModal = genAi.getGenerativeModel({
  model: 'gemini-pro'
})



const askToGPT = async (req, res) => {
  const { text, question } = req.body;
  if (!text && !question) {
    res.status(400).json({ error: "text and question are required" });
  }

  const prompt = `${text || ''} \n\n ${question || ''}\n`;

  const completion = await genAIModal.generateContent(prompt)
  const message = completion.response.candidates[0].content.parts[0].text

  res.status(200).json({ message });
}

module.exports = {
  askToGPT
}
