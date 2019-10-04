import React from "react";
import TableDragSelect from "./table-drag/table-drag-select";
// import "./table-drag/style.css";

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: []
    };
    const rows =
      1 +
      2 * (this.props.endTime - this.props.startTime) +
      (this.props.startTime % 1 === 0 ? 0 : 1);    
      const cols = this.props.headings.length;
    this.state.cells = new Array(rows)
      .fill(false)
      .map(() => new Array(cols).fill(false));

  }

  renderTableHeader() {
    return (
      <tr key='selectorHeader'>
        {this.props.headings.map((heading, index) => {
          return <td key={index} disabled>{heading}</td>;
        })}
      </tr>
    );
  }

  renderTableBody() {
    let times = [];
    for (let i = this.props.startTime; i < this.props.endTime; i += 0.5) {
      const ending = i < 13 ? "AM" : "PM";
      const min = i % 1 === 0 ? "00" : "30";
      const hour = (Math.trunc(i) % 13) + (i < 13 ? 0 : 1);
      times.push(hour + ":" + min + " " + ending);
    }
    // console.log(times);
    return times.map((time, index) => {
      return (
        <tr key={'selectorBody' + index}>
          {this.props.headings.map((heading, index) => {
            const value = index === 0 ? time : "";
            return <td key={index} disabled={index === 0}>{value}</td>;
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
