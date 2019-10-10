import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom';
import App from './components/App';
import FillOut from './components/FillOut'

<
link
rel = "stylesheet"
href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
integrity = "sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
crossorigin = "anonymous" / >

const element = document.getElementById('app');
const app = ( <BrowserRouter>
  <App />
  </BrowserRouter>
);

ReactDOM.hydrate(app, element);


// This enables hot reloading
if (module.hot) {
  module.hot.accept();
}