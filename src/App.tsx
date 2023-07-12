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
      <div className="screen-container">
        <h1>Tursakkeen Pinssikone</h1>
        <MainForm onSizeChange={(e: number) => handleSizeChange(e)} />
        <Badge onBadgeChange={(b) => handleBadgeData(b)}/>
      </div>
      <div className={`print-container size-${size}`}>
        <BadgePrint badgeData={badgeData} size={size} />
      </div>
    </>
  )
}

export default App
