import React from 'react';

import TaskCard from './TaskCard';

import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      task_head : 0,
      tasks: [
        {title: "hi", z: 3, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false},
        {title: "hola", z: 2, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false},
        {title: "ohio", z: 1, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false},
        {title: "yo", z: 0, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: false},
        {title: "yooooooo", z: -1, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333", hidden: true},
      ],
    }
  }

  handleClick(){
    // Testing, we are just going to shuffle the front to the back
    let tasks = this.state.tasks.slice();
    let task_head = this.state.task_head;
    task_head += 1;
    task_head %= 4;
    tasks.forEach(task => {
      task.z += 1;
      task.z %= 4;
    });
    this.setState({tasks: tasks, task_index: task_head});
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

  /**
   * Do different things based on the button that has been clicked
   * @param {Int} button_code 0 done 1 Do Later(not implemented) 2 More Time 3 Edit 4 Delete
   * @param {Object} data additional data to be used
   */
  handleButton(button_code, data=null){
    switch(button_code){
      case 0:
        this.removeTopTask();
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
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

  render() {
    return (
      <div>
        {this.renderTaskCard(this.state.tasks.length)}
      </div>
    );
  }
}

export default App;
