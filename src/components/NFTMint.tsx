import React, { useState } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { mintNFT } from '../utils/solana';

const NFTMint: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [metadata, setMetadata] = useState('{"name":"AI Model","description":"NLP model","image":"ipfs://image_uri","attributes":[{"trait_type":"model_type","value":"NLP"}]}');
  const [aiModelHash, setAiModelHash] = useState('');
  const [tx, setTx] = useState('');
  const [error, setError] = useState('');

  const handleMint = async () => {
    if (!wallet) {
      setError('Please connect your wallet');
      return;
    }
    setError('');
    setTx('');
    try {
      const provider = await import('../utils/solana').then(m => m.getProvider(connection, wallet));
      const txSignature = await mintNFT(provider, metadata, aiModelHash);
      setTx(txSignature);
    } catch (err) {
      setError('Minting failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="nft-mint bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Mint NFT</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Metadata (JSON)</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          placeholder='{"name":"AI Model","description":"...","image":"ipfs://...","attributes":[{"trait_type":"model_type","value":"NLP"}]}'
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">AI Model Hash (Optional)</label>
        <input
          className="w-full p-2 border rounded"
          type="text"
          value={aiModelHash}
          onChange={(e) => setAiModelHash(e.target.value)}
          placeholder="e.g., model_hash_123"
        />
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleMint}
        disabled={!wallet}
      >
        Mint NFT
      </button>
      {tx && <p className="mt-4 text-green-600">Transaction: <a href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`} target="_blank" rel="noopener noreferrer">{tx.slice(0, 8)}...</a></p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default NFTMint;