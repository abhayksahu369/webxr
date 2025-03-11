import { useState } from 'react'
import './App.css'
import CubeContainer from './CubeContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CubeContainer/>
    </>
  )
}

export default App
