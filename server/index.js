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
      data[i]["Choices"] = {};
      data[i]["Choices"][0] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10);
      data[i]["Choices"][1] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10);
      data[i]["Choices"][2] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10);
      data[i]["Choices"][3] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10);
      data[i]["CorrectChoice"] = Math.floor(Math.random() * 4);
      
    }
    toReturn["data"] = data;
  }
  return toReturn;
}

app.get("/api/generateQuestions", (req, res) => {
    let numQuestions = req.query.numQuestions;
    res.json(generateResponse(numQuestions));
    
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});