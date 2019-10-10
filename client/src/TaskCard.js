import React from 'react';
import {Card} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Form, FormGroup, ControlLabel, FormControl, inputRef, row, col, Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css";
import './TaskCard.css'

class TaskCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
		
		this.updated = {
			title: "",
			date: new moment().format('MM-DD-YYYY'),
			priority_text: 'Low',
			description: "",
			id: this.props.data.id,
		};
    }
	
	
	handleChange = (id, event) => {
		if (id === 'title'){
			this.updated.title = event.target.value;
		}
		if (id === 'description'){
			this.updated.description = event.target.value;
		}
		if (id === 'priority'){
			let text = "";
			switch(event.target.value){
				case "0":
					text = 'Low';
					break;
				case "1":
					text = 'Medium';
					break;
				case "2":
					text = 'High';
					break;
				default:
					text = 'Medium';
					break;
			}
			this.updated.priority_text = text;
		}
	}
	
	handleDateChange = event => {
		this.updated.date = moment(event.target.value).format("MM-DD-YYYY");
	}
  
	handleSubmit = event => {
		this.props.buttonCallback(3, this.updated);
		this.setState({show: false});
	}
  
	
	// On click for task complete
	handleDone = event => {
		// This is for testing, remove 
		this.props.buttonCallback(0, null);
		
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
		
		console.log(this.props.data.title);
		this.updated.title = this.props.data.title;
		this.updated.description = this.props.data.description;
		this.updated.priority_text = this.props.data.priority_text;
		this.updated.date = this.props.data.date;
		return (
			<div className={'card-z-'+this.props.data.z+" w-100 row justify-content-center align-items-center" + (this.props.data.hidden ? " hidden": "")}>
			<Card bg={this.props.data.priority_text} text="secondary" style={{ width: '30rem' }}>
						<Card.Header>
						<Card.Title className = "text-center" controlId="title">{this.props.data.title}</Card.Title>
						<Card.Text className = "text-right" controlId="dueDate">{this.props.data.date}</Card.Text>
						</Card.Header>
					<Card.Body>
					<div className="mb-3 text-center">{this.props.data.priority_text}</div>
					<Card.Text className = "text-justify" controlId = 'discription'>{this.props.data.description}</Card.Text>
					<ButtonToolbar>
						<Button variant="outline-success" style={{ margin: '5px' }} onClick = {this.handleDone}>Done</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleMoreTime}>More Time</Button>
						<Button variant="outline-secondary" style={{ margin: '5px' }} onClick = {this.handleEdit}>Edit</Button>
						<Button variant="outline-danger" style={{ margin: '5px' }} onClick = {this.handleDelete}>Delete</Button>
					</ButtonToolbar>
					</Card.Body>
				</Card>
				
				 <Modal  show={this.state.show} onHide={this.handleClose}>
					<div> 
						<Card bg="info" text="secondary" style={{ width: '30rem' , margin: '10px'}}>
						   <Card.Header>
								<Form>
									<Form.Group controlId="title">
										<Form.Control 
											autoFocus
											type="text"
											placeholder={this.props.data.title}
											onChange={event => this.handleChange("title", event)}
										/>
									</Form.Group>
								</Form>
								<Form.Group className ="text-right" controlId = "date">
									<Form.Label>Select a Due Date: </Form.Label>
									<input type = 'date' defaultValue = {this.updated.date} onChange={this.handleDateChange}/>
								</Form.Group>
						   </Card.Header>
						  <Card.Body>
							<Form>						
								<div className = "mb-3 text-center" onChange={(e) => this.handleChange('priority', e)}>
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
										placeholder={this.props.data.description}
										onChange={(e) => this.handleChange("description", e)}
										/>
								</Form.Group>
							</Form>
							<ButtonToolbar>
								<Button variant="outline-secondary" style={{ margin: '5px' }} type = "submit" onClick = {this.handleSubmit}> Confirm </Button>
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

export default TaskCard;
