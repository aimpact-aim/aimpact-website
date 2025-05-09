import React from 'react';
import Marketplace from '../components/Marketplace';
import NFTMint from '../components/NFTMint';

const MarketplacePage: React.FC = () => {
  return (
    <div className="marketplace-page">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
      <NFTMint />
      <Marketplace />
    </div>
  );
};

export default MarketplacePage;