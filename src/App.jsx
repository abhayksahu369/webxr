import { useState } from 'react'
import './App.css'
import ModelContainer from './Modelcomponents/WaterPump/ModelContainer'
import { BrowserRouter, Routes,Route } from 'react-router-dom'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ModelContainer/>}/>
    </Routes>
    </BrowserRouter>
    
     
    </>
  )
}

export default App
