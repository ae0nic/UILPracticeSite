import React from 'react';
import GeneratedTest from './components/GeneratedTest';
import QuestionList from './components/QuestionList';
import NavigationRow from './components/NavigationRow';
import { useState } from 'react';

/* TODO:
** Link to real tests
** Polish site
*/

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
  const [operationState, setOperationState] = React.useState("generate");
  const generateElement = (
  <GeneratedTest setResponse={setQuestionResponse}>
    {displayBody(questionResponse)}
  </GeneratedTest>);
  const viewElement = (<></>);
  return (
    <div id='page'>
      <header>
        <div class='header'>
          <h1>UIL Practice Site</h1>
          <small>By ben lol</small>
          <NavigationRow setOperationState={setOperationState}/>
        </div>
      </header>
      
      <div id='separator'></div>
      <div id='content-container'>
        {operationState == "generate" ? generateElement : <h1>Tests</h1>}
      </div>
    </div>
  );
}