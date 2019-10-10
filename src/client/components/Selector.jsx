import React from "react";
import TableDragSelect from "./table-drag/table-drag-select";
// import "./table-drag/style.css";

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: []
    };

    // const rows =
    //   1 +
    //   2 * (props.event.stopTime - props.event.startTime) +
    //   (props.event.startTime % 1 === 0 ? 0 : 1);
    // const cols = props.event.heading.length;
    // this.state.cells = new Array(rows)
    //   .fill(false)
    //   .map(() => new Array(cols).fill(false));
    this.state.cells = props.event.selectorCells;
    console.log("done with constructor");
  }

  renderTableHeader() {
    return (
      <tr key="selectorHeader">
        {this.props.event.heading.map((heading, index) => {
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
      let i = this.props.event.startTime;
      i < this.props.event.stopTime;
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
          {this.props.event.heading.map((heading, index) => {
            if (index === 0) {
              return (
                <td key={index} disabled={index === 0}>
                  {time}
                </td>
              );
            } else {
              return <td key={index} disabled={index === 0}></td>;
            }
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
