import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MarketplacePage from './pages/MarketplacePage';
import StakingPage from './pages/StakingPage';
import CrossChainPage from './pages/CrossChainPage';
import GovernancePage from './pages/GovernancePage';
import About from './pages/About';

const network = WalletAdapterNetwork.Devnet;
const endpoint = process.env.REACT_APP_SOLANA_RPC || 'https://api.devnet.solana.com';
const wallets = [new PhantomWalletAdapter()];

const App: React.FC = () => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/stake" element={<StakingPage />} />
                <Route path="/cross-chain" element={<CrossChainPage />} />
                <Route path="/governance" element={<GovernancePage />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;