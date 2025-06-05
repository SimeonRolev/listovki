import React, { useState } from 'react'
import './App.css'
import Crossroads from './components/Crossroads'
import Task from './models/Task'
import TestPriorityOrder from './components/TestPriorityOrder'
import Solution from './components/Solution'

function App() {
  const [task, setTask] = useState(new Task())
  const [showSolution, setShowSolution] = React.useState(false);
  const onTestSuccess = () => {
    generateNewTask();
  };

  const generateNewTask = () => {
    setTask(new Task())
  }

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      <button onClick={generateNewTask} className="new-task-btn">
        Пак - <span role="img" aria-label="pear">🍐</span>
      </button>
      <Crossroads task={task} />
      <div className='test-option'>
        {<input
          type="checkbox"
          checked={showSolution}
          onChange={() => setShowSolution(!showSolution)}
          className="solution-checkbox"
        />}
        <label className="solution-label">Покажи решението</label>
        <br />
      </div>

      {showSolution && (
        <Solution
          task={task}
        />
      )}
      {!showSolution && (
        <TestPriorityOrder
          key={task.createdAt}
          task={task}
          onSuccess={onTestSuccess}
        />
        // <Test task={task} />
      )}
    </div>
  )
}

export default App
