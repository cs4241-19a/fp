import React from 'react';

import TaskCard from './TaskCard';

import './App.css';

function App() {
  return (
    <div>
      <TaskCard card_z={1} />
      <TaskCard card_z={2} />
      <TaskCard card_z={3} />
      <TaskCard card_z={4} />
    </div>
  );
}

export default App;
