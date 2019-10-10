import React from 'react';
import {Card} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Form, FormGroup, ControlLabel, FormControl, inputRef, row, col, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker'
//import TimePicker from 'rc-time-picker';
import moment from 'moment';
//import 'rc-time-picker/assets/index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

class TaskCardEntry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			taskTitle: "",
			dueDate: new Date(),
			priority: 0,
			description: "",
			show: false
		};
    }
	
	// handle the date day changing (seperate from the rest of the data changing
	handleDateChange = date => {
		this.setState({
		  dueDate: date
		});
	};
  
	
  
    // default data updating
    handleChange = event => {
		this.setState({
		  [event.target.id]: event.target.value
		});
		console.log(event.target.value);
	}
  
	// on submit click
   handleSubmit = event => {
		event.preventDefault();
		this.setState({show: false});
	//	var dueDate = moment().format(this.state.dueDate)
	//	console.log(dueDate);
		fetch("/createtask",
		{
			"method": "POST",
			"body": JSON.stringify(
			{
				"title": this.state.taskTitle,
				"dueDate": this.state.dueDate,
				"priority": this.state.priority,
				"description": this.state.description,
				"completed": false,
				"uhoh": false,
				"doLater": false,
			}),
			"headers": {"Content-Type": "application/json"}
		})
		.then(console.log);
   }
   
   // cancel and close the card
   cancel = event => {
	   console.log("Cancelled");
   }
   
   handleClose = () => {
		this.setState({show: false});
	}
	handleEdit = () => {
		this.setState({show: true});
	}
	
	render() {
		return (
		<div className = "text-center">
		<Button variant="info"  onClick = {this.handleEdit}>New Task</Button>
		 <Modal  show={this.state.show} onHide={this.handleClose}>
			<div> 
				<Card bg="info" text="secondary" style={{ width: '30rem' }}>
				   <Card.Header>
						<Form>
							<Form.Group controlId="taskTitle">
								<Form.Control 
									autoFocus
									type="text"
									placeholder="Input Task Title"
									value={this.state.taskTitle}
									onChange={this.handleChange}
								/>
							</Form.Group>
						</Form>
						<Form.Group className ="text-right" controlId = "dueDateDay">
							<Form.Label>Select a Due Date: </Form.Label>
							<input type = 'date' onChange={this.handleDateChange}/>
						</Form.Group>
				   </Card.Header>
				  <Card.Body>
					<Form>						
						<div className = "mb-3 text-center" onChange={this.handleChange}>
							<input type="radio" value='0' name="priority" style={{ margin: '5px' }}/> Low
							<input type="radio" value='1' name="priority" style={{ margin: '5px' }}/> Medium
							<input type="radio" value='2' name="priority" style={{ margin: '5px' }}/> High
						</div>
											  
						<Form.Group controlId="description">
							<Form.Label>Task Description</Form.Label>
							<Form.Control
								as="textarea"
								rows="4"
								autoFocus
								value={this.state.description}
								onChange={this.handleChange}
								/>
						</Form.Group>
					</Form>
					<ButtonToolbar>
						<Button variant="outline-secondary" style={{ margin: '5px' }} type = "submit" onClick = {this.handleSubmit}> Add Task</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }}onClick = {this.handleClose}>Cancel</Button>
					</ButtonToolbar>
				  </Card.Body>
				</Card>
			</div>
		 </Modal>
		 </div>
		);	
	}
}

export default TaskCardEntry;