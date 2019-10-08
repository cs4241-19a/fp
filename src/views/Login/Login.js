import React, { Component } from 'react';
import "./Login.css";
import 'bulma/css/bulma.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faUserLock, faKey, faAddressCard } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faUserLock, faKey, faAddressCard);

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        }
    }

    // This will toggle the is-success class on the input field
    toggle(event) {
        if(event.target.value !== "")
            this.setState({success: true})
        else
            this.setState({success: false})
    }

    render() {
        return (
            <div className="vessel">
                <div className="columns">
                    <div className="column is-one-third">
                        <FontAwesomeIcon icon={this.props.icon} size = "2x"/>
                    </div>
                    <div className="column is-two-third">
                        <input  className= { this.state.success ?  "input is-success" : "input" }
                                type="text" 
                                name={this.props.name} 
                                placeholder={this.props.placeholder}
                                onInput = {this.toggle.bind(this)}
                        ></input>
                    </div>
                </div>
            </div>
        )
    }
}

class SignInButton extends Component {
    render() {
        return (
            <button className = "button is-success">Submit</button>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="outer notification background-light">
                <div className = "center titleContainer has-background-white">
                    <p className = "title">Sign In</p>
                </div>
                <Field name="Username" placeholder="Username" icon="user-lock"></Field>
                <Field name="Password" placeholder="Password" icon="key"></Field>
                <div className="vessel">
                    <SignInButton></SignInButton>
                </div>
            </div>
        );
    }
}

export default Login;
