import React from 'react';
import Governance from '../components/Governance';

const GovernancePage: React.FC = () => {
  return (
    <div className="governance-page">
      <h1 className="text-3xl font-bold mb-8">Governance</h1>
      <Governance />
    </div>
  );
};

export default GovernancePage;