import React, { Component } from 'react';
import './Table.css'
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/bulma/tabulator_bulma.min.css'; // theme
import { ReactTabulator } from 'react-tabulator'; // for React 15.x, use import { React15Tabulator }
import * as tableFunctions from './TableFunctions.js'


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    options = {
        layout: "fitColumns",      //fit columns to width of table
        responsiveLayout: "hide",  //hide columns that dont fit on the table
        tooltips: true,            //show tool tips on cells
        addRowPos: "top",          //when adding a new row, add it to the top of the table
        history: true,             //allow undo and redo actions on the table
        pagination: "local",       //paginate the data
        paginationSize: 50,         //allow 7 rows per page of data
        movableColumns: true,      //allow column order to be changed
        resizableRows: true,       //allow row order to be changed
        initialSort: [             //set the initial sort order of the data
            { column: "name", dir: "asc" },
        ]
    }

    columns = [
        { title: "ID", field: "id", visible: false },
        {
            title: "Name", field: "name", headerFilter: "input", editor: "input", bottomCalc: "count", cellEdited: function (cell) {
                console.log(cell)
                tableFunctions.modifyRow(cell);
            }
        },
        {
            title: "Requested Amount", field: "requested", formatter: "money", editor: "input", bottomCalc: "sum", bottomCalcFormatter: "money", headerFilter: "input",
            bottomCalcFormatterParams: {
                decimal: ".",
                thousand: ",",
                symbol: "$"
            }, formatterParams: {
                decimal: ".",
                thousand: ",",
                symbol: "$"
            }, cellEdited: function (cell) { console.log(cell); tableFunctions.modifyRow(cell); }
        },
        {
            title: "Approved Amount", field: "approved", formatter: "money", editor: "input", bottomCalc: "sum", bottomCalcFormatter: "money", headerFilter: "input",
            bottomCalcFormatterParams: {
                decimal: ".",
                thousand: ",",
                symbol: "$"
            }, formatterParams: {
                decimal: ".",
                thousand: ",",
                symbol: "$"
            }, cellEdited: function (cell) { console.log(cell); tableFunctions.modifyRow(cell); }
        },
        {
            formatter: "buttonCross", width: 40, align: "center", cellClick: function (e, cell) {
                cell.getRow().delete();
                tableFunctions.deleteRow(cell);
            }
        }
    ];


    //add table holder element to DOM
    render() {
        return (
            <section class="section table">
                <ReactTabulator columns={this.columns} data={this.props.data} options={this.options} />
            </section>
        );
    }
}

export default Table