import "./GeneratedTest.scss";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Children } from "react";

export default function Body({children, setResponse})
{
    let onSubmit = (e) => {
        let form = document.getElementById("question-form");
        fetch(`/api/generateQuestions?numQuestions=${form.elements.numQuestions.value}`)
        .then((res) => res.json())
        .then((data) => setResponse(data.data));
        let choices = Array.prototype.slice.call(document.getElementsByClassName("choice"));
        for (let i = 0; i < choices.length; i++)
        {
            choices[i].children[0].disabled = false;
            choices[i].children[0].checked = false;
        }
        e.preventDefault();

    }

    let onChange = (e) => {
        let indicator = document.getElementById("indicator");
        indicator.textContent = "Generating " + e.target.value + " questions";
    }

    

    return (<div id="body">
        <div id="body-header">
            Generate UIL Practice Questions
        </div>
        <hr/>
        <div id="body-text" className="generated-test-container">
            <Form onSubmit={onSubmit} id="question-form">
                <Form.Label id="indicator">Generating 25 questions</Form.Label>
                <Form.Range onChange={onChange} min={1} max={50} defaultValue={25} name="numQuestions"/>
                <Button type="submit">
                    Generate
                </Button>
            </Form>
        </div>
        
        {children}
    </div>
    );
}