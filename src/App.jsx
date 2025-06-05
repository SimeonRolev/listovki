import { useState } from 'react'
import './App.css'
import Crossroads from './components/Crossroads'
import Task from './models/Task'

function App() {
  const [task, setTask] = useState(new Task())

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
    </div>
  )
}

export default App
