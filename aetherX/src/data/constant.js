import { color } from 'three/tsl';
import profileChat from '../assets/images/HeroImage1.jpg'
import profileImg from '../assets/images/heroImage2.jpg'
import backgroundImg from '../assets/images/heroImg.png'

export const NAV_LINK=[
    {id:'market',label:'Market'},
    {id:'trade',label:'Trade'},
    {id:'earn',label:'Earn'},
    {id:'learn',label:'Institutional'},
    {id:'news',label:'News'}

]

export const HERO_CONTENT={
    name:'AetherX',
    image1: profileChat,
    imge2: profileImg,
    background: backgroundImg,
    intro:'Live on Mainnet - $2.4B Total Volume',
    tagline:['Navigate', 'the Future', 'of Digital Finance.'],
    description:[
        'AetherX delivers institutional-grade crypto infrastructure to everyone.',
         'Trade, earn, and build on the most advanced digital asset platform ever created.'],
    icon:[
        {label:'🌍 180+ Countries'},
        {label:'👥 2M+ Traders'},
        {label:'🔒 SOC 2 Certified'}
    ]
}

export const TICKER_ITEMS = [
  { pair: "BTC/USDT",  price: "$67,234.50", up: true,  pct: "2.34%" },
  { pair: "ETH/USDT",  price: "$3,842.18",  up: true,  pct: "1.87%" },
  { pair: "AXR/USDT",  price: "$4.82",      up: true,  pct: "12.40%" },
  { pair: "SOL/USDT",  price: "$187.43",    up: false, pct: "0.92%" },
  { pair: "AVAX/USDT", price: "$38.74",     up: true,  pct: "3.21%" },
  { pair: "DOT/USDT",  price: "$8.92",      up: false, pct: "1.43%" },
  { pair: "MATIC/USDT",price: "$0.892",     up: true,  pct: "0.76%" },
  { pair: "LINK/USDT", price: "$14.37",     up: true,  pct: "4.12%" },
];

export const DESCP_CARDS = [
    { value: '$2.4B', label: 'Daily Volume', color: 'text-sky-400/20 border-sky-500/30' },
    { value: '+2M', label: 'Traders', color: 'text-pink-400/20 border-pink-500/30' },
    { value: '+180', label: 'Countries', color: 'text-sky-400/20 border-sky-500/30' },
    { value: '99.98%', label: 'Uptime SLA', color: 'text-blue-500/20 border-blue-600/30' }
];

