/* TODO:
** Add more generators
**    - Math generator
**    - Data structure link generator
** Fix bugs
*/ 

const path = require("node:path");
const fs = require("node:fs");
const testFolderPath = path.join(__dirname, "tests");
let testFolder = fs.readdirSync(testFolderPath);

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
        data[i] = generators.generateBooleanLogicQuestion();
        // data[i] = generators.generateBaseMathQuestion();
        // data[i] = generators.generateMathQuestion();
        
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
  res.json(getTests(testFolderPath))
})

function getTests(folderPath) {
  let response = [];
  testFolder = fs.readdirSync(folderPath, {withFileTypes: true}); // I need to do this in case the tests in the directory change
  for (const directoryObject of testFolder) {
    if (directoryObject.isFile()) {
      let filePath = path.join(folderPath, directoryObject.name);
      response.push(directoryObject.name);
    } else {
      response.push({[directoryObject.name]: getTests(path.join(folderPath, directoryObject.name))})
    }
  }
  return response;
}

app.get("/api/downloadTest", (req, res) => {
  let test = req.query.test;
  if (fs.existsSync(`./tests/${test}`)) {
    res.download(`./tests/${test}`);
  } else {
    res.json("Error alert!");
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});