const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function generateBaseMathQuestion()
{
  let questionBases = [[2, "₂"], [4, "₄"], [8, "₈"], [16, "₁₆"]];
  let answerBases = [[2, "₂"], [4, "₄"], [8, "₈"], [10, "₁₀"], [16, "₁₆"]];
  let operators = [["*", (num1, num2) => num1*num2], ["+", (num1, num2) => num1+num2]];

  let question = {};

  let num1 = Math.floor(Math.random() * 100 + 30);
  let [base1Num, base1Subscript] = questionBases[Math.floor(Math.random() * questionBases.length)];
  let [base2Num, base2Subscript] = questionBases[Math.floor(Math.random() * questionBases.length)];
  let num2 = Math.floor(Math.random() * 100 + 30);
  let [operatorText, operatorLambda] = operators[Math.floor(Math.random() * operators.length)];

  
  
  let answer = operatorLambda(num1, num2);
  let [baseAnswerNum, baseAnswerSubscript] = answerBases[Math.floor(Math.random() * answerBases.length)];
  question["Question"] = 
  `Which of the following is equal to ${num1.toString(base1Num) + base1Subscript}  ${operatorText} ${num2.toString(base2Num) + base2Subscript}?`;
  
  question["CorrectChoice"] = Math.floor(Math.random() * 4);
  question["Choices"] = {};

  for (let i = 0; i < 4; i++)
  {
    let sign = Math.sign(Math.random() - 0.5) || 1;
    question["Choices"][i] = (Math.floor(Math.random() * 20 + 20 * sign) + answer)
      .toString(baseAnswerNum)
      .toUpperCase() + baseAnswerSubscript;
  }

  question["Choices"][question["CorrectChoice"]] = answer
    .toString(baseAnswerNum)
    .toUpperCase() + baseAnswerSubscript;
  return question;
}

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
        
        data[i] = generateBaseMathQuestion();
        
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});