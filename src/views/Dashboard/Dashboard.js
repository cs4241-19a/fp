import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        console.log(this.props.session);
        return(
            <div>
                <BarGraph></BarGraph>
                <Field getData={this.getData}></Field>
                <Table data={this.state.budgets}></Table>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        route: state.session
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapDispatchToProps, mapStateToProps)(Dashboard);