import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export const askToGPT = async (req, res) => {
  const { text, question } = req.body;
  if (!text && !question) {
    res.status(400).json({ error: "text and question are required" });
  }

  const prompt = `${text || ''} \n\n ${question || ''}\n`;


  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'user',
      content: prompt,
    }],
    temperature: 0.1
  });

  const { choices } = completion;
  const { message } = choices[0];
  res.status(200).json({ message: message.content });
}