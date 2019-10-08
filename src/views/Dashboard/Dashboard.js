import React, { Component } from 'react';
import './Dashboard.css'
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator'; // for React 15.x, use import { React15Tabulator }
import * as tableFunctions from './TableFunctions.js'

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return(
            <section class="center">
                <br></br>
                Give me a pretty graph :)
            </section>
        )
    }
}

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }
    
    render() {
        return(
            <section class="section fields">
                <div class="columns">
                    <div class="column">
                        <div class="notification" id="nameBox">
                        <form class="item" action="">
                            <h5> Enter Club Name: </h5>
                            <input class="selStyle fieldInput" type='text' id='name'/>
                        </form>
                        </div>
                    </div>
                    <div class="column">
                        <div class="notification" id="requestBox">
                            <div class="item">
                                <h5> Enter Requested Amount: </h5>
                                <input class="selStyle fieldInput" type='text' id='request'/>
                            </div>              
                        </div>
                    </div>
                    <div class="column">
                        <div class="notification" id="approveBox">
                            <div class="item">
                                <h5> Enter Approved Amount: </h5>
                                <input class="selStyle fieldInput" type='text' id='approve'/>
                            </div>              
                        </div>
                    </div>
                </div>
            </section>)     
    }
}

class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return(
            <section class=" section center submitButton">
                <a class="button btn is-primary is-focused is-fullwidth" id="submit" disabled>Submit Data</a>
            </section>)
    }

}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgets: []
        };
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

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const response = await fetch('/api/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ budgets: body.budgets });
    }


    //add table holder element to DOM
    render() {
        return (
            <section class="section table">
                <ReactTabulator columns={this.columns} data={this.state.budgets} options={this.options} />
            </section>
        );
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return(
            <div>
                <Graph></Graph>
                <Field></Field>
                <Submit></Submit>
                <Table></Table>
            </div>
        )
    }
}

export default Dashboard