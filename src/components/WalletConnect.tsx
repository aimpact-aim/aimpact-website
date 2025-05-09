import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnect: React.FC = () => {
  const { connected, publicKey } = useWallet();

  return (
    <div className="wallet-connect">
      <WalletMultiButton />
      {connected && (
        <p className="text-sm mt-2">
          Connected: {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
        </p>
      )}
    </div>
  );
};

export default WalletConnect;