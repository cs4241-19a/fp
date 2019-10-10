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
      loadedEvent: null
    };
    this.selectorElement = React.createRef();
    // this.state.cells = [
    //   ["", "", ""],
    //   ["", "1110", "0000"],
    //   ["", "0111", "1101"],
    //   ["", "0010", "1110"],
    //   ["", "1010", "1110"]
    // ];

    // this.state.users.push(props.match.params.name);
    // // this.state.users.push("hardcoded name")
    // const rows = this.state.cells.length;
    // const cols = this.state.cells[0].length;
    // for (let i = 1; i < rows; i++) {
    //   for (let j = 1; j < cols; j++) {
    //     this.state.cells[i][j] += "0";
    //   }
    // }
  }

  async componentDidMount() {
    // const res = await request(
    //   "GET",
    //   `/api/event/${this.props.match.params.name}`
    // );
    console.log("component mounted");
    const res = await fetch(`/api/event/${this.props.match.params.name}`, {
      method: "GET"
    });
    const data = await res.json();
    console.log("data from server", data);
    this.setState({ loadedEvent: data });
  }

  render = () => {
    const eventTitle =
      this.state.loadedEvent == null ? "" : this.state.loadedEvent.eventTitle;
    return (
      <Container>
        <h1 className="text-center">{eventTitle}</h1>
        <p>Insert sharing buttons here ish</p>
        <Row>
          <Col lg="5">
            <Selector onUpdate={this.onUpdate} {...this.state}></Selector>
          </Col>
          <Col lg="7">
            <Viewer ref={this.selectorElement} {...this.state}></Viewer>
          </Col>
        </Row>
      </Container>
    );
  };

  onUpdate = cells => {
    this.selectorElement.current.updateGrid(cells);
    // this.setState({ cells });
  };
}
