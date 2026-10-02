import React from 'react'
import Hero from '../context/homeContext/Hero'
import Navbar from '../components/layouts/Navbar'
import About from '../context/homeContext/About'
import Trade from '../context/homeContext/Trade'

const Home = () => {
  return (
    <div>
        <Navbar />
        <main className='mb-1'>
            <Hero />
            <About />
            <Trade />
        </main>
    </div>
  )
}

export default Home