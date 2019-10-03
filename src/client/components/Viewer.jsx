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
      current_cell_value: "",
      gradient_array: []
    };
    const rows =
      1 +
      2 * (this.props.endTime - this.props.startTime) +
      (this.props.startTime % 1 === 0 ? 0 : 1);
    const cols = this.props.headings.length;
    this.state.free_count = new Array(rows)
      .fill("")
      .map(() => new Array(cols).fill(""));
    console.log(this.props.cells);
    console.log(this.state.free_count);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const current_count = this.props.cells[i][j].count("1");
        if (current_count < this.state.min_count) {
          this.state.min_count = current_count;
        }
        this.state.max_count = Math.max(current_count, this.state.max_count);
        this.state.free_count[i][j] = current_count;
      }
    }
    console.log(this.state.min_count);
    console.log(this.state.max_count);
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
      <tr>
        {this.props.headings.map((heading, index) => {
          return <td disabled>{heading}</td>;
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
    return times.map((time, index) => {
      return (
        <tr>
          {this.props.headings.map((heading, index) => {
            const value = index === 0 ? time : "";
            return <td disabled={index === 0}>{value}</td>;
          })}
        </tr>
      );
    });
  }

  handleMouseOut = e => {
    this.setState({ mouse_in: false });
  };

  renderPeople() {
    return this.props.users.map((user, index) => {
      const [i, j] = this.state.current_cell;

      let text_color =
        this.props.cells[i][j][index] === "0" ? "busy-user" : "available-user";
      if (!this.state.mouse_in) {
        text_color = "";
      }
      return <li class={text_color}>{user}</li>;
    });
  }

  renderAvailabilityGradient() {
    return (
      <div class="row">
        <div class="col-lg-4 text-right">
          0/{this.props.users.length} Available
        </div>
        <div class="col-lg-4 text-center">
          <table class="availability-gradient">
            <tbody>
              <tr>
                {this.state.gradient_array.map((color, index) => {
                  return <td bgcolor={color}></td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-4">
          {this.state.max_count}/{this.props.users.length} Available
        </div>
      </div>
    );
  }

  render() {
    let availability_print = this.state.mouse_in
      ? this.state.current_cell_value.count("1") +
        "/" +
        this.props.users.length +
        " Available"
      : "  ";
    return (
      <React.Fragment>
        <div class="row">
          <div class="col-lg-3">
            <h2>Individual Availability</h2>
            <ul>{this.renderPeople()}</ul>
          </div>
          <div class="col-lg-9" id="table-view">
            <h2 class="text-center">Group Availability</h2>
            {this.renderAvailabilityGradient()}
            <p class="text-center">Mouseover to see availability</p>
            <TableDragView
              value={this.state.free_count}
              onChange={this.handleChange}
            >
              {this.renderTableHeader()}
              {this.renderTableBody()}
            </TableDragView>
            <h3 class="text-center">{availability_print}</h3>
          </div>
        </div>
      </React.Fragment>
    );
  }

  updateCurrentUser = newCells => {
    const rows = this.props.cells.length;
    const cols = this.props.cells[0].length;
    const k = this.props.users.length - 1;
    let fCount = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    this.setState({ min_count: 10000, max_count: -10000 });
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.props.cells[i][j] =
          this.props.cells[i][j].substring(0, k) + (newCells[i][j] ? "1" : "0");
        const current_count = this.props.cells[i][j].count("1");
        if (current_count < this.state.min_count) {
          this.setState({ min_count: current_count });
        }
        if (current_count > this.state.max_count) {
          this.setState({ max_count: current_count });
        }
        // console.log("current count " + current_count);
        fCount[i][j] = current_count;
      }
    }

    const gradient_array = computeGradient(0, this.state.max_count);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        fCount[i][j] = gradient_array[fCount[i][j]];
      }
    }

    this.setState({ gradient_array: gradient_array, free_count: fCount });
  };

  handleChange = (row, col) =>
    this.setState({
      current_cell: [row, col],
      mouse_in: true,
      current_cell_value: this.props.cells[row][col]
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
  return gradient_out;
};
