import React from 'react'
import { MoveRight } from 'lucide-react'
import { CRYPTO_ASSETS, TRADE } from '../../data/tradeContent'
import { div } from 'three/tsl'

const Trade = () => {
  return (
    <section className='relative  min-h-[90]  w-full bg-cover bg-center bg-no-repeat overflow-hidden '>
        <div className='max-w-7xl items-center '>
            <div className=' text-left'>
                <p className='text-emerald-400 uppercase font-light'>{TRADE.intro}</p>
                <div className='flex justify-between gap-30 p-2'>
                    <p className='text-white/80 text-5xl font-extrabold uppercase'>{TRADE.secIntro}</p>
                    <div className='inline-flex gap-3 hover:scale-110'>
                    <span className='text-white/25 mt-5 hover:text-white/35 cursor-pointer' >View All Market  </span>
                        <MoveRight className='mt-5 text-white/25 hover:text-white/35 ' />
                    </div>
                </div>
                <div>
                    {CRYPTO_ASSETS.map((link, index)=>{
                        return(
                            <div>
                                
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>

    </section>
  )
}

export default Trade