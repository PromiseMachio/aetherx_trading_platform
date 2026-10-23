import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/layouts/Navbar'
import Portfolio from './pages/Portfolio'

const App = () => {
  return (
    <div className='pb-[10vh]'>
        <Navbar />
        <main>
          <Routes>
           <Route path='/' element={<Home /> }/>
           <Route path='portfolio' element={<Portfolio />}/>
          </Routes>
           
        </main>
      
    </div>
  )
}

export default App
