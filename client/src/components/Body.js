import "./Body.scss";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Body()
{
    let onSubmit = (e) => {
        let form = document.getElementById("questionForm");
        console.log(form.elements.numQuestions.value);
        fetch(`/api?numQuestions=${form.elements.numQuestions.value}`);
        e.preventDefault();
    }


    return (<div id="body">
        <div id="body-header">
            Generate UIL Practice Questions
            <hr/>
        </div>
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
                    Submit
                </Button>
            </Form>
        </div>
    </div>
    );
}