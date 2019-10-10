import React, { Component } from 'react';
import BarGraph from '../Graph/Graph';

class Home extends Component {
    constructor(props) {
        super(props);
        this.getBudgets();
    }
    state = {
        response: '',
        name: '',
        responseToPost: '',
        users: [],
        budgets: []
    };

    componentDidMount() {
        this.getUsers();
        // this.callApi()
        //   .then(res => this.setState({ response: res.express }))
        //   .catch(err => console.log(err));
    }


    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    getUsers = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({ users: body.users });
    };

    getBudgets = async () => {
        const response = await fetch('/api/home');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log(Object.values(body));
        this.setState({ budgets: body.budgets });
    }

    showUsers = user => <li key={user.id}>{user.username}</li>


    showBudgets = (budget, index) =>
        <li key={index}>
            {budget.name} - Requested ${budget.requested} - Approved ${budget.approved}
        </li>

    render() {
        const { users, budgets } = this.state;
        return (
            <div className="App">
                {/* <p>{this.state.response}</p> */}
                <div class='ct-chart-bar ct-golden-section'>
                    <BarGraph/>
                </div>
            </div>
        );
    }
}
/*
<div>
    <ul>
        {users.map(this.showUsers)}
    </ul>
</div>
<div>
     <ul>
        {budgets.map(this.showBudgets)}
     </ul>
</div>

 */

export default Home;
