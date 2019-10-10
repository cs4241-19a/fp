import React from "react";
import Selector from "./Selector";
import Viewer from "./Viewer";
import "./table-drag/style.css";
import { Container, Row, Col } from "react-bootstrap";
import Authentication from "./Authentication";
import { request } from "../util";

export default class FillOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loadedEvent: {
      //   cells: [[false, false], [false, false], [false, false]],
      //   startTime: 9,
      //   stopTime: 10,
      //   heading: ["", "Mon"]
      // }
      loadedEvent: null
    };
    this.selectorElement = React.createRef();
  }

  async componentDidMount() {
    // console.log("component mounted");
    const res = await fetch(`/api/event/${this.props.match.params.name}`, {
      method: "GET"
    });
    // Redirect us if the request wants us to be redirected
    if (res.redirected) {
      window.location.href = res.url;
    }

    const data = await res.json();
    // console.log(data);
    let event = {
      eventId: data._id,
      userId: data.currentUserId,
      userName: data.currentUserName,
      title: data.title,
      startTime: parseInt(data.startTime),
      stopTime: parseInt(data.stopTime),
      heading: [""],
      selectorCells: [],
      viewerCells: [],
      users: []
    };
    console.log("current username", event.userName);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < days.length; i++) {
      if (data.days[i]) {
        event.heading.push(days[i]);
      }
    }
    // console.log(event.heading);

    const rows =
      1 +
      2 * (event.stopTime - event.startTime) +
      (event.startTime % 1 === 0 ? 0 : 1);
    const cols = event.heading.length;

    // console.log("rows, cols", rows, cols);

    event.selectorCells = new Array(rows)
      .fill(false)
      .map(() => new Array(cols).fill(false));

    event.viewerCells = new Array(rows)
      .fill("")
      .map(() => new Array(cols).fill(""));

    console.log("availabilities", data.availabilities);
    console.log("event", event);
    if (!data.availabilities.hasOwnProperty(event.userId)) {
      console.log("didn't find user", event.userName);
      this.updateEvent(event.selectorCells, event.eventId);
      data.availabilities[event.userId] = {
        name: event.userName,
        userAvailability: event.selectorCells
      };
    }

    const availabilities = Object.entries(data.availabilities);
    console.log(availabilities);
    for (let a = 0; a < availabilities.length; a++) {
      const availability = availabilities[a][1].userAvailability;
      const currentUserId = availabilities[a][0];
      event.users.push(availabilities[a][1].name);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          event.viewerCells[i][j] += availability[i][j] ? "1" : "0";
        }
      }
      if (event.userId === currentUserId) {
        event.selectorCells = availability;
      }
    }

    console.log(event);
    this.setState({ loadedEvent: event });
  }

  render = () => {
    // console.log("calling fillout render");
    const eventTitle =
      this.state.loadedEvent == null ? "" : this.state.loadedEvent.title;
    if (this.state.loadedEvent == null) {
      return (
        <Container>
          <h2>No Data for Event.</h2>
        </Container>
      );
    } else {
      return (
        <Container>
          <h1 className="text-center">{eventTitle}</h1>
          <Row>
            <Col lg="5">
              <Selector
                onUpdate={this.onUpdate}
                event={this.state.loadedEvent}
              ></Selector>
            </Col>
            <Col lg="7">
              <Viewer
                ref={this.selectorElement}
                event={this.state.loadedEvent}
              ></Viewer>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  updateEvent = async (userAvailability, eventId) => {
    // console.log("sending updated availability", { userAvailability });
    await request("POST", `/api/event/${eventId}/update`, { userAvailability });
  };

  onUpdate = async cells => {
    // console.log("updating in fillout");
    this.selectorElement.current.updateGrid(cells);
    this.updateEvent(cells, this.state.loadedEvent.eventId);
    // this.setState({ cells });
  };
}
