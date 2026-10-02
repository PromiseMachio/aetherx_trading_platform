import React from 'react'
import { ABOUT, DESC_ABOUT, MISSION, VISION } from '../../data/AboutConstants'
import { div } from 'three/tsl'

const About = () => {
  return (
    <section className='relative  min-h-[90]  w-full bg-cover bg-center bg-no-repeat overflow-hidden'>
      <div className='relative max-w-7xl items-center sm:px-6 lg:py-5'>
        <div className='text-center'>
          <p className='text-emerald-400 uppercase font-light'>{ABOUT.why}</p>
          <p className='text-white/80 text-5xl font-extrabold'>{ABOUT.intro}</p>
          <p className='text-white/35 leading-relaxed p-4'>{ABOUT.tagline}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full px-4">
            {DESC_ABOUT.map((card, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
              >
                <div className="mb-5 border border-white/10 bg-slate-900 w-fit p-2 rounded-2xl ">
                  {/* Icon */}
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold text-white">
                  {card.label}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-10 border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-3xl p-8">

          {/* Image */}
          <div className="w-full">
            <img
              src={VISION.image}
              alt={VISION.title}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="text-cyan-400 uppercase text-sm font-semibold tracking-widest">
              Our Vision
            </p>

            <h2 className="text-4xl font-bold text-white mt-3 leading-tight">
              {VISION.title}
            </h2>

            <p className="mt-6 text-white/60 leading-8 text-lg">
              {VISION.description}
            </p>

            <button className="mt-8 w-fit px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition">
              Learn More
            </button>
          </div>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-10 border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-3xl p-8">

          {/* Image */}


          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="text-cyan-400 uppercase text-sm font-semibold tracking-widest">
              Our Mission
            </p>

            <h2 className="text-4xl font-bold text-white mt-3 leading-tight">
              {MISSION.title}
            </h2>

            <p className="mt-6 text-white/60 leading-8 text-lg">
              {MISSION.description}
            </p>

            <button className="mt-8 w-fit px-6 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition">
              Learn More
            </button>
          </div>
          <div className="w-full">
            <img
              src={MISSION.image}
              alt={MISSION.title}
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          </div>
        </div>


      </div>

    </section>

  )
}

export default About