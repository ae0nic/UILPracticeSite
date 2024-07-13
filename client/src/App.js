import React from 'react';
import GeneratedTest from './components/GeneratedTest';
import QuestionList from './components/QuestionList';
import NavigationRow from './components/NavigationRow';


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
  return (
    <div id='page'>
      <header>
        <div class='header'>
          <h1>UIL Practice Site</h1>
          <small>By ben lol</small>
          <NavigationRow/>
        </div>
      </header>
      
      <div id='separator'></div>
        <GeneratedTest setResponse={setQuestionResponse}>
          {displayBody(questionResponse)}
        </GeneratedTest>
    </div>
  );
}