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
        <p>Question #{i}:</p>
        <p>{questions[i]["Question"]}</p>
        <p>Answer:</p>
        <p>{questions[i]["Answer"]}</p>
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