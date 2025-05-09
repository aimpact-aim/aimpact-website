import React from 'react';
import CrossChain from '../components/CrossChain';

const CrossChainPage: React.FC = () => {
  return (
    <div className="cross-chain-page">
      <h1 className="text-3xl font-bold mb-8">Cross-Chain Bridging</h1>
      <CrossChain />
    </div>
  );
};

export default CrossChainPage;