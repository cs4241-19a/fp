import React, { Component } from 'react';
import BarGraph from '../Graph/Graph';
import Field from '../../components/Field.js';
import Table from './Table.js';

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
                <br/>
                <BarGraph></BarGraph>
                <Field getData={this.getData}></Field>
                <Table data={this.state.budgets}></Table>
            </div>
        )
    }
}

export default Dashboard