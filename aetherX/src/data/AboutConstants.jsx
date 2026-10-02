import vision from '../assets/images/vision.jpg'
import mission from '../assets/images/mission.jpg'
import {
  ShieldCheck,
  Wallet,
  Globe,
  ChartLine
} from "lucide-react";

export const ABOUT ={
    why:'Why AetherX',
    intro:'Built for the next generation',
    tagline: 'Every feature is designed for traders who demand more — more speed, more security, more access.'
}

export const DESC_ABOUT =[
    {icon:<Wallet className="w-8 h-8 text-green-300"/>,
     label:'Instant Settlement',
     description:'Trades settle in under 400ms. No waiting, no delays — real-time finality on every single position.'},
    {
        icon:<ShieldCheck className=" w-8 h-8 text-red-300"/>,
        label:'Military-Grade Security',
        description:'256-bit encryption, multi-sig cold storage, and SOC 2 Type II certified infrastructure protecting every asset you hold.'
    },
    {
        icon:<Globe className="w-8 h-8 text-blue-500"/>,
        label:'180+ Global Markets',
        description:'Unified access to spot, derivatives, and DeFi protocols across 180 countries with institutional-depth liquidity.'
    },
    {
        icon:<ChartLine className="w-8 h-8 text-green-400" />,
        label:'Institutional-Grade API',
        description:'Low-latency WebSocket feeds, FIX protocol support, and co-location options built for serious algorithmic strategies'
    },
]
export const MISSION = {
  title: "Our Mission",
  image: mission,
  description:
    "To empower individuals and businesses with secure, transparent, and innovative financial technology that makes digital assets accessible to everyone regardless of their experience level.",
};

export const VISION = {
  title: "Our Vision",
  image: vision,
  description:
    "To become the world's most trusted cryptocurrency ecosystem by building intelligent financial products that connect people to the future of decentralized finance.",
};