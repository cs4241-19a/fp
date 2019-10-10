import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import TaskCard from './TaskCard';
import TaskCardEntry from './TaskCardEntry';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<Login />, document.getElementById('login'));
//ReactDOM.render(<TaskCard />, document.getElementById('card'));
ReactDOM.render(<TaskCardEntry />, document.getElementById('newTask'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
