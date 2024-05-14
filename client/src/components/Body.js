import "./Body.scss";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Children } from "react";

export default function Body({children, setResponse})
{
    let onSubmit = (e) => {
        let form = document.getElementById("questionForm");
        console.log(form.elements.numQuestions.value);
        fetch(`/api?numQuestions=${form.elements.numQuestions.value}`)
        .then((res) => res.json())
        .then((data) => setResponse(data.data));
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
        <div id="body-text">
            <Form onSubmit={onSubmit} action="/api" id="questionForm">
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