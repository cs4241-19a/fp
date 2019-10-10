import React from "react";
import TableDragSelect from "./table-drag/table-drag-select";
// import "./table-drag/style.css";

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
      event: null
    };
    let event;
    if (this.props.loadedEvent != null) {
      event = this.props.loadedEvent;
    } else {
      event = {
        startTime: 9,
        stopTime: 12,
        days: [1, 0, 2, 1]
      };
    }
    this.state.event = event;

    const rows =
      1 +
      2 * (event.stopTime - event.startTime) +
      (event.startTime % 1 === 0 ? 0 : 1);
    const cols = event.days.length;
    this.state.cells = new Array(rows)
      .fill(false)
      .map(() => new Array(cols).fill(false));
  }

  renderTableHeader() {
    return (
      <tr key="selectorHeader">
        {this.state.event.days.map((heading, index) => {
          return (
            <td key={index} disabled>
              {heading}
            </td>
          );
        })}
      </tr>
    );
  }

  renderTableBody() {
    let times = [];
    for (
      let i = this.state.event.startTime;
      i < this.state.event.stopTime;
      i += 0.5
    ) {
      const ending = i < 13 ? "AM" : "PM";
      const min = i % 1 === 0 ? "00" : "30";
      const hour = (Math.trunc(i) % 13) + (i < 13 ? 0 : 1);
      const timeString = hour + ":" + min + " " + ending;

      times.push(i % 1 !== 0 ? "" : timeString);
    }
    return times.map((time, index) => {
      return (
        <tr key={"selectorBody" + index}>
          {this.state.event.days.map((heading, index) => {
            const value = index === 0 ? time : "";
            return (
              <td key={index} disabled={index === 0}>
                {value}
              </td>
            );
          })}
        </tr>
      );
    });
  }

  render = () => (
    <TableDragSelect value={this.state.cells} onChange={this.handleChange}>
      {this.renderTableHeader()}
      {this.renderTableBody()}
    </TableDragSelect>
  );

  handleChange = cells => {
    this.props.onUpdate(cells);
    this.setState({ cells });
  };
}

export default Selector;
