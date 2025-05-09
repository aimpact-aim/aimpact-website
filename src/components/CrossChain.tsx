import React, { useState } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { bridgeTokensCcip, bridgeNftCcip } from '../utils/solana';

const CrossChain: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [amount, setAmount] = useState('');
  const [nftId, setNftId] = useState('');
  const [dstChain, setDstChain] = useState('ethereum');
  const [tx, setTx] = useState('');
  const [error, setError] = useState('');

  const handleBridgeTokens = async () => {
    if (!wallet) {
      setError('Please connect your wallet');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Enter a valid amount');
      return;
    }
    setError('');
    setTx('');
    try {
      const provider = await import('../utils/solana').then(m => m.getProvider(connection, wallet));
      const txSignature = await bridgeTokensCcip(provider, Number(amount), dstChain);
      setTx(txSignature);
    } catch (err) {
      setError('Bridging tokens failed: ' + (err as Error).message);
    }
  };

  const handleBridgeNFT = async () => {
    if (!wallet) {
      setError('Please connect your wallet');
      return;
    }
    if (!nftId) {
      setError('Enter a valid NFT ID');
      return;
    }
    setError('');
    setTx('');
    try {
      const provider = await import('../utils/solana').then(m => m.getProvider(connection, wallet));
      const txSignature = await bridgeNftCcip(provider, nftId, dstChain);
      setTx(txSignature);
    } catch (err) {
      setError('Bridging NFT failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="cross-chain bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Bridge AIM/NFTs</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount (AIM)</label>
        <input
          className="w-full p-2 border rounded"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 1000"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">NFT ID (Optional)</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
          placeholder="e.g., public_key"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Destination Chain</label>
        <select
          className="w-full p-2 border rounded"
          value={dstChain}
          onChange={(e) => setDstChain(e.target.value)}
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleBridgeTokens}
          disabled={!wallet || !amount}
        >
          Bridge Tokens
        </button>
        <button
          className="bg-accent text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          onClick={handleBridgeNFT}
          disabled={!wallet || !nftId}
        >
          Bridge NFT
        </button>
      </div>
      {tx && <p className="mt-4 text-green-600">Transaction: <a href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`} target="_blank" rel="noopener noreferrer">{tx.slice(0, 8)}...</a></p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default CrossChain;