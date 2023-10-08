const OpenAI = require('openai');
const express = require("express");
const bodyParser = require ("body-parser");
const cors = require("cors");
const app = express();
const port = 3001 ;
const prompt1 = require("./routes/coverLetterWriter");

require('dotenv').config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
    });


app.use(bodyParser.json());
app.use(cors());

app.post("/coverLetterWriter", async (req, res) => {

    const { message } = req.body;
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt1[0].prompt} ${message}`,
      max_tokens: 1000,
    });
    console.log(completion.choices)
    if (completion.choices) {
      res.json({
        message: completion.choices[0].text
      })
    }
  });

app.listen(port , () => {
    console.log("Example app listening " + port)
});