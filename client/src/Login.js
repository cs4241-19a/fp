import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl, inputRef} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './Login.scss';

//function Login() {
class Login extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		username: "",
		password: ""
		};
    }
	
	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
    }
	
    handleChange = event => {
		this.setState({
		  [event.target.id]: event.target.value
		});
	}
	
    handleSubmit = event => {
		event.preventDefault();
		fetch("/login",
		{
			"method": "POST",
			"body": JSON.stringify(
			{
				"username": this.state.username,
				"password": this.state.password,
			}),
			"headers":{"Content-Type": "application/json"}
		})  
   }
  
	
	render()
	{
    return (
	<div> 
		<Form onSubmit={this.handleSubmit}>
		  <Form.Group controlId="username">
			<Form.Label>Username </Form.Label>
			<Form.Control 
				autoFocus
				type="text"
				placeholder="Username"
				value={this.state.username}
				onChange={this.handleChange}
			/>
		  </Form.Group>

		  <Form.Group controlId="password">
			<Form.Label>Password </Form.Label>
			<Form.Control 
				autoFocus
				type="password" 
				placeholder="Password" 
				value={this.state.password}
				onChange={this.handleChange}
			/>
		  </Form.Group>
		  <Button disabled={!this.validateForm()}
            type="submit">Sign In</Button>
		</Form>
	</div>
    );
	}
};


export default Login;