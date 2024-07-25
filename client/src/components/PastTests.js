import { useEffect } from 'react';
import './PastTests.scss';

export default function PastTests() {
    useEffect(() => {
        // call the api
    });
    return (<div id="body">
        <div id="body-header">
            View Past UIL Tests
        </div>
        <hr/>
        <div id="body-text" className='past-test-container'>
            <div className='test'>
                <h3>Test 1</h3>
                <p>Test 1 info</p>
            </div>
            <div className='test'>
                <h3>Test 2</h3>
                <p>Test 2 info</p>
            </div>
            <div className='test'>
                <h3>Test 3</h3>
                <p>Test 3 info</p>
            </div>
            <div className='test'>
                <h3>Test 4</h3>
                <p>Test 4 info</p>
            </div>
            <div className='test'>
                <h3>Test 4</h3>
                <p>Test 4 info</p>
            </div>
            <div className='test'>
                <h3>Test 4</h3>
                <p>Test 4 info</p>
            </div>
            <div className='test'>
                <h3>Test 4</h3>
                <p>Test 4 info</p>
            </div>
            <div className='test'>
                <h3>Test 4</h3>
                <p>Test 4 info</p>
            </div>
        </div>
    </div>);
}