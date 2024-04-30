import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import logo from './logo.svg'

export default function App() {
  return (
    <div id='page'>
      <header>
        <div class='logoHeader'>
          <p>Hello world!</p>
        </div>
      </header>
      <div id='separator'></div>
      <div id='body'>
        <div id='welcome'>
          <p>Welcome to the page</p>
        </div>
      </div>
    </div>
  );
}