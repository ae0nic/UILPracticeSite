import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function formSubmit(e)
{
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

function displayCodeBlock(question)
{
  if (question["CodeBlock"] == null)
    return;
  return <div class="CodeBlock">
    <pre>
      <code>
        {question["CodeBlock"]}
      </code>
    </pre>
  </div>;
}

export default function QuestionList({questions})
{
    return (
    <div class="QuestionList">
        <Form onSubmit={formSubmit}>
            {Object.keys(questions).map((i) => (
                <div class="Question">
                <div class="QuestionTitle">
                    <h2>{i}: {questions[i]["Question"]}</h2>
                </div>
                {displayCodeBlock(questions[i])}
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
    </div>);
}