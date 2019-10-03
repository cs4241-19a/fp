import React from "react";
import Selector from "./Selector";
import Viewer from "./Viewer";
import "./table-drag/style.css";

export default class FillOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
      headings: ["", "Mon", "Tue"],
      startTime: 13,
      endTime: 15,
      users: ["Max", "Cat", "Ben", "Charlie"]
    };
    this.selectorElement = React.createRef();
    this.state.cells = [
      ["", "", ""],
      ["", "1110", "0000"],
      ["", "0111", "1101"],
      ["", "0010", "1110"],
      ["", "1010", "1110"]
    ];

    this.state.users.push(props.currentUser);
    const rows = this.state.cells.length;
    const cols = this.state.cells[0].length;
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        this.state.cells[i][j] += "0";
      }
    }
  }

  render = () => {
    return (
      <React.Fragment>
        <div class="col-lg-5 calendar">
          <Selector onUpdate={this.onUpdate} {...this.state}></Selector>
        </div>
        <div class="col-lg-7 calendar">
          <Viewer ref={this.selectorElement} {...this.state}></Viewer>
        </div>
      </React.Fragment>
    );
  };

  onUpdate = cells => {
    this.selectorElement.current.updateCurrentUser(cells);
    // this.setState({ cells });
  };
}
