import React, { useState } from 'react';
import Body from './components/Body';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import QuestionList from './components/QuestionList';

function displayBody(questions)
{
  if (questions != null)
  {
    if (!(questions instanceof Object))
      return <p>The server response could not be parsed</p>;
    if (questions.message != null)
    {
      return <p>The server says: {questions.message}</p>;
    }

    return (<QuestionList questions={questions}/>)
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
          <small>By ben lol</small>
        </div>
      </header>
      <div id='separator'></div>
        <Body setResponse={setQuestionResponse}>
          {displayBody(questionResponse)}
        </Body>
    </div>
  );
}