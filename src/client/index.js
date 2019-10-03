import React from 'react';
import ReactDOM from 'react-dom';
// import BrowserRouter from 'react-router-dom';
// import App from './components/App';
import FillOut from './components/FillOut'

// const element = document.getElementById('app');
// const app = (
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

// ReactDOM.hydrate(app, element);

ReactDOM.render( < FillOut currentUser = "Justin" / > , document.getElementById('app'));


// This enables hot reloading
if (module.hot) {
  module.hot.accept();
}