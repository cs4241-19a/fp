import React, { Component } from 'react';

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
        this.setState({ budgets: Object.values(body) });
    }

    showUsers = user => <li key={user.id}>{user.username}</li>


    showBudgets = (budget, index) =>
        <li key={index}>
            {budget.name} - Requested ${budget.requested} - Approved ${budget.approved}
        </li>


    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/addBudget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.state.name, requested: 3000, approved: 2700 }),
        });
        const body = await response;

        this.setState({ budgets: Object.values(body) });
        this.getBudgets();
    };

    render() {
        const { users, budgets } = this.state;
        return (
            <div className="App">
                {/* <p>{this.state.response}</p> */}
                <div>
                    <ul>
                        {users.map(this.showUsers)}
                    </ul>
                </div>

                <div>
                    <ul>
                        {
                            budgets.map(this.showBudgets)
                        }
                    </ul>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Add budget:</strong>
                    </p>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
            </div>
        );
    }
}

export default Home;
