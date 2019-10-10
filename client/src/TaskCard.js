import React from 'react';
import {Card} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Form, FormGroup, ControlLabel, FormControl, inputRef, row, col, Col, DatePicker} from 'react-bootstrap';
//import './Login.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskCard.css'

class TaskCard extends React.Component {

	constructor(props) {
		super(props);
    }
	// On click for task complete
	handleDone = event => {
		
		
	}
	
	handleDoLater = event => {
		
		
	}
	
	handleMoreTime = event => {
		
		
	}
	
	handleEdit = event => {
		
		
	}
	
	
	
	// deletes the current task on click
	handleDelete = event => {
		event.preventDefault();
	//	fetch("/deletetask",
		//{
		/*	"method": "POST",
			"body": JSON.stringify(
			{
				"title": this.state.taskTitle,
				"dueDate": dueDate,
				"priority": this.state.priority,
				"discription": this.state.description,
				"completed": false,
				"uhoh": false,
				"doLater": false,
			}),
			"headers": {"Content-Type": "application/json"}
		})
		.then(console.log)
		*/
	}
	
	

	render() {
		return (
			<div className={'card-z-'+this.props.card_z+" w-100 row justify-content-center align-items-center"}>
				<Card bg="warning" text="white" style={{ width: '30rem' }}>
						<Card.Header>
						<Card.Title className = "text-center" controlId="title">{this.props.data.title}</Card.Title>
						<Card.Text className = "text-right" controlId="dueDate">{this.props.data.date}</Card.Text>
						</Card.Header>
					<Card.Body>
					<div className="mb-3 text-center">{this.props.data.priority_text}</div>
					<Card.Text className = "text-justify" controlId = 'discription'>{this.props.data.description}</Card.Text>
					<ButtonToolbar>
						<Button variant="outline-success" style={{ margin: '5px' }} onClick = {this.handleDone}>Done</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleDoLater}>Do Later</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleMoreTime}>More Time</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleEdit}>Edit</Button>
						<Button variant="outline-danger" style={{ margin: '5px' }} onClick = {this.handleDelete}>Delete</Button>
					</ButtonToolbar>
					</Card.Body>
				</Card>
			</div>
		);
		
		
	}


}

export default TaskCard;
