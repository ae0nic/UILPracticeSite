import React, { useState } from 'react';
import Body from './components/Body';

function listQuestions(questions)
{
  if (questions != null)
  {
    if (questions.message != null)
    {
      return <p>The server says: {questions.message}</p>;
    }
    console.log(questions)
    return (<p> Questions: {Array.from(questions).map(q => <p>Question:{q.Question} </p>)} </p>)
  }
  return <p>Generate some questions!</p>;
}

export default function App() {
  const [questionResponse, setQuestionResponse] = React.useState(null);
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