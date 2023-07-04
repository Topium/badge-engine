import { useState } from 'react'
import './App.css'
import Badge from './Badge'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Pinssikone</h1>
      <Badge />
    </>
  )
}

export default App
