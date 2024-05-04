import React, { useState } from 'react';
import Body from './components/Body';

export default function App() {
  return (
    <div id='page'>
      <header>
        <div class='logoHeader'>
          <p>Hello world!</p>
        </div>
      </header>
      <div id='separator'></div>
        <Body/>
    </div>
  );
}