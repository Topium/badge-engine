import { useState } from 'react'
import './App.css'
import Badge from './Badge'
import MainForm from './MainForm'
import { BadgeData } from './interfaces'
import BadgePrint from './BadgePrint'

function App() {
  const [size, setSize] = useState(25)
  const [badgeData, setBadgeData] = useState<BadgeData>()

  const handleSizeChange = function(e: number) {
    setSize(e)
  }

  const handleBadgeData = function(b: BadgeData) {
    setBadgeData(b);
  }

  return (
    <>
      <h1>Pinssikone</h1>
      <MainForm onSizeChange={(e: number) => handleSizeChange(e)} />
      <Badge onBadgeChange={(b) => handleBadgeData(b)}/>
      <BadgePrint badgeData={badgeData} size={size} />
    </>
  )
}

export default App
