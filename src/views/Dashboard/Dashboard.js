import React, { Component } from 'react';
import './Dashboard.css'
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator'; // for React 15.x, use import { React15Tabulator }
import * as tableFunctions from './TableFunctions.js'
import Graph from '../Graph/Graph';

class Graphy extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return(
            <section class="center">
                <Graph/>
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
import Field from '../../components/Field.js'
import Table from './Table.js'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgets: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const response = await fetch('/api/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ budgets: body.budgets });
    }

    render() {
        return(
            <div>
                <Graphy> </Graphy>
                <Field getData={this.getData}></Field>
                <Table data={this.state.budgets}></Table>
            </div>
        )
    }
}

export default Dashboard