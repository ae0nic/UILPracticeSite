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

    

    return (<div id="body">
        <div id="body-header">
            Generate UIL Practice Questions
        </div>
        <hr/>
        <div id="body-text">
            <Form onSubmit={onSubmit} action="/api" id="questionForm">
                <Form.Check
                    value={1}
                    type="radio"
                    name="numQuestions"
                    label="1 question"/>
                <Form.Check
                    value={5}
                    type="radio"
                    name="numQuestions"
                    label="5 questions"/>
                <Form.Check
                    defaultChecked
                    value={10}
                    type="radio"
                    name="numQuestions"
                    label="10 questions"/>
                <Form.Check
                    value={20}
                    type="radio"
                    name="numQuestions"
                    label="20 questions"/>
                <Button type="submit">
                    Generate
                </Button>
            </Form>
        </div>
        
        {children}
    </div>
    );
}