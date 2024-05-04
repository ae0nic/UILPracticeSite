const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function generateResponse(questions)
{
  let toReturn = {};
  if (isNaN(questions) || Number(questions) < 1)
  {
    toReturn["data"] = {"message": "Invalid input!"}
  } else {
    let numQuestions = Number(questions);
    let data = {};
    for (let i = 1; i <= numQuestions; i++)
    {
      data[i] = {};
      data[i]["Question"] = "What is the answer to life?";
      data[i]["Answer"] = Math.floor(Math.random() * 40 + 10);
    }
    toReturn["data"] = data;
  }
  return toReturn;
}

app.get("/api", (req, res) => {
    let numQuestions = req.query.numQuestions;
    res.json(generateResponse(numQuestions));
    
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});