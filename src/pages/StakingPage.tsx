import React from 'react';
import Staking from '../components/Staking';

const StakingPage: React.FC = () => {
  return (
    <div className="staking-page">
      <h1 className="text-3xl font-bold mb-8">Staking</h1>
      <Staking />
    </div>
  );
};

export default StakingPage;