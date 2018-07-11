import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const texts = [
    "text 1",
    "text 2",
    "text 3"
]

ReactDOM.render(<App texts={texts}/>, document.getElementById('root'));

