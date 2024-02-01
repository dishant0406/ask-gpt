import express from 'express';
import dotenv from 'dotenv';
import { askToGPT } from './controllers/index.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/ask', askToGPT);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
})


export default app;

