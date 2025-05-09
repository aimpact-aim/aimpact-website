import React from 'react';
import Whitepaper from '../components/Whitepaper';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to AImpact</h1>
        <p className="text-xl mb-6">Decentralized AI Marketplace on Solana</p>
        <a
          href="/marketplace"
          className="bg-accent text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Explore Marketplace
        </a>
      </section>
      <section className="features py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why AImpact?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">AI Marketplace</h3>
            <p>Trade AI models and digital art as NFTs with secure escrow.</p>
          </div>
          <div className="feature bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">AI-Driven Rewards</h3>
            <p>Earn AIM for high-quality datasets, verified by Chainlink oracles.</p>
          </div>
          <div className="feature bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Cross-Chain</h3>
            <p>Bridge AIM and NFTs to Ethereum and Polygon with Chainlink CCIP.</p>
          </div>
        </div>
      </section>
      <section className="whitepaper-section py-12">
        <Whitepaper />
      </section>
    </div>
  );
};

export default Home;