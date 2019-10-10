import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl, inputRef} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
//import './Login.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

//function Login() {
class Login extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		username: "",
		password: "",
		signUpUsername: "",
		signUpPassword: "",
		};
    }
	
	//validates the log in form for blanks
	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
    }
	
	// validates the sign up form for blanks
	validateSignupForm() {
		return this.state.signUpUsername.length > 0 && this.state.signUpPassword.length > 0;
    }
	
	// handles text changing in any of the input fields
    handleChange = event => {
		this.setState({
		  [event.target.id]: event.target.value
		});
	}
	
	// login submit clicked
    handleLoginSubmit = event => {
		event.preventDefault();
		fetch("/login",
		{
			"method": "POST",
			"body": JSON.stringify(
			{
				"username": this.state.username,
				"password": this.state.password,
			}),
			"headers": {"Content-Type": "application/json"}
		})
		.then(console.log)
   }
   
   // signup submit clicked
    handleSignUpSubmit = event => {
		event.preventDefault();
		fetch("/signup",
		{
			"method": "POST",
			"body": JSON.stringify(
			{
				"username": this.state.signUpUsername,
				"password": this.state.signUpPassword,
			}),
			"headers": {"Content-Type": "application/json"}
		})
		.then(console.log)
   }
  
	
	render()
	{
    return (
	<div style= {{margin: '100px'}}> 
		<h2>Existing User Login</h2>
		<Form onSubmit={this.handleLoginSubmit} >
		  <Form.Group controlId="username">
			<Form.Label>Username </Form.Label>
			<Form.Control 
				autoFocus
				type="text"
				placeholder="Enter Username"
				value={this.state.username}
				onChange={this.handleChange}
			/>
		  </Form.Group>

		  <Form.Group controlId="password">
			<Form.Label>Password </Form.Label>
			<Form.Control 
				autoFocus
				type="password" 
				placeholder="Enter Password" 
				value={this.state.password}
				onChange={this.handleChange}
			/>
		  </Form.Group>
		  <Button disabled={!this.validateForm()}
            type="submit">Log In</Button>
		</Form>
		
		<h2><br></br>Create a New Account </h2>
		<Form onSubmit={this.handleSignUpSubmit}>
		  <Form.Group controlId="signUpUsername">
			<Form.Label>Username </Form.Label>
			<Form.Control 
				autoFocus
				type="text"
				placeholder="Create Username"
				value={this.state.signUpUsername}
				onChange={this.handleChange}
			/>
		  </Form.Group>

		  <Form.Group controlId="signUpPassword">
			<Form.Label>Password </Form.Label>
			<Form.Control 
				autoFocus
				type="password" 
				placeholder="Create Password" 
				value={this.state.signUpPassword}
				onChange={this.handleChange}
			/>
		  </Form.Group>
		  <Button disabled={!this.validateSignupForm()}
            type="submit">Sign Up</Button>
		</Form>
	</div>
    );
	}
};


export default Login;