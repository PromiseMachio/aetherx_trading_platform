import { memo } from 'react';
import Portfolio_Hero from '../context/portfolioContext/Portfolio_Hero';

const Portfolio = () => {
  return (
    <main>
        <Portfolio_Hero />
    </main>
  );
};

export default memo(Portfolio);