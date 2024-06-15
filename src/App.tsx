import { useRef, useState } from 'react'
import './App.css'
import Badge from './Badge'
import MainForm from './MainForm'
import { BadgeData } from './types/interfaces'
import BadgePrint from './BadgePrint'
import Header from './Header'
import LoginForm from './LoginForm'

function App() {
  const [size, setSize] = useState(25)
  const [badgeData, setBadgeData] = useState<BadgeData>()

  const loginDialogRef = useRef<HTMLDialogElement>(null)

  const handleSizeChange = function(e: number) {
    setSize(e)
  }

  const handleBadgeData = function(b: BadgeData) {
    setBadgeData(b);
  }

  function closeLoginDialog() {
    loginDialogRef.current && loginDialogRef.current?.close()
  }
  
  function openLoginDialog() {
    loginDialogRef.current?.showModal()
  }

  return (
    <>
      <div className="screen-container">
        <Header openLoginDialog={openLoginDialog}/>
        <Badge onBadgeChange={(b) => handleBadgeData(b)}/>
        <MainForm onSizeChange={(e: number) => handleSizeChange(e)} />
      </div>
      <div className={`print-container size-${size}`}>
        <BadgePrint badgeData={badgeData} size={size} />
      </div>
      <LoginForm closeDialog={closeLoginDialog} dialogRef={loginDialogRef}/>
    </>
  )
}

export default App
