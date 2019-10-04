import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import FillOut from './components/FillOut'

// const element = document.getElementById('app');
// const app = ( 
//   <BrowserRouter >
//     <App />
//   </BrowserRouter>
// );

console.log('hydrating DOM Locally')
// ReactDOM.hydrate(app, element);

ReactDOM.hydrate( <BrowserRouter> < App /> </BrowserRouter>, document.getElementById('app'));

console.log('done hydrating')

// ReactDOM.hydrate( < FillOut currentUser = "Justin" /> , document.getElementById('app'));


// This enables hot reloading
// if (module.hot) {
//   module.hot.accept();
// }