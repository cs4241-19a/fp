import React from 'react';

import TaskCard from './TaskCard';

import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {},
        {},
        {},
        {},
      ]
    }
  }

  renderTaskCard(z_index){
    const task_index = z_index%4;
    return (
      <TaskCard 
        data={this.state.tasks[task_index]}
        card_z={z_index} />
    )
  }
  render() {
    return (
      <div>
        {this.renderTaskCard(1)}
        {this.renderTaskCard(2)}
        {this.renderTaskCard(3)}
        {this.renderTaskCard(4)}
      </div>
    );
  }
}

export default App;
