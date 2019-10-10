import React from "react";
import { Switch, Route } from "react-router-dom";
import FillOut from "./FillOut";
import NewEvent from "./NewEvent";
import Viewer from "./Viewer";
import Selector from "./Selector";
import Authentication from "./Authentication";
import { Row, Col, Container } from "react-bootstrap";

// Please not that the contents here are just a placeholder and do not
// represent what will be present in the actual website.

const Home = () => (
  <Container>
    <Row>
      <Col lg="12">
        <h1 className="text-center">When3Meet</h1>
        <h3 className="text-center">A slightly better When2Meet (maybe)</h3>
        <br />
        <p>
          A new version of the scheduling service everyone at WPI loves to use,
          updated with some new features and a new look.
        </p>
        <br />
        <p>
          The look and feel is heavily inspired by When2Meet, but updated to be
          responsive so the mobile website looks better.
        </p>
        <h4>New Features</h4>
        <ul>
          <li>User accounts</li>
          <li>Responsive design through bootstrap</li>
          <li>Ability to disable users while viewing availability</li>
        </ul>

        <h4>Convinced?</h4>
        <a class="btn btn-primary" href="/login" role="button">
          Create Your Account
        </a>
      </Col>
    </Row>
  </Container>
);

const About = () => (
  <Container>
    <Row>
      <Col lg="12">
        <h1>About</h1>
        <p>This is the about page.</p>
      </Col>
    </Row>
  </Container>
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
