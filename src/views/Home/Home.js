import React, { Component } from 'react';
import BarGraph from '../Graph/Graph';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        response: '',
        name: '',
        responseToPost: '',
        users: [],
        budgets: []
    };

    render() {
        return (
            <div className="App">
                <br/>
                <br/>
                <BarGraph/>
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
