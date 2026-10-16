import { color } from 'three/tsl';
import profileChat from '../assets/images/HeroImage1.jpg'
import profileImg from '../assets/images/heroImage2.jpg'
import backgroundImg from '../assets/images/heroImg.png'

export const NAV_LINK=[
    {id:'dashboard',label:'Dashboard'},
    {id:'trade',label:'Trade'},
    {id:'portfolio',label:'Portfolio'},
    {id:'market_signals',label:'Market signals'}

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


/*
 * tickerChartData.js
 * All values below are MOCK DATA for UI development.
 */

// Line chart: recent price movement for each ticker
export const PRICE_HISTORY = {
  "BTC/USDT": [
    { time: "09:00", price: 66120 },
    { time: "10:00", price: 66480 },
    { time: "11:00", price: 66290 },
    { time: "12:00", price: 66820 },
    { time: "13:00", price: 66550 },
    { time: "14:00", price: 67100 },
    { time: "15:00", price: 67234.50 },
  ],

  "ETH/USDT": [
    { time: "09:00", price: 3760 },
    { time: "10:00", price: 3795 },
    { time: "11:00", price: 3780 },
    { time: "12:00", price: 3810 },
    { time: "13:00", price: 3802 },
    { time: "14:00", price: 3830 },
    { time: "15:00", price: 3842.18 },
  ],

  "SOL/USDT": [
    { time: "09:00", price: 190.20 },
    { time: "10:00", price: 189.10 },
    { time: "11:00", price: 191.00 },
    { time: "12:00", price: 188.60 },
    { time: "13:00", price: 187.90 },
    { time: "14:00", price: 186.80 },
    { time: "15:00", price: 187.43 },
  ],
};

// Pie chart: hypothetical signal distribution for each ticker
export const SIGNAL_DISTRIBUTION = {
  "BTC/USDT": [
    { name: "Bullish", value: 60, color: "#22c55e" },
    { name: "Bearish", value: 25, color: "#ef4444" },
    { name: "Neutral", value: 15, color: "#64748b" },
  ],

  "ETH/USDT": [
    { name: "Bullish", value: 50, color: "#22c55e" },
    { name: "Bearish", value: 30, color: "#ef4444" },
    { name: "Neutral", value: 20, color: "#64748b" },
  ],

  "SOL/USDT": [
    { name: "Bullish", value: 25, color: "#22c55e" },
    { name: "Bearish", value: 55, color: "#ef4444" },
    { name: "Neutral", value: 20, color: "#64748b" },
  ],
};

export const TICKER_ITEMS = [
  {
    pair: "BTC/USDT",
    price: "$67,234.50",
    up: true,
    pct: "2.34%",
  },
  {
    pair: "ETH/USDT",
    price: "$3,842.18",
    up: true,
    pct: "1.87%",
  },
  {
    pair: "AXR/USDT",
    price: "$4.82",
    up: true,
    pct: "12.40%",
  },
  {
    pair: "SOL/USDT",
    price: "$187.43",
    up: false,
    pct: "0.92%",
  },
  {
    pair: "AVAX/USDT",
    price: "$38.74",
    up: true,
    pct: "3.21%",
  },
  {
    pair: "DOT/USDT",
    price: "$8.92",
    up: false,
    pct: "1.43%",
  },
  {
    pair: "MATIC/USDT",
    price: "$0.892",
    up: true,
    pct: "0.76%",
  },
  {
    pair: "LINK/USDT",
    price: "$14.37",
    up: true,
    pct: "4.12%",
  },
];

export const DESCP_CARDS = [
  {
    value: "$2.4B",
    label: "Daily Volume",
    color: "text-sky-400/20 border-sky-500/30",
  },
  {
    value: "+2M",
    label: "Traders",
    color: "text-pink-400/20 border-pink-500/30",
  },
  {
    value: "+180",
    label: "Countries",
    color: "text-sky-400/20 border-sky-500/30",
  },
  {
    value: "99.98%",
    label: "Uptime SLA",
    color: "text-blue-500/20 border-blue-600/30",
  },
];
