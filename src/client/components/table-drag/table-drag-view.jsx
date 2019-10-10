import React from "react";
import PropTypes from "prop-types";

export default class TableDragView extends React.Component {
  state = {
    selectionStarted: false,
    startRow: null,
    startColumn: null,
    endRow: null,
    endColumn: null,
    addMode: null,
    currentCell: null,
    table_element: null,
    value: this.props.value
  };

  static propTypes = {
    value: props => {
      const error = new Error(
        "Invalid prop `value` supplied to `TableDragView`. Validation failed."
      );
      if (!Array.isArray(props.value)) {
        return error;
      }
      const rowCount = props.value.length;
      if (rowCount === 0) {
        return;
      }
      const columnCount = props.value[0].length;
      for (const row of props.value) {
        if (!Array.isArray(row) || row.length !== columnCount) {
          return error;
        }
        for (const cell of row) {
          if (typeof cell !== "string") {
            return error;
          }
        }
      }
    },
    maxRows: PropTypes.number,
    maxColumns: PropTypes.number,
    onSelectionStart: PropTypes.func,
    onInput: PropTypes.func,
    onChange: PropTypes.func,
    children: props => {
      if (TableDragView.propTypes.value(props)) {
        return; // Let error be handled elsewhere
      }
      const error = new Error(
        "Invalid prop `children` supplied to `TableDragView`. Validation failed."
      );
      const trs = React.Children.toArray(props.children);
      const rowCount = props.value.length;
      const columnCount = props.value.length === 0 ? 0 : props.value[0].length;
      if (trs.length !== rowCount) {
        return error;
      }
      for (const tr of trs) {
        const tds = React.Children.toArray(tr.props.children);
        if (tr.type !== "tr" || tds.length !== columnCount) {
          return error;
        }
        for (const td of tds) {
          if (td.type !== "td") {
            return error;
          }
        }
      }
    }
  };

  static defaultProps = {
    maxRows: Infinity,
    maxColumns: Infinity,
    onSelectionStart: () => {},
    onInput: () => {},
    onChange: () => {}
  };

  componentDidMount = () => {
    document
      .getElementById("tablebody")
      .addEventListener("mouseover", this.handleMouseOver);
  };

  componentWillUnmount = () => {
    document
      .getElementById("tablebody")
      .removeEventListener("mouseover", this.handleMouseOver);
  };

  render = () => {
    return (
      <React.Fragment>
        <table className="table-drag-select">
          <tbody id="tablebody"> {this.renderRows()} </tbody>{" "}
        </table>
      </React.Fragment>
    );
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  renderRows = () =>
    React.Children.map(this.props.children, (tr, i) => {
      return (
        <tr key={i} {...tr.props}>
          {" "}
          {React.Children.map(tr.props.children, (cell, j) => {
            let color = "";
            let className = "";
            if (i === 0 || j === 0) {
              className += " cell-disabled";
            } else {
              color = this.state.value[i][j];
            }
            return (
              <td key={j} className={className} bgcolor={color}>
                {" "}
                {cell.props.children}{" "}
              </td>
            );
          })}{" "}
        </tr>
      );
    });

  handleMouseOver = e => {
    const { row, column } = eventToCellLocation(e);
    if (row > 0 && column > 0) {
      this.props.onChange(row, column);
      this.setState({ currentCell: row + " " + column });
    }
  };
}

// Takes a mouse or touch event and returns the corresponding row and cell.
// Example:
//
// eventToCellLocation(event);
// {row: 2, column: 3}
const eventToCellLocation = e => {
  let target;
  // For touchmove and touchend events, e.target and e.touches[n].target are
  // wrong, so we have to rely on elementFromPoint(). For mouse clicks, we have
  // to use e.target.
  if (e.touches) {
    const touch = e.touches[0];
    target = document.elementFromPoint(touch.clientX, touch.clientY);
  } else {
    target = e.target;
    while (target.tagName !== "TD") {
      target = target.parentNode;
    }
  }
  return {
    row: target.parentNode.rowIndex,
    column: target.cellIndex
  };
};
