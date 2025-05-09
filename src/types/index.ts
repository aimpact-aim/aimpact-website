export interface NFT {
  owner: string;
  metadata: string;
  aiModelHash: string;
  minted: boolean;
}

export interface MarketplaceItem {
  id: string;
  type: 'model' | 'nft';
  price: number;
  metadata: string;
  qualityScore?: number;
  recommendationScore?: number;
  seller: string;
}