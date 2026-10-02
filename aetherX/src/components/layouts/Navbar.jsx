import React from 'react'
import { CandlestickChart } from "lucide-react";
import { NAV_LINK } from '../../data/constant';

const Navbar = () => {
  return (
    <nav className='fixed top-0 
     right-0 left-0 z-100 py-1 bg-black border border-b-white/20 hover:border-b-white/35'>
        <div className='max-w-330 mx-auto px-5'>
            <div className='flex items-center justify-between'>
                {/* logo */}
                <div className='text-3xl text-white'>
                    <button className='flex items-center gap-2 font-bold'>
                        <span className='border border-primary p-1 rounded-lg bg-linear-to-tr from-blue-700 via-blue-400 to-red-400 ' >
                            <CandlestickChart className='w-6 h-6 text-blue-800'/>
                        </span>
                        Aether<span className='text-4xl font-extrabold text-blue-800'>X</span> 
                    </button>
                </div>

                {/* navlinks */}
                <nav className='hidden md:flex items-center gap-4 text-white/60'>
                {NAV_LINK.map((link)=>(
                    <button
                    key={link.id}
                    className='text-base font-light text-white/60 cursor-pointer hover:text-white/80'
                    >
                        {link.label}
                    </button>
                ))}

                </nav>

                {/* button  */}
                <div className='hidden md:flex items-center gap-1'>
                    <button className='border-2 border-primary/20 py-1 px-5 rounded-2xl font-medium  text-secondary hover:bg-sky-200 hover:text-black hover:border-black/50' >Sign in</button>
                    <button  className='bg-linear-to-tr from-blue-700 via-blue-400 to-red-400 font-medium border-white/10 py-1 px-5 rounded-2xl  text-secondary hover:scale-110'>Get started</button>
                </div>

            </div>

        </div>

    </nav>
  )
}

export default Navbar