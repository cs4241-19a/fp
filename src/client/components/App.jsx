import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Please not that the contents here are just a placeholder and do not
// represent what will be present in the actual website.

const Home = () => (
  <React.Fragment>
    <h1>Home</h1>
    <p>This is the home page.</p>
  </React.Fragment>
);

const About = () => (
  <React.Fragment>
    <h1>About</h1>
    <p>This is the about page.</p>
  </React.Fragment>
);

const NotFound = () => (
  <React.Fragment>
    <h1>404</h1>
    <p>The page you are looking for was not found.</p>
  </React.Fragment>
);

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default App;
