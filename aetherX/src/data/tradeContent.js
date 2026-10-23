import { Value } from "three/examples/jsm/inspector/ui/Values.js";

export const TRADE ={
    intro: 'Live Markets',
    secIntro: 'Trade with confidence'
}
export const CRYPTO_ASSETS = [
  { symbol: "BTC", name: "Bitcoin",    price: 67_234.50, change:  2.34, volume: "42.8B", spark: [60100,62400,61800,63900,63200,65700,67234] },
  { symbol: "ETH", name: "Ethereum",   price:  3_842.18, change:  1.87, volume: "18.4B", spark: [3610,3650,3580,3720,3790,3820,3842] },
  { symbol: "AXR", name: "AetherX",   price:      4.82, change: 12.40, volume: "284.7M", spark: [3.2,3.5,3.8,4.1,4.3,4.6,4.82] },
  { symbol: "SOL", name: "Solana",     price:    187.43, change: -0.92, volume: "6.2B",  spark: [192,190,188,191,189,188,187] },
  { symbol: "AVAX", name: "Avalanche", price:     38.74, change:  3.21, volume: "1.8B",  spark: [35,36,37,36.5,37.5,38,38.74] },
  { symbol: "DOT", name: "Polkadot",  price:      8.92, change: -1.43, volume: "524M",  spark: [9.3,9.1,9.0,9.1,8.9,8.95,8.92] },
];

export const PORTFOLIO_CARDS =[
  {name:'Account equity', Value:1000.00, demo:'Demo starting equity $14,900'},
  {name:'Unrealized P&L', Value:-19, demo:'Before fee and slippage'},
  {name:'Account equity', Value:300.00, demo:'Illustrative notional value'}

]
export const OPEN_POSITIONS =[
  {Assets:'BTC/USD', Side:'LONG', Entry:'2000', Mark: '67,233.50', size:'0.08 BTC', 'Unrealized P&L':5.54}
]