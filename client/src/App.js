import React, { useState } from 'react';
import Body from './components/Body';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

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

    let formSubmit = (e) => {
      e.preventDefault();
      var allChoices = document.getElementsByClassName("choice");
      for (var i = 0; i < allChoices.length; i++)
      {
        allChoices[i].children[0].class += " disabled";
        allChoices[i].children[0].disabled = true;
        if (allChoices[i].children[0].checked)
          allChoices[i].className += " checked";
      }
    }

    return ( 
    <div class="QuestionList">
      <Form onSubmit={formSubmit}>
          {Object.keys(questions).map((i) => (
            <div class="Question">
              <div class="QuestionTitle">
                <h2>{i}: {questions[i]["Question"]}</h2>
              </div>
              <div class="AnswerChoices">
                {Object.keys(questions[i]["Choices"]).map(
                  (k) => <Form.Check 
                  type="radio" 
                  label={questions[i]["Choices"][k]} 
                  name={"question" + i}
                  className={ "choice " + (questions[i]["CorrectChoice"] == k ? "correctChoice" : "incorrectChoice")}
                  disabled={false}
                  />
                )}
              </div>
          </div>
        ))}
        <Button type="submit" id="questionSubmitButton">Submit</Button>
      </Form>
    </div>)
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
          {listQuestions(questionResponse)}
        </Body>
    </div>
  );
}