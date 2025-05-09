import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">About AImpact</h1>
      <p className="mb-4">
        AImpact is a decentralized AI marketplace built on Solana, empowering creators, developers, and businesses to share and monetize AI models, datasets, and digital art. Our mission is to democratize AI through blockchain technology.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Team</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><strong>Sam Patel (CTO)</strong>: Solana developer, ex-Serum.</li>
        <li><strong>Dr. Liam Wong (AI Lead)</strong>: PhD in ML, ex-Meta AI.</li>
        <li><strong>Emma Liu (AI Engineer)</strong>: TensorFlow expert, ex-DeepMind.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Vision</h2>
      <p>
        To create a scalable, secure, and transparent ecosystem for AI innovation, leveraging Solana’s 65,000 TPS and Chainlink’s oracles and CCIP.
      </p>
    </div>
  );
};

export default About;