import React from 'react';

import TaskCard from './TaskCard';

import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {title: "hi", z: 3, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333"},
        {title: "hola", z: 2, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333"},
        {title: "ohio", z: 1, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333"},
        {title: "yo", z: 0, description: "Take your time back.", priority_text: "Medium", date: "11-22-3333"},
      ],
    }
  }

  handleClick(){
    // Testing, we are just going to shuffle the front to the back
    let tasks = this.state.tasks.slice();
    tasks.forEach(task => {
      task.z += 1;
      task.z %= 4;
    });
    this.setState({tasks: tasks});
  }

  /**
   * Do different things based on the button that has been clicked
   * @param {Int} button_code 0 done 1 Do Later 2 More Time 3 Edit 4 Delete
   */
  handleButton(button_code){
    switch(button_code){
      case 0:
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

  renderTaskCard(task_index){
    return (
      <TaskCard 
        data={this.state.tasks[task_index]}
        buttonCallback={() => {this.handleClick()}} />
    )
  }

  render() {
    return (
      <div>
        {this.renderTaskCard(0)}
        {this.renderTaskCard(1)}
        {this.renderTaskCard(2)}
        {this.renderTaskCard(3)}
      </div>
    );
  }
}

export default App;
