import { useEffect } from 'react';
import './PastTests.scss';
import { useState } from 'react';

export default function PastTests() {
    const [testState, setTestState] = useState([]);
    useEffect(() => {
        fetch(`/api/getTests`)
            .then((res) => res.json())
            .then((parsed) => {
                setTestState(parsed);
            });
    });
    return (<div id="body">
        <div id="body-header">
            View Past UIL Tests
        </div>
        <hr/>
        <div id="body-text">
            {
                testState.map((name) => (
                    <div class="test" key={name}>
                        <h1>{name}</h1>
                        <a href={`/api/downloadTest?test=${name}`}>Download {name}</a>
                    </div>
                ))
            }
        </div>
    </div>);
}