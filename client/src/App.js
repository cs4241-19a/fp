import React from 'react';
import {Button} from 'react-bootstrap';

import TaskCard from './TaskCard';
import TaskCardEntry from './TaskCardEntry';

import './App.css';

import './Login.scss'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      task_head : 0,
      tasks: [
        {title: "hi", z: 3, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false, id: 0},
        {title: "hola", z: 2, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false, id: 1},
        {title: "ohio", z: 1, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false, id: 2},
        {title: "yo", z: 0, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false, id: 3},
        {title: "yooooooo", z: -1, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: true, id:4},
      ],
    }
  }

  fetchTasks(){
    fetch("/gettasks",{
      method: "POST",
    }).then(res => {
      let cards = res.json();
      for(let i=0; i<cards.length; i++){
        cards[i].z = -1;
        cards[i].hidden = true;
        if(i<4){
          cards[i].z = 3-i;
          cards[i].hidden = false;
        }

        let text = "";
        if(cards[i] == '0'){
          text = "Low"
        }else if (cards[i] == '1'){
          text = "Medium"
        }else{
          text = "High"
        }
        cards[i].priority_text = text;
        cards[i].date = cards[i].dueDate;
      }
      this.setState({tasks: cards})
    });
  }

  removeTopTask(){
    let tasks = this.state.tasks.slice();
    let task_head = this.state.task_head;

    for(let i=task_head; i<task_head+4 && i<tasks.length; i++){
      if(i===task_head){
        tasks[i].hidden=true;
      }else{
        tasks[i].z += 1;
        tasks[i].z %= 4;
      }
    }
    if(task_head + 4 < tasks.length){
      tasks[task_head+4].hidden = false;
      tasks[task_head+4].z = 0;
    }
    task_head += 1;
    this.setState({tasks: tasks, task_head: task_head});
  }

  updateFrontCard(data){
    let tasks = this.state.tasks.slice();
    data.z = 3;
    data.hidden = false;
    tasks[this.state.task_head] = data;
    this.setState({tasks : tasks});
  }

  /**
   * Do different things based on the button that has been clicked
   * @param {Int} button_code 0 done 1 Do Later(not implemented) 2 More Time (not implemented) 3 Edit 4 Delete
   * @param {Object} data additional data to be used
   */
  handleButton(button_code, data=null){
    switch(button_code){
      case 0:
        this.removeTopTask();
        fetch("/edittask", {
          method: "POST",
          body: JSON.stringify({
            id: data,
            completed: true,
          }),
          headers: {"Content-Type": "application/json"},
        })
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        fetch("/edittask", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {"Content-Type": "application/json"}
        })
        .then(console.log);
        this.updateFrontCard(data);
        break;
      case 4:
        this.removeTopTask();
        fetch("/detetask", {
          method: "POST",
          body: JSON.stringify({
            id: data,
          }),
          headers: {"Content-Type": "application/json"},
        })
        break;
      default:
        break;
    }
    this.fetchTasks();
  }

  renderTaskCard(num){
    const cards = []
    for(let i=0; i<num; i+=1){
      cards.push(<TaskCard 
        data={this.state.tasks[i]}
        buttonCallback={(b_id, data) => {this.handleButton(b_id, data)}} />)
    }
    return (
      cards
    )
  }
  
  renderTaskCardEntry(){
	  console.log("Doing this");
	  
  }

  render() {
    return (
      <div>
        {this.renderTaskCard(this.state.tasks.length)}
      </div>
	  
    );
  }
}

export default App;
