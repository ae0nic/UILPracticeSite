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
        
        data[i] = {};
        let num1 = Math.floor(Math.random() * 20 + 20);
        let num2 =  Math.floor(Math.random() * 20 + 20);
        let operator = (Math.random() < 0.5) ? " sum " : " product ";

        let answer = (operator === " sum ") ? num1 + num2 : num1 * num2;
        data[i]["Question"] = `What is the ${operator} of ${num1.toString(16)}₁₆ and ${num2.toString(16)}₁₆?`;
        data[i]["CorrectChoice"] = Math.floor(Math.random() * 4);
        data[i]["Choices"] = {};
        data[i]["Choices"][0] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10) + "₁₀";
        data[i]["Choices"][1] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10) + "₁₀";
        data[i]["Choices"][2] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10) + "₁₀";
        data[i]["Choices"][3] = data[i]["Answer"] = Math.floor(Math.random() * 40 + 10) + "₁₀";

        data[i]["Choices"][data[i]["CorrectChoice"]] = answer + "₁₀";
        
      }
      toReturn["data"] = data;
    }
  } catch {
    toReturn["data"] = {"message": "The server threw an error!"}
  } finally {
    return toReturn;
  }
}

app.get("/api/generateQuestions", (req, res) => {
    let numQuestions = req.query.numQuestions;
    res.json(generateResponse(numQuestions));
    
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});