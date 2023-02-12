require('dotenv').config(); // required to use env

const OpenAI = require('openai'); // code reference https://platform.openai.com/docs/api-reference/introduction
const { Configuration, OpenAIApi } = OpenAI
const { REACT_APP_OPENAI_API_KEY } = process.env;
const { REACT_APP_AUTHORIZATION } = process.env;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port =  3001;
const app = express();

const configuration = new Configuration({
  organization: REACT_APP_AUTHORIZATION,
  apiKey: REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    "model": "text-davinci-003",
    "prompt": `Pretend you are Tom and answer all the questions.
    Tom: How can I help you ?
    Person: What is your name ?
    Tom: My name is Tom.
    Person: ${message}?
    Tom:`,
    "max_tokens": 100,
    "temperature": 0
  });
  console.log(response.data)
  if(response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text
    });
  }
});

