import React from "react";
import TableDragView from "./table-drag/table-drag-view";
// import "./table-drag/style.css";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      free_count: null,
      mouse_in: false,
      min_count: 1000000,
      max_count: -1000000,
      current_cell: [0, 0],
      gradient_array: [],
      active_users: [],
      event: null
    };
    let event;
    if (this.props.loadedEvent != null) {
      event = this.props.loadedEvent;
    } else {
      event = {
        startTime: 9,
        stopTime: 12,
        days: [0, 0, 0],
        cells: [],
        users: [],
        headings: ["", "Mon", "Tues"]
      };
    }

    const rows =
      1 +
      2 * (event.stopTime - event.startTime) +
      (event.startTime % 1 === 0 ? 0 : 1);
    const cols = event.days.length;

    event.cells = new Array(rows).fill("").map(() => new Array(cols).fill(""));

    this.state.event = event;

    this.state.free_count = new Array(rows)
      .fill("")
      .map(() => new Array(cols).fill(""));
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current_count = this.state.event.cells[i][j].count("1");
        if (current_count < this.state.min_count) {
          this.state.min_count = current_count;
        }
        this.state.max_count = Math.max(current_count, this.state.max_count);
        this.state.free_count[i][j] = current_count;
      }
    }
    this.state.gradient_array = computeGradient(0, this.state.max_count);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.state.free_count[i][j] = this.state.gradient_array[
          this.state.free_count[i][j]
        ];
      }
    }
  }

  componentDidMount = () => {
    document
      .getElementById("table-view")
      .addEventListener("mouseout", this.handleMouseOut);
  };

  componentWillUnmount = () => {
    document
      .getElementById("table-view")
      .removeEventListener("mouseout", this.handleMouseOut);
  };

  renderTableHeader() {
    return (
      <tr key="tableHeader">
        {this.state.event.headings.map((heading, index) => {
          return (
            <td key={"viewheader" + index} disabled>
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
        <tr key={"tbtr" + index}>
          {this.state.event.headings.map((heading, index) => {
            const value = index === 0 ? time : "";
            return (
              <td key={"tablebody" + index} disabled={index === 0}>
                {value}
              </td>
            );
          })}
        </tr>
      );
    });
  }

  handleMouseOut = e => {
    this.setState({ mouse_in: false });
  };

  handleCheckbox = e => {
    const id = e.target.name;
    const isChecked = e.target.checked;
    const active_users = this.state.active_users;
    active_users[id] = isChecked;
    this.setState({ active_users });
    this.updateGrid();
  };

  renderPeople() {
    return this.state.event.users.map((user, index) => {
      const [i, j] = this.state.current_cell;

      let text_color =
        this.state.event.cells[i][j][index] === "0"
          ? "busy-user"
          : "available-user";
      if (!this.state.mouse_in) {
        text_color = "";
      }
      return (
        <div key={index}>
          <input
            name={index}
            id={user}
            type="checkbox"
            checked={this.state.active_users[index]}
            className={text_color}
            onChange={this.handleCheckbox}
          />
          <label htmlFor={user} className={text_color}>
            {user}
          </label>
        </div>
      );
    });
  }

  renderAvailabilityGradient() {
    const num_active = this.state.active_users.filter(Boolean).length;
    return (
      <div className="row">
        <div className="col-lg-4 text-right">
          0/{this.state.event.users.length} Available
        </div>
        <div className="col-lg-4 text-center">
          <table className="availability-gradient">
            <tbody>
              <tr key="trAvailGrad">
                {this.state.gradient_array.map((color, index) => {
                  const cName = color === "#339900" ? "best-time" : "";
                  return (
                    <td
                      key={"avagrad" + index}
                      className={cName}
                      bgcolor={color}
                    ></td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-lg-4">
          {this.state.max_count}/{num_active} Available
        </div>
      </div>
    );
  }

  render() {
    let current_value = 0;
    const [i, j] = this.state.current_cell;
    const current_cell = this.state.event.cells[i][j];
    for (let k = 0; k < current_cell.length; k++) {
      if (current_cell[k] === "1" && this.state.active_users[k]) {
        current_value += 1;
      }
    }
    let availability_print = this.state.mouse_in
      ? current_value +
        "/" +
        this.state.active_users.filter(Boolean).length +
        " Available"
      : "  ";
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-3">
            <h2>Individual Availability</h2>
            {/* <ul>{this.renderPeople()}</ul> */}
            {this.renderPeople()}
          </div>
          <div className="col-lg-9" id="table-view">
            <h2 className="text-center">Group Availability</h2>
            {this.renderAvailabilityGradient()}
            <p className="text-center">Mouseover to see availability</p>
            <TableDragView
              value={this.state.free_count}
              onChange={this.handleChange}
            >
              {this.renderTableHeader()}
              {this.renderTableBody()}
            </TableDragView>
            <h3 className="text-center">{availability_print}</h3>
          </div>
        </div>
      </React.Fragment>
    );
  }

  updateGrid = newCells => {
    const rows = this.state.event.cells.length;
    const cols = this.state.event.cells[0].length;
    const hasNew = typeof newCells !== "undefined";
    const stridx = this.state.event.users.length - 1;
    let free_count = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    let min_count = 10000,
      max_count = -10000;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (hasNew) {
          this.state.event.cells[i][j] =
            this.state.event.cells[i][j].substring(0, stridx) +
            (newCells[i][j] ? "1" : "0");
        }
        const current_cell = this.state.event.cells[i][j];
        const current_count = 0;
        for (let k = 0; k < current_cell.length; k++) {
          if (current_cell[k] === "1" && this.state.active_users[k]) {
            current_count += 1;
          }
        }
        if (current_count < min_count) {
          min_count = current_count;
        }
        if (current_count > max_count) {
          max_count = current_count;
        }
        free_count[i][j] = current_count;
      }
    }

    const gradient_array = computeGradient(0, max_count);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        free_count[i][j] = gradient_array[free_count[i][j]];
      }
    }

    this.setState({ gradient_array, free_count, min_count, max_count });
    // const rows = this.state.event.cells.length;
    // const cols = this.state.event.cells[0].length;
    // const k = this.state.event.users.length - 1;
    // let fCount = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    // this.setState({ min_count: 10000, max_count: -10000 });
    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < cols; j++) {
    //     this.state.event.cells[i][j] =
    //       this.state.event.cells[i][j].substring(0, k) + (newCells[i][j] ? "1" : "0");
    //     const current_count = this.state.event.cells[i][j].count("1");
    //     if (current_count < this.state.min_count) {
    //       this.setState({ min_count: current_count });
    //     }
    //     if (current_count > this.state.max_count) {
    //       this.setState({ max_count: current_count });
    //     }
    //     // console.log("current count " + current_count);
    //     fCount[i][j] = current_count;
    //   }
    // }

    // const gradient_array = computeGradient(0, this.state.max_count);
    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < cols; j++) {
    //     fCount[i][j] = gradient_array[fCount[i][j]];
    //   }
    // }

    // this.setState({ gradient_array: gradient_array, free_count: fCount });
  };

  handleChange = (row, col) =>
    this.setState({
      current_cell: [row, col],
      mouse_in: true
    });
}

String.prototype.count = function(c) {
  var result = 0,
    i = 0;
  for (i; i < this.length; i++) if (this[i] === c) result++;
  return result;
};

function map(value, fromSource, toSource, fromTarget, toTarget) {
  return (
    ((value - fromSource) / (toSource - fromSource)) * (toTarget - fromTarget) +
    fromTarget
  );
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

//https://stackoverflow.com/questions/3080421/javascript-color-gradient
const getColor = function(startColor, endColor, min, max, value) {
  var startRGB = hexToRgb(startColor);
  var endRGB = hexToRgb(endColor);
  var percentFade = map(value, min, max, 0, 1);

  var diffRed = endRGB.r - startRGB.r;
  var diffGreen = endRGB.g - startRGB.g;
  var diffBlue = endRGB.b - startRGB.b;

  diffRed = diffRed * percentFade + startRGB.r;
  diffGreen = diffGreen * percentFade + startRGB.g;
  diffBlue = diffBlue * percentFade + startRGB.b;

  return (
    "#" +
    Math.round(diffRed).toString(16) +
    Math.round(diffGreen).toString(16) +
    Math.round(diffBlue).toString(16)
  );
};

const computeGradient = function(min, max) {
  let start = "#EEEEEE";
  let end = "#339900";
  let gradient_out = [];
  for (let i = min; i <= max; i++) {
    let hexCode = getColor(start, end, min, max, i);
    gradient_out.push(hexCode);
  }
  //   console.log(gradient_out);
  // gradient_out[gradient_out.length - 1] = "#4287f5";
  return gradient_out;
};
