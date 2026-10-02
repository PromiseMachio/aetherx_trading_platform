import React from 'react'
import Home from './pages/Home'
import Navbar from './components/layouts/Navbar'

const App = () => {
  return (
    <div className='pb-[1000vh]'>
        <Navbar />
        <main>
           <Home /> 
        </main>
      
    </div>
  )
}

export default App
