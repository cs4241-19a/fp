import React, { Component } from 'react';
import "./Login.css";

class Field extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        }
    }

    render() {
        return (
            <div className = "vessel">
                <p>{this.props.name}</p>
                <input className = "field" type = "text" name = {this.props.name}></input>
            </div>
        )
    }
}

class SignInButton extends Component {
    render() {
        return (
            <button className = "button">Sign In</button>
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
            <div className = "outer">
                <Field name = "Username: "></Field>
                <Field name = "Password: "></Field>
                <div className = "vessel">
                    <SignInButton></SignInButton>
                </div>
            </div>
        );
    }
}

export default Login;
