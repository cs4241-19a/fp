import React from "react";
import { Container, Form, Button, Tabs, Tab, Col } from "react-bootstrap";
import { Formik } from "formik";
// import "../common.css";

export default class Authentication extends React.Component {
  render = () => {
    return (
      <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example">
        <Tab eventKey="Login" title="Login">
          <Login></Login>
        </Tab>
        <Tab eventKey="SignUp" title="Sign Up">
          <SignUp></SignUp>
        </Tab>
      </Tabs>
    );
  };
}

class Login extends React.Component {
  render = () => {
    return (
      <Container className="auth-container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={touched.email && errors.email}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && errors.password}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Container>
    );
  };
}

class SignUp extends React.Component {
  render = () => {
    return (
      <Container className="auth-container">
        <Formik
          initialValues={{ email: "", password: "", passwordConfirm: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password !== values.passwordConfirm) {
              errors.password = "Password must match";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={touched.email && errors.email}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && errors.password}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordConfirm"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirm}
                  isInvalid={touched.password && errors.password}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Container>
    );
  };
}
