import React, { Component } from 'react';
import './Field.css'

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budgets: [],
            name: '',
            requested: '',
            approved: '',
        };
    }

    handleSubmit = async e => {
        var answer = window.confirm("Are you sure you want to add this data?")
        if (answer) {
            const response = await fetch('/api/addBudget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: this.state.name, 
                                  requested: this.state.requested,
                                   approved: this.state.approved}),
            });
            const body = await response;
            if (body) {
                this.props.getData();
            }   
        }
        else {
            this.setState({name: ' '});
            this.setState({requested: null});
            this.setState({approved: null})
        }
    };
    
    render() {
        return(
            <div>
                <section class="section fields">
                <div class="columns">
                    <div class="column">
                        <div class="notification" id="nameBox">
                        <form class="item" action="">
                            <h5 class = "label"> Enter Club Name </h5>
                            <input 
                                placeholder="ex. Cheese Club"
                                class= { this.state.name === '' ? 'input' : 'input is-success'}
                                type='text' 
                                value={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })}/>
                        </form>
                        </div>
                    </div>
                    <div class="column">
                        <div class="notification" id="requestBox">
                            <div class="item">
                                <h5 class = "label"> Enter Requested Amount </h5>
                                <input 
                                    placeholder="ex. $10,000"
                                    class= { this.state.requested === '' ? 'input' : 'input is-success'}
                                    type='number' 
                                    value={this.state.requested}
                                    onChange={e => this.setState({ requested: e.target.value })}/>
                            </div>              
                        </div>
                    </div>
                    <div class="column">
                        <div class="notification" id="approveBox">
                            <div class="item">
                                <h5 class = "label"> Enter Approved Amount </h5>
                                <input
                                    placeholder="ex. $1,000" 
                                    class= { this.state.approved === '' ? 'input' : 'input is-success'}
                                    type='number' 
                                    value={this.state.approved}
                                    onChange={e => this.setState({ approved: e.target.value })}/>
                            </div>              
                        </div>
                    </div>
                </div>
                </section>
                <form onSubmit={this.handleSubmit}>
                    <section class=" section center submitButton">
                        <button 
                            class={this.state.name === '' || this.state.requested === '' || this.state.approved === '' ? "submitButton button is-fullwidth" : 'submitButton button is-danger is-fullwidth'} 
                            id="submit"
                            disabled={this.state.name === '' || this.state.requested === '' || this.state.approved === ''}>Submit Data</button>
                    </section>
                </form>
            </div>
            )     
    }
}

export default Field