import React from 'react';

const Whitepaper: React.FC = () => {
  return (
    <div className="whitepaper bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">AImpact Whitepaper</h2>
      <p className="mb-4">
        AImpact Token (AIM) powers a decentralized AI marketplace on Solana, integrating Chainlink oracles for dataset verification and CCIP for cross-chain interoperability. Key features include:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>NFT marketplace for AI models and digital art.</li>
        <li>AI-driven rewards and recommendations.</li>
        <li>Staking with 5–10% APY.</li>
        <li>Governance via DAO.</li>
        <li>Cross-chain bridging to Ethereum and Polygon.</li>
      </ul>
      <p className="mb-4">
        <strong>Tokenomics:</strong> 1B fixed supply, 33% public sale, 1.5% annual burn.
      </p>
      <p className="mb-4">
        <strong>Roadmap:</strong> Starts June 2025, with IDO in December 2025.
      </p>
      <a
        href="/whitepaper.pdf"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Full Whitepaper
      </a>
    </div>
  );
};

export default Whitepaper;