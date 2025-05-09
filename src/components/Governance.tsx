import React, { useState } from 'react';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { createProposal, voteOnProposal } from '../utils/solana';

const Governance: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [proposalId, setProposalId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [vote, setVote] = useState(true);
  const [tx, setTx] = useState('');
  const [error, setError] = useState('');

  const handleCreateProposal = async () => {
    if (!wallet) {
      setError('Please connect your wallet');
      return;
    }
    if (!proposalId || !deadline || isNaN(Number(proposalId)) || isNaN(Number(deadline))) {
      setError('Enter valid proposal ID and deadline');
      return;
    }
    setError('');
    setTx('');
    try {
      const provider = await import('../utils/solana').then(m => m.getProvider(connection, wallet));
      const txSignature = await createProposal(provider, Number(proposalId), Number(deadline));
      setTx(txSignature);
    } catch (err) {
      setError('Creating proposal failed: ' + (err as Error).message);
    }
  };

  const handleVote = async () => {
    if (!wallet) {
      setError('Please connect your wallet');
      return;
    }
    if (!proposalId || isNaN(Number(proposalId))) {
      setError('Enter a valid proposal ID');
      return;
    }
    setError('');
    setTx('');
    try {
      const provider = await import('../utils/solana').then(m => m.getProvider(connection, wallet));
      const txSignature = await voteOnProposal(provider, Number(proposalId), vote);
      setTx(txSignature);
    } catch (err) {
      setError('Voting failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="governance bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Governance</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Proposal ID</label>
        <input
          className="w-full p-2 border rounded"
          type="number"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          placeholder="e.g., 1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Deadline (Unix Timestamp)</label>
        <input
          className="w-full p-2 border rounded"
          type="number"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="e.g., 1735689600"
        />
      </div>
      <button
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleCreateProposal}
        disabled={!wallet || !proposalId || !deadline}
      >
        Create Proposal
      </button>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Vote on Proposal</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Vote</label>
          <select
            className="w-full p-2 border rounded"
            value={vote.toString()}
            onChange={(e) => setVote(e.target.value === 'true')}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          className="bg-accent text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          onClick={handleVote}
          disabled={!wallet || !proposalId}
        >
          Vote
        </button>
      </div>
      {tx && <p className="mt-4 text-green-600">Transaction: <a href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`} target="_blank" rel="noopener noreferrer">{tx.slice(0, 8)}...</a></p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default Governance;