import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { request } from "../util";

export default class Events extends React.Component {
  state = {
    eventData: null
  };
  async componentDidMount() {
    console.log("component mounted 2");
    // const res = await fetch("/api/user/events", {
    //   method: "GET"
    // });
    const vals = {
      userId: "5d9e8a72ef2c2b1c3a94014a",
      userName: "Max"
    };
    const res = await request("POST", "api/user/events", vals);
    const data = await res.json();

    console.log(data.events);
    this.setState({ eventData: data.events });
  }

  renderTableBody() {
    if (this.state.eventData != null) {
      console.log(this.state.eventData);
      return this.state.eventData.map((event, index) => {
        console.log("adding event", event.name);
        return (
          <tr key={index}>
            <th>{event.name}</th>
            <th>
              <Link to={`/event/${event.eventId}`} className="btn btn-primary">
                View
              </Link>
            </th>
          </tr>
        );
      });
    }
  }

  render = () => {
    return (
      <React.Fragment>
        <Col lg="2" />
        <Col lg="8">
          <table className="table" id="list_table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody id="table_body">{this.renderTableBody()}</tbody>
          </table>
        </Col>
        <Col lg="2" />
      </React.Fragment>
    );
  };
}
