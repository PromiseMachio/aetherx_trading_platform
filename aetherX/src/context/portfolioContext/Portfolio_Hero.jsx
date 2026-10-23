import { memo } from 'react';
import { RefreshCcwDotIcon } from 'lucide-react';
import { OPEN_POSITIONS, PORTFOLIO_CARDS } from '../../data/tradeContent';
import { div } from 'three/tsl';
const PortfolioHero = () => {
    return (
        <section className='relative  min-h-[90vh] overflow-hidden portfolio-bg '>
            <div className='max-w-7xl w-full sm:py-6 lg:px-8'>
                <div className='flex items-center justify-between gap-12 mt-15 lg:mt-10'>
                    <div className='text-left'>
                        <p className='text-sm font-bold text-cyan-500 uppercase'>Capital Management/ </p>
                        <p className='text-sm font-bold text-cyan-500 uppercase'>portfolio</p>

                        <p className='text-4xl text-white font-bold tracking-tight space-y-2 mt-2'>Portfolio overview</p>

                    </div>
                    <div className='flex items-center justify-between gap-1.5'>
                        <button className='lg:inline-flex items-center gap-1 rounded-lg px-2 py-1.5 border border-white/40 text-white bg-transparent font-medium transition-all duration-300 hover:border-white/75  hover:text-white/40'><RefreshCcwDotIcon className='text-white w-5 h-5 hover:animate-spin' />Refresh</button>
                        <button className='border border-black rounded-lg px-2 py-1.5 bg-cyan-500 text-black font-medium transition-all duration-300 hover:text-white hover:border-white/35 hover:bg-cyan-400 '>Export Data</button>
                    </div>
                </div>
                <div className='grid grid-cols-1 items-center justify-center mt-10'>
                    <div>
                        <p className='text-sm text-cyan-500 font-bold uppercase'>capital overview</p>
                        <p className='text-4xl text-white font-bold tracking-tight space-y-2 mt-2'>Portfolio</p>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <p className='text-white/50 font-light tracking-normal leading-relaxed '>Example position and allocations. Connect your own accout aonly through a secure backend.</p>
                        <button className='text-sm text-white font-semibold border border-white/35 rounded-lg px-2 py-1.5 bg-white/5 transition-all duration-300 hover:border-white/40 hover:bg-white/10 '>Portfolio notes</button>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5 w-full px-4 justify-center'>
                        {PORTFOLIO_CARDS.map((card, idx) => (
                            <div key={idx} className='border border-white/35 bg-white/5 rounded-lg py-4 px-4'>
                                <p className='text-white/30 font-light text-xs mb-1'>{card.name}</p>
                                <div className='inline-flex items-center gap-1'>
                                    <p className={`text-2xl font-bold ${card.Value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {card.Value < 0 ? '-' : ''}${Math.abs(card.Value).toLocaleString()}
                                    </p>

                                </div>
                                <p className='text-xs font-light text-white/35 tracking-normal mt-3'>{card.demo}</p>
                            </div>
                        ))}
                    </div>

                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 mt-5'>
                    <div className='border border-white/15 bg-white/5 rounded-lg py-2 px-2'>
                        <div className='text-left'>
                            <p className='text-white font-bold tracking-tight mt-3 space-y-1.5'>Open position</p>
                            <p className='text-xs text-white/35 '>Your positions</p>
                        </div>
                        {OPEN_POSITIONS.map((link, idx) => (
                            <div className='px-2 py-1.5'>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead className='p-2'>
                                        <tr className='border-b border-white/15'>
                                            <th className='text-white/35 text-xs uppercase'>Asset</th>
                                            <th className='text-white/35 text-xs uppercase'>Side</th>
                                            <th className='text-white/35 text-xs uppercase'>Entry</th>
                                            <th className='text-white/35 text-xs uppercase'>Mark</th>
                                            <th className='text-white/35 text-xs uppercase'>Size</th>
                                            <th className='text-white/35 text-xs uppercase'>Unrealized P&L</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <td className='text-white text-xs  font-light '>{link.Assets}</td>
                                        <td className={`text-xs font-light ${link.Side === 'LONG' ? 'text-green-600' : 'text-red-600'}`}>
                                            {link.Side}
                                        </td>
                                        <td className='text-white text-xs  font-light '>{link.Entry}</td>
                                        <td className='text-white text-xs  font-light '>{link.Mark}</td>
                                        <td className='text-white text-xs  font-light '>{link.size}</td>
                                        <td className={`text-white text-xs  font-light ${link['Unrealized P&L']>0
                                            ?'text-green-400'
                                            :'text-red-600'
                                        }`}>{link['Unrealized P&L']}</td>

                                    </tbody>


                                </table>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    );
};

export default memo(PortfolioHero);