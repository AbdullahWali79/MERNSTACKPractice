import { useState, useEffect } from 'react'
import './App.css'

function Counter() {
  const [count, setCount] = useState(0)
  const [animation, setAnimation] = useState('')

  const incrementCounter = () => {
    setAnimation('slide-up')
    setCount(prev => prev + 1)
  }

  const decrementCounter = () => {
    setAnimation('slide-down')
    setCount(prev => prev - 1)
  }

  const resetCounter = () => {
    setCount(0)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation('')
    }, 300)
    return () => clearTimeout(timer)
  }, [count])

  return (
    <div className="counter-container">
      <div className="counter-value">
        <div className={`counter-number ${animation}`}>{count}</div>
      </div>
      <div className="counter-buttons">
        <button className="counter-button" onClick={decrementCounter}>
          <i className="fas fa-minus"></i>
        </button>
        <button className="counter-button" onClick={resetCounter}>
          <i className="fas fa-redo"></i>
        </button>
        <button className="counter-button" onClick={incrementCounter}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <div className="counter-wrapper">
        <h1 className="counter-heading">Counter App in ReactJS</h1>
        <Counter />
      </div>
    </div>
  )
}

export default App
