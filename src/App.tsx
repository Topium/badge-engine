import { useState } from 'react'
import './App.css'
import Badge from './Badge'
import MainForm from './MainForm'
import { BadgeData } from './interfaces'
import BadgePrint from './BadgePrint'
import Header from './Header'

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
        <Header />
        <Badge onBadgeChange={(b) => handleBadgeData(b)}/>
        <MainForm onSizeChange={(e: number) => handleSizeChange(e)} />
      </div>
      <div className={`print-container size-${size}`}>
        <BadgePrint badgeData={badgeData} size={size} />
      </div>
    </>
  )
}

export default App
