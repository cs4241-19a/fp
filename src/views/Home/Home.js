import React, { Component } from 'react';

class Home extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        users: [],
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

    showUsers = user =>
        <li key={user.id}>{user.username}</li>


    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();

        this.setState({ responseToPost: body });
    };

    render() {
        const { users } = this.state;
        return (
            <div className="App">
                {/* <p>{this.state.response}</p> */}
                <div>
                    <ul>
                        {users.map(this.showUsers)}
                    </ul>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Post to Server:</strong>
                    </p>
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.setState({ post: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
            </div>
        );
    }
}

export default Home;
