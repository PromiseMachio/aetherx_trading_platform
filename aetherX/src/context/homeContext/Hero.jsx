import React from 'react'
import { ChartLine, Circle, ArrowRightFromLineIcon, } from "lucide-react";
import { HERO_CONTENT, TICKER_ITEMS, DESCP_CARDS } from '../../data/constant';
import { div } from 'three/tsl';


const Hero = () => {
  const slidePairs = () => {

  }

  return (
    <section className='relative  min-h-[90]  w-full bg-cover bg-center bg-no-repeat overflow-hidden ' style={{ backgroundImage: `url(${HERO_CONTENT.background})` }} >
      <div className='relative z-10 max-w-7xl  px-2 py-2 lg:py-10 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center pl-3 gap-0 lg:gap-90'>
          {/* left content  */} 
          <div className='text-left ml-10  pl-0'>
            <div className=' inline-flex gap-2.4 mt-10 lg:mt-5 mb-4 p-1.5 bg-linear-to-r from-blue-200 via-blue-300 to-blue-500 border border-to-blue-50 rounded-2xl  '>
              <Circle className=' left w-2 h-2 fill-blue-500  mt-1.5 mr-1 animate-pulse' />
              <span className='text-gray  text-sm font-semibold text-cyan-700'>
                {HERO_CONTENT.intro}
              </span>
            </div>
            <div className='leading-relaxed text-left '>
              <p className='text-white text-5xl  lg:text-6xl   font-extrabold'>{HERO_CONTENT.tagline[0]}</p>
              <span className="fashion_font  bg-gradient-to-tr from-blue-700 via-blue-400 to-red-400 bg-clip-text text-transparent text-4xl lg:text-6xl  ">{HERO_CONTENT.tagline[1]}</span>
              <p className='text-white text-4xl  lg:text-6xl font-extrabold'>{HERO_CONTENT.tagline[2]}</p>
            </div>


            <p className='text-sm lg:text-lg text-white/40 leading-relaxed mt-2 flex flex-row-2 sm:flex-row-3'>
              {HERO_CONTENT.description}
            </p>
            <div className='block lg:inline-flex gap-3 lg:gap-3 mt-5 '>
              <button
                className=' border border-spacing-1.5 rounded-2xl  bg-linear-to-r from-blue-600 via-blue-300 to-purple-300 w-full lg:w-auto py-2 px-4 text-sm rounded-2xl text-white/50 font-medium hover:text-gray-700 transition-all duration-300'
              >Start Trading Free
              </button>
              <button
                className=' mt-2 lg:mt-0 border border-spacing-1.5 w-full lg:w-auto border-white/30  text-white/60 py-2 px-4 rounded-2xl hover:text-white/80 hover:border-white/50'
              >Explore Market</button>
            </div>
            <div className='mt-5 '>
              {HERO_CONTENT.icon.map((link) => (
                <div className='inline-flex gap-6'>
                  <p className='text-xs text-white/30 p-3'>{link.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right content  */}
          <div>

          </div>
        </div>
        {/* pairs scroll display  */}
        <div className=' grid md:grid-cols-1  items-center justify-center p-0'>
          <div className="mt-5 w-full  overflow-hidden p-4">
            {/* 1. Outer Gradient Wrapper for the Glass Border */}
            <div className="relative rounded-lg border-r border-l border-transparent p-[1px] bg-gradient-to-r from-white/20 via-white/5 to-white/20 backdrop-blur-md">

              {/* 2. Inner Frosted Glass Track Box */}
              <div className="flex overflow-hidden rounded-full bg-slate-900/40 py-3 px-6 shadow-xl backdrop-blur-xl">

                {/* 3. The Animation Slider (Duplicate mapped arrays keep the loop infinite) */}
                <div className="flex animate-marquee whitespace-nowrap gap-[60px] min-w-full hover:[animation-play-state:paused]">

                  {/* Track Loop 1 */}
                  {TICKER_ITEMS.map((link, index) => (
                    <div key={`track1-${index}`} className="inline-flex items-center gap-[15px] font-mono text-sm tracking-wide">
                      <p className="text-slate-300 font-bold">{link.pair}</p>
                      <p className="text-white font-medium">{link.price}</p>
                      <p className={`flex items-center gap-1 font-semibold ${link.up ? 'text-emerald-400' : 'text-rose-500'}`}>
                        {link.up ? '▲' : '▼'} {link.pct}
                      </p>
                    </div>
                  ))}

                  {/* Track Loop 2 (Identical mirror prevents blank gaps on screen) */}
                  {TICKER_ITEMS.map((link, index) => (
                    <div key={`track2-${index}`} className="inline-flex items-center gap-[15px] font-mono text-sm tracking-wide">
                      <p className="text-slate-300 font-bold">{link.pair}</p>
                      <p className="text-white font-medium">{link.price}</p>
                      <p className={`flex items-center gap-1 font-semibold ${link.up ? 'text-emerald-400' : 'text-rose-500'}`}>
                        {link.up ? '▲' : '▼'} {link.pct}
                      </p>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* cards with project descriptions  */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5 w-full px-4 justify-center">
              {DESCP_CARDS?.map((card, idx) => {
                // Dynamically map colors to background glows, borders, and text accents
                const bgGlow = `hover:bg-${card.color}-500/10 bg-${card.color}-500/5`;
                const borderColor = `border-${card.color}-500/20 hover:border-${card.color}-500/40`;
                const textColor = `text-${card.color}-400`;

                return (
                  <div
                    key={`card-${idx}`}
                    className={`p-6 bg-slate-900/40 backdrop-blur-md border rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:-translate-y-1 ${bgGlow} ${borderColor}`}
                  >
                    <p className={`text-4xl font-extrabold tracking-tight ${card.color}`}>
                      {card.value}
                    </p>
                    <p className="text-sm font-semibold text-slate-200 mt-2 tracking-wide uppercase">
                      {card.label}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>


      </div>

    </section>
  )
}

export default Hero