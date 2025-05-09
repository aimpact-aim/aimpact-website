import React, { useState, useEffect } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { buyNFT } from '../utils/solana';
import { MarketplaceItem } from '../types';

const Marketplace: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [tx, setTx] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Mock API call to fetch marketplace items
    setItems([
      {
        id: '1',
        type: 'model',
        price: 100,
        metadata: JSON.stringify({ name: 'Sentiment Analysis', description: 'NLP model', image: 'ipfs://image1', qualityScore: 85 }),
        recommendationScore: 0.9,
        seller: 'SELLER_PUBLIC_KEY_1',
      },
      {
        id: '2',
        type: 'nft',
        price: 200,
        metadata: JSON.stringify({ name: 'AI Art #1', description: 'Generative art', image: 'ipfs://image2', attributes: [{ trait_type: 'artist', value: 'AI' }] }),
        recommendationScore: 0.8,
        seller: 'SELLER_PUBLIC_KEY_2',
      },
    ]);
  }, []);

  const handleBuy = async (item: MarketplaceItem) => {
    if (!wallet) {
      setError('Please connect your wallet');
      return;
    }
    setError('');
    setTx('');
    try {
      const provider = await import('../utils/solana').then(m => m.getProvider(connection, wallet));
      const txSignature = await buyNFT(
        provider,
        new PublicKey(item.id),
        new PublicKey(item.seller),
        item.price
      );
      setTx(txSignature);
    } catch (err) {
      setError('Purchase failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="marketplace">
      <h2 className="text-2xl font-bold mb-6">AI Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={JSON.parse(item.metadata).image}
              alt={JSON.parse(item.metadata).name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold">{JSON.parse(item.metadata).name}</h3>
            <p className="text-gray-600">{JSON.parse(item.metadata).description}</p>
            <p className="text-lg font-bold mt-2">Price: {item.price} AIM</p>
            {item.qualityScore && <p className="text-sm text-accent">Quality Score: {item.qualityScore}%</p>}
            <p className="text-sm">AI Recommendation: {(item.recommendationScore * 100).toFixed(0)}%</p>
            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              onClick={() => handleBuy(item)}
              disabled={!wallet}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      {tx && <p className="mt-4 text-green-600">Transaction: <a href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`} target="_blank" rel="noopener noreferrer">{tx.slice(0, 8)}...</a></p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default Marketplace;