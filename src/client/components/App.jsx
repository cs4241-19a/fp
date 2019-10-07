import React from "react";
import { Switch, Route } from "react-router-dom";
import FillOut from "./FillOut";
import NewEvent from "./NewEvent";
import Viewer from "./Viewer";
import Selector from "./Selector";
import Authentication from "./Authentication";
import { Row, Col } from "react-bootstrap";

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

const SelectorHardcode = () => {
  const state = {
    cells: [],
    headings: ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    startTime: 8,
    endTime: 24
  };
  return (
    <Row>
      <Col lg="6">
        <Selector onUpdate={onUpdate} {...state} />
      </Col>
    </Row>
  );
};

const onUpdate = cells => {
  console.log("update");
};

const LoginScreen = () => (
  <div class="container card-outside">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <Authentication />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/new" component={NewEvent} />
    <Route exact path="/select" component={SelectorHardcode} />
    <Route exact path="/login" component={LoginScreen} />
    <Route path="/event/:name" component={FillOut} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default App;
