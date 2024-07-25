/* TODO:
** Add more generators
**    - Math generator
**    - Data structure link generator
** Fix bugs
*/ 

const path = require("node:path");
const fs = require("node:fs");
const testFolderPath = path.join(__dirname, "tests");
const testFolder =fs.readdirSync(testFolderPath);

const generators = require("./generators.js");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function generateResponse(questions)
{
  let toReturn = {};
  try {
    if (isNaN(questions) || Number(questions) < 1)
    {
      toReturn["data"] = {"message": "Invalid input!"}
    } else {
      let numQuestions = Number(questions);
      let data = {};
      for (let i = 1; i <= numQuestions; i++)
      {
        // data[i] = generators.generateBooleanLogicQuestion();
        // data[i] = generatorsgenerateBaseMathQuestion();
        data[i] = generators.generateMathQuestion();
        
      }
      toReturn["data"] = data;
    }
  } catch (e) {
    console.log(e);
    toReturn["data"] = {"message": "The server threw an error!"}
  } finally {
    return toReturn;
  }
}

app.get("/api/generateQuestions", (req, res) => {
    let numQuestions = req.query.numQuestions;
    res.json(generateResponse(numQuestions));
})

app.get("/api/getTests", (req, res) => {
  let response = {};
  for (const file of testFolder) {
    let filePath = path.join(testFolderPath, file);
    response[file] = fs.readFileSync(filePath).toString();
  }
  console.log(response);
  res.json(response);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});