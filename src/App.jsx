import { useState, useEffect } from 'react'
import './App.css'
import Crossroads from './components/Crossroads'
import Task from './models/Task'

function App() {
  const [task, setTask] = useState(null)

  useEffect(() => {
    // Create and generate a random task on component mount
    const newTask = new Task()
    newTask.generateRandomTask()
    setTask(newTask)
  }, [])

  const generateNewTask = () => {
    const newTask = new Task()
    newTask.generateRandomTask()
    setTask(newTask)
  }

  if (!task) {
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Traffic Intersection Simulator</h1>
        <button onClick={generateNewTask} className="new-task-btn">
          Generate New Task
        </button>
      </header>
      
      <main className="app-main">
        <Crossroads task={task} />
      </main>
    </div>
  )
}

export default App
