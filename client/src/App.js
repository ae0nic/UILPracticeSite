import React, { useState } from 'react';
import Body from './components/Body';

function listQuestions(questions)
{
  if (questions != null)
  {
    if (!(questions instanceof Object))
      return <p>The server response could not be parsed</p>;
    if (questions.message != null)
    {
      return <p>The server says: {questions.message}</p>;
    }
    console.log(questions)
    return ( 
    <div class="QuestionList">
    <p> Questions: </p> 
    {Object.keys(questions).map((i) => (
      <div class="Question">
        <div class="QuestionTitle">
          <h2>{i}: {questions[i]["Question"]}</h2>
        </div>
        <div class="AnswerChoices">
          <ul>
            {Object.keys(questions[i]["Choices"]).map(
              (k) => <li>{Number(k) + 1}: {questions[i]["Choices"][k]}</li>
            )}
          </ul>
        </div>
      </div>
    ))}
    </div>)
  }
  return <p>Generate some questions!</p>;
}

export default function App() {
  const [questionResponse, setQuestionResponse] = React.useState(null);
  console.log(listQuestions(questionResponse))
  return (
    <div id='page'>
      <header>
        <div class='header'>
          <h1>UIL Practice Site</h1>
          <small>By _ae0nic</small>
        </div>
      </header>
      <div id='separator'></div>
        <Body setResponse={setQuestionResponse}>
          {listQuestions(questionResponse)}
        </Body>
    </div>
  );
}