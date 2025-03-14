import { useState } from 'react'
import './App.css'
import XrHitModelContainer from './XrHitModelContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <XrHitModelContainer/>
    </>
  )
}

export default App
