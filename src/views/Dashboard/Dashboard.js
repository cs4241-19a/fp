import React, { Component } from 'react';
import './Dashboard.css'
import Tabulator from "tabulator-tables"; //import Tabulator library
import * as tableFunctions from './TableFunctions.js'


class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }
    
    render() {
        return(
            <section class="section field">
                <div class="columns">
                    <div class="column">
                        <div class="notification" id="nameBox">
                        <form class="item" action="">
                            <h5> Enter Club Name: </h5>
                            <input class="selStyle" type='text' id='name'/>
                        </form>
                        </div>
                    </div>
                    <div class="column">
                        <div class="notification" id="requestBox">
                            <div class="item">
                                <h5> Enter Requested Amount: </h5>
                                <input class="selStyle" type='text' id='request'/>
                            </div>              
                        </div>
                    </div>
                    <div class="column">
                        <div class="notification" id="approveBox">
                            <div class="item">
                                <h5> Enter Approved Amount: </h5>
                                <input class="selStyle" type='text' id='approve'/>
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
}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    el = React.createRef();

    tabulator = null; //variable to hold your table
    budgets = [ // sample data
        {
            "id": 1,
            "name": "Cheese Club",
            "requested": 3000,
            "approved": 2500
        },
        {
            "id": 2,
            "name": "Soccomm Movies",
            "requested": 4500,
            "approved": 4500
        },
        {
            "id": 3,
            "name": "Ski Club",
            "requested": 3600,
            "approved": 3300
        },
        {
            "id": 4,
            "name": "Women In ECE",
            "requested": 400,
            "approved": 300
        },
    ]


    componentDidMount() {
         //instantiate Tabulator when element is mounted
        this.tabulator = new Tabulator(this.el, {
        
            /* TODO - change to this.getData() */
        data: this.budgets, 

        layout:"fitColumns",      //fit columns to width of table
	    responsiveLayout:"hide",  //hide columns that dont fit on the table
	    tooltips:true,            //show tool tips on cells
	    addRowPos:"top",          //when adding a new row, add it to the top of the table
	    history:true,             //allow undo and redo actions on the table
	    pagination:"local",       //paginate the data
	    paginationSize:50,         //allow 7 rows per page of data
	    movableColumns:true,      //allow column order to be changed
	    resizableRows:true,       //allow row order to be changed
	    initialSort:[             //set the initial sort order of the data
		    {column:"name", dir:"asc"},
	    ],
        columns: [
            {title: "ID", field: "id", visible: false},
            {title:"Name", field:"name", headerFilter: "input", editor:"input", bottomCalc:"count", cellEdited:function(cell){
                console.log(cell)
                tableFunctions.modifyRow(cell);}},
            {title:"Requested Amount", field:"requested", formatter:"money", editor: "input", bottomCalc:"sum", bottomCalcFormatter: "money", headerFilter: "input", 
                bottomCalcFormatterParams:  {
                decimal: ".",
                thousand: ",",
                symbol: "$"
                }, formatterParams: {
                    decimal: ".",
                    thousand: ",",
                    symbol: "$"
                }, cellEdited:function(cell){ console.log(cell); tableFunctions.modifyRow(cell);}},
            {title:"Approved Amount", field:"approved", formatter:"money", editor: "input", bottomCalc:"sum", bottomCalcFormatter: "money", headerFilter: "input", 
                bottomCalcFormatterParams:  {
                decimal: ".",
                thousand: ",",
                symbol: "$"
                }, formatterParams: {
                    decimal: ".",
                    thousand: ",",
                    symbol: "$"
                }, cellEdited:function(cell){ console.log(cell); tableFunctions.modifyRow(cell);}},
            {formatter:"buttonCross", width:40, align:"center", cellClick:function(e, cell){
                cell.getRow().delete();
                tableFunctions.deleteRow(cell);
            }}
        ] 
        })
    }

    getData = async () => {
        const response = await fetch('/api/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ users: body.users });
    }

    render() {
        return (
            <section class = "section table">
                <div ref={el => (this.el = el)} />
            </section>
        )
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }
  
    //add table holder element to DOM
    render() {
      return (
        <div>
            <br></br>
            <h1> To do: Add submit data option on top of table </h1>
            <h1> To do: Add export options on the bottom of the table </h1>
            <h1> To do: Add confirmation on edit of cells </h1>
            <br></br>
            <Field></Field>
            <Table></Table>
        </div>  
      );
    }  
}

export default Dashboard