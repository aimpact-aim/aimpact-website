import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="AImpact Logo" className="h-12 mr-4" />
          <h1 className="text-2xl font-bold">AImpact</h1>
        </div>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/marketplace" className="hover:underline">Marketplace</Link>
          <Link to="/stake" className="hover:underline">Stake</Link>
          <Link to="/cross-chain" className="hover:underline">Cross-Chain</Link>
          <Link to="/governance" className="hover:underline">Governance</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </nav>
        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;