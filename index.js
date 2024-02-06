const express = require('express');
const dotenv = require('dotenv');
const { askToGPT } = require('./controllers/index.js');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());

//cors all origins access
app.use(cors(
  {
    origin: '*'
  }
));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/ask', askToGPT);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
})


module.exports = app;

