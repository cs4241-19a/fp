import React from 'react';
import {Card} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Form, FormGroup, ControlLabel, FormControl, inputRef, row, col, Col, DatePicker} from 'react-bootstrap';
//import './Login.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';



class TaskCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
		

    }
	// On click for task complete
	handleDone = event => {
		
		
	}
	
	handleDoLater = event => {
		
		
	}
	
	handleMoreTime = event => {
		
		
	}
	
/*	handleEdit = event => {
		
		
	}
	*/
	handleClose = () => {
		this.setState({show: false});
	}
	handleEdit = () => {
		this.setState({show: true});
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
			<div> 
				<Card bg="Low" text="secondary" style={{ width: '30rem' }}>
				   <Card.Header>
						<Card.Title className = "text-center" controlId="title"> Task Title</Card.Title>
						<Card.Text className = "text-right" controlId="dueDate"> Due: 10/12 </Card.Text>
				   </Card.Header>
				  <Card.Body>
					<div key= 'priority' className="mb-3 text-center">
						<Form.Check inline label="Low" type='checkbox' id='low' disabled />
						<Form.Check inline label="Medium" type='checkbox' id='medium' checked disabled />
						<Form.Check inline label="High" type='checkbox' id='high' disabled/>
					</div>
					<Card.Text className = "text-justify" controlId = 'discription'> This is the assignment desicription. The details of the task are outlined in this section by the user when creating the task</Card.Text>
					<ButtonToolbar>
						<Button variant="outline-success" style={{ margin: '5px' }} onClick = {this.handleDone}>Done</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleDoLater}>Do Later</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleMoreTime}>More Time</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleEdit}>Edit</Button>
						<Button variant="outline-danger" style={{ margin: '5px' }} onClick = {this.handleDelete}>Delete</Button>
					</ButtonToolbar>
				  </Card.Body>
				</Card>
				
				 <Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={this.handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				  </Modal>
				
			</div>
		);
		
		
	}


}

export default TaskCard;
