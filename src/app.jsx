import { useState } from 'preact/hooks'
import './app.css'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <h1>Hello</h1>
   <Routes>
    <Route path="/" element={<Home/>}/>
    {/* <Route path="/" element={<Home/>}/> */}
   </Routes>
    </>
  )
}
