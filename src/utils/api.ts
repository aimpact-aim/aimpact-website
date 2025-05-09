import axios from 'axios';

export const fetchMarketplaceItems = async (): Promise<any[]> => {
  // Placeholder: Replace with actual API endpoint
  return [
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
  ];
};