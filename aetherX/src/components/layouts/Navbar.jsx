import React, { useState } from 'react';
import { CandlestickChart, Menu, X } from "lucide-react";
import { NAV_LINK } from '../../data/constant';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>


             <nav className='hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10 hover:border-white/20 transition-colors duration-300'>
                <div className='max-w-330 mx-auto px-5'>
                    <div className='flex items-center justify-between'>

                        {/* logo */}
                        <div className='text-3xl text-white'>
                            <button className='flex items-center gap-2 font-bold'>
                                <span className='border border-primary p-1 rounded-lg bg-linear-to-tr from-blue-700 via-blue-400 to-red-400 ' >
                                    <CandlestickChart className='w-6 h-6 text-blue-800' />
                                </span>
                                Aether<span className='text-4xl font-extrabold text-blue-800'>X</span>
                            </button>
                        </div>

                        {/* navlinks */}
                        <nav className='hidden md:flex items-center gap-4 text-white/60'>
                            {NAV_LINK.map((link) => (
                                <button
                                    key={link.id}
                                    className='text-base font-light border-b border-transparent text-white/60 cursor-pointer transition-all duration-300 hover:text-white/80 hover:border-white/20'
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>

                        {/* button */}
                        <div className='hidden md:flex items-center gap-1'>
                            <button className='border-2 border-primary/20 py-1 px-5 rounded-2xl font-medium text-secondary hover:bg-sky-200 hover:text-black hover:border-black/50' >
                                Sign in
                            </button>
                            <button className='bg-linear-to-tr from-blue-700 via-blue-400 to-red-400 font-medium border-white/10 py-1 px-5 rounded-2xl text-secondary hover:scale-110'>
                                Get started
                            </button>
                        </div>

                    </div>
                </div>
            </nav>




            {/* Toggle Button */}
            <button
                className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-md focus:outline-none hover:bg-slate-700 transition-colors'
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isOpen ? (
                    <X className='w-6 h-6' />
                ) : (
                    <Menu className='w-6 h-6' />
                )}
            </button>

            {/* Sidebar Element */}
            <aside className={`lg:hidden fixed top-0 left-0 z-40 h-screen w-64 bg-black border-r border-white/20 p-6 pt-20 flex flex-col justify-between transition-transform duration-300 ease-in-out 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                {/* Top Section: Logo & Nav Links */}
                <div className='flex flex-col gap-10'>

                    {/* Logo */}
                    <div className='text-3xl text-white'>
                        <button className='flex items-center gap-2 font-bold w-full text-left'>
                            <span className='border border-primary p-1 rounded-lg bg-linear-to-tr from-blue-700 via-blue-400 to-red-400'>
                                <CandlestickChart className='w-6 h-6 text-blue-800' />
                            </span>
                            <span>
                                Aether<span className='text-4xl font-extrabold text-blue-800'>X</span>
                            </span>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className='flex flex-col gap-4'>
                        {NAV_LINK.map((link) => (
                            <button
                                key={link.id}
                                className='text-base font-light text-left w-full py-2 px-3 rounded-lg text-white/60 cursor-pointer transition-all duration-300 hover:text-white/90 hover:bg-white/5'
                                onClick={() => setIsOpen(false)} // Closes sidebar on selection (Mobile-friendly)
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Bottom Section: Action Buttons */}
                <div className='flex flex-col gap-3 w-full'>
                    <button className='w-full border-2 border-primary/20 py-2 px-5 rounded-2xl font-medium text-secondary hover:bg-sky-200 hover:text-black hover:border-black/50 transition-all'>
                        Sign in
                    </button>
                    <button className='w-full bg-linear-to-tr from-blue-700 via-blue-400 to-red-400 font-medium border-white/10 py-2 px-5 rounded-2xl text-secondary hover:scale-105 transition-all'>
                        Get started
                    </button>
                </div>

            </aside>

            {/* Optional Mobile Overlay background shadow */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};

export default Navbar;