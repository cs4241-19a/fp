import React from 'react';
import {Card} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Form, FormGroup, ControlLabel, FormControl, inputRef, row, col, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

class TaskCardEntry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			taskTitle: "",
			dueDateDay: new Date(),
			dueDateTime: new Date(),
			priority: 0,
			description: "",
		};
    }
	
	// handle the date day changing (seperate from the rest of the data changing
	handleDateChange = date => {
		this.setState({
		  dueDateDay: date
		});
		console.log(this.state.dueDateDay);
	};
  
	handleTimeChange = time => {
		this.setState({
		  dueDateTime: time
		});
		console.log(this.state.dueDateTime)
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
		var dueDate = moment().format(this.state.dueDateDay + " " + this.state.dueDateTime)
		console.log(dueDate);
		fetch("/createtask",
		{
			"method": "POST",
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
   }
   
   // cancel and close the card
   cancel = event => {
	   console.log("Cancelled");
   }
	
	render() {
		return (
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
							<DatePicker dateFormat="mm/dd/yyyy" selected={this.state.dueDateDay} onChange={this.handleDateChange} />
						</Form.Group>
						<Form.Group className ="text-right" controlId = "dueDateTime" >
							<Form.Label>Select a Due Date Time: </Form.Label>
							<TimePicker onChange={this.handleTimeChange} default = {moment()}/>
						</Form.Group>
				   </Card.Header>
				  <Card.Body>
					<Form>						
						<div className = "mb-3 text-center" onChange={this.handleChange}>
							<input type="radio" value='0' name="gender" style={{ margin: '5px' }}/> Low
							<input type="radio" value='1' name="gender" style={{ margin: '5px' }}/> Medium
							<input type="radio" value='2' name="gender" style={{ margin: '5px' }}/> High
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
						<Button variant="outline-secondary" style={{ margin: '5px' }}onClick = {this.cancel}>Cancel</Button>
					</ButtonToolbar>
				  </Card.Body>
				</Card>
			</div>
		);	
	}
}

export default TaskCardEntry;