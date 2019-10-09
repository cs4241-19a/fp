import React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import TableDragSelect from "./table-drag/table-drag-select";
import { Formik } from "formik";
import { request } from "../util";

export default class NewEvent extends React.Component {
  state = {
    cells: [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ],
    dayError: false,
    timeError: false
  };

  getDaysSelection(cells) {
    const selection = cells[1];
    let noSelection = true;
    selection.forEach(val => {
      if (val) {
        noSelection = false;
      }
    });
    return noSelection;
  }

  render = () => {
    return (
      <Container>
        <h1 className="text-center">Create a new event.</h1>
        <Alert
          id="invalidTime"
          key="invalidTime"
          variant="danger"
          hidden={!this.state.timeError}
        >
          Start time must be before end time
        </Alert>
        <Alert
          id="invalidDays"
          key="invalidDays"
          variant="danger"
          hidden={!this.state.dayError}
        >
          Must select at least one date
        </Alert>
        <Row>
          <Col lg="3">
            <TableDragSelect
              value={this.state.cells}
              onChange={this.handleChange}
              constantWidth={true}
            >
              <tr>
                <td disabled>S</td>
                <td disabled>M</td>
                <td disabled>T</td>
                <td disabled>W</td>
                <td disabled>T</td>
                <td disabled>F</td>
                <td disabled>S</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </TableDragSelect>
          </Col>
          <Col lg="9">
            <Formik
              initialValues={{ title: "", startTime: 9, stopTime: 17 }}
              validate={values => {
                let errors = {};
                if (!values.title) {
                  errors.title = "Required";
                }
                const noSelection = this.getDaysSelection(this.state.cells);
                const tError =
                  parseInt(values.startTime) >= parseInt(values.stopTime);
                if (tError) {
                  errors.time = true;
                }
                if (noSelection) {
                  errors.day = true;
                }
                this.setState({
                  dayError: noSelection,
                  timeError: tError
                });
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                console.log("calling create");
                values.days = this.state.cells;
                console.log(values);
                await request("POST", "/api/event/create", values);
                setSubmitting(false);
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
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">
                      Event Title
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        name="title"
                        placeholder="Sample Event"
                        value={values.title}
                        onChange={handleChange}
                        isInvalid={touched.title && errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">
                      Start Time
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        name="startTime"
                        value={values.startTime}
                        onChange={handleChange}
                        isInvalid={errors.time}
                        as="select"
                      >
                        {TimeSelect()}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">
                      End Time
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        name="stopTime"
                        value={values.stopTime}
                        onChange={handleChange}
                        isInvalid={errors.time}
                        as="select"
                      >
                        {TimeSelect()}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    isinvalid={errors.day}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  };

  handleChange = cells => {
    const dayError = this.getDaysSelection(cells);
    this.setState({ cells, dayError });
  };
}

const TimeSelect = function() {
  // let times = [...Array(24).keys()]
  let times = [
    "midnight",
    "1 am",
    "2 am",
    "3 am",
    "4 am",
    "5 am",
    "6 am",
    "7 am",
    "8 am",
    "9 am",
    "10 am",
    "11 am",
    "noon",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
    "6 pm",
    "7 pm",
    "8 pm",
    "9 pm",
    "10 pm",
    "11 pm"
  ];
  return (
    <React.Fragment>
      {times.map((time, index) => {
        return (
          <option key={index} value={index}>
            {time}
          </option>
        );
      })}
    </React.Fragment>
  );
};
