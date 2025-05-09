import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, BN } from '@project-serum/anchor';
import idl from '../idl/aim_token.json'; // Export IDL from Anchor build

const PROGRAM_ID = new PublicKey(process.env.REACT_APP_PROGRAM_ID || 'YOUR_PROGRAM_ID');
const MINT_ADDRESS = new PublicKey(process.env.REACT_APP_MINT_ADDRESS || 'YOUR_MINT_ADDRESS');
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

export const getProvider = (connection: Connection, wallet: any) => {
  return new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
};

export const mintNFT = async (provider: AnchorProvider, metadata: string, aiModelHash: string) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const nft = web3.Keypair.generate();
  const [stakingPool] = await web3.PublicKey.findProgramAddress([Buffer.from('staking_pool')], PROGRAM_ID);

  const tx = await program.rpc.mintNft(metadata, aiModelHash, {
    accounts: {
      nft: nft.publicKey,
      creator: provider.wallet.publicKey,
      staking_pool: stakingPool,
      system_program: SystemProgram.programId,
    },
    signers: [nft],
  });

  return tx;
};

export const buyNFT = async (provider: AnchorProvider, nftId: PublicKey, seller: PublicKey, amount: number) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [stakingPool] = await web3.PublicKey.findProgramAddress([Buffer.from('staking_pool')], PROGRAM_ID);
  const [feeCollector] = await web3.PublicKey.findProgramAddress([Buffer.from('fee_collector')], PROGRAM_ID);
  const [escrow] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('escrow'), provider.wallet.publicKey.toBuffer(), nftId.toBuffer()],
    PROGRAM_ID
  );

  // Placeholder: Fetch buyer_token and seller_token accounts
  const buyerToken = provider.wallet.publicKey; // Replace with actual token account
  const sellerToken = seller; // Replace with actual token account

  const tx = await program.rpc.buyNft(new BN(amount), {
    accounts: {
      mint: MINT_ADDRESS,
      buyer_token: buyerToken,
      seller_token: sellerToken,
      fee_collector: feeCollector,
      fee_collector_token: feeCollector,
      escrow,
      nft: nftId,
      buyer: provider.wallet.publicKey,
      seller,
      staking_pool: stakingPool,
      token_program: TOKEN_PROGRAM_ID,
      system_program: SystemProgram.programId,
    },
  });

  return tx;
};

export const stake = async (provider: AnchorProvider, amount: number) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [stakingPool] = await web3.PublicKey.findProgramAddress([Buffer.from('staking_pool')], PROGRAM_ID);
  const [userStake] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('user_stake'), provider.wallet.publicKey.toBuffer()],
    PROGRAM_ID
  );

  // Placeholder: Fetch staking_pool_token and user_token accounts
  const stakingPoolToken = stakingPool; // Replace with actual token account
  const userToken = provider.wallet.publicKey; // Replace with actual token account

  const tx = await program.rpc.stake(new BN(amount), {
    accounts: {
      staking_pool: stakingPool,
      staking_pool_token: stakingPoolToken,
      user_stake: userStake,
      user_token: userToken,
      user: provider.wallet.publicKey,
      token_program: TOKEN_PROGRAM_ID,
      system_program: SystemProgram.programId,
    },
  });

  return tx;
};

export const unstake = async (provider: AnchorProvider, amount: number) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [stakingPool] = await web3.PublicKey.findProgramAddress([Buffer.from('staking_pool')], PROGRAM_ID);
  const [userStake] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('user_stake'), provider.wallet.publicKey.toBuffer()],
    PROGRAM_ID
  );

  // Placeholder: Fetch staking_pool_token and user_token accounts
  const stakingPoolToken = stakingPool; // Replace with actual token account
  const userToken = provider.wallet.publicKey; // Replace with actual token account

  const tx = await program.rpc.unstake(new BN(amount), {
    accounts: {
      staking_pool: stakingPool,
      staking_pool_token: stakingPoolToken,
      user_stake: userStake,
      user_token: userToken,
      user: provider.wallet.publicKey,
      token_program: TOKEN_PROGRAM_ID,
    },
  });

  return tx;
};

export const claimRewards = async (provider: AnchorProvider) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [stakingPool] = await web3.PublicKey.findProgramAddress([Buffer.from('staking_pool')], PROGRAM_ID);
  const [userStake] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('user_stake'), provider.wallet.publicKey.toBuffer()],
    PROGRAM_ID
  );

  // Placeholder: Fetch user_token account
  const userToken = provider.wallet.publicKey; // Replace with actual token account

  const tx = await program.rpc.claimRewards({
    accounts: {
      staking_pool: stakingPool,
      user_stake: userStake,
      mint: MINT_ADDRESS,
      user_token: userToken,
      user: provider.wallet.publicKey,
      token_program: TOKEN_PROGRAM_ID,
    },
  });

  return tx;
};

export const createProposal = async (provider: AnchorProvider, id: number, deadline: number) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [proposal] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('proposal'), new BN(id).toArrayLike(Buffer, 'le', 8)],
    PROGRAM_ID
  );

  const tx = await program.rpc.createProposal(new BN(id), new BN(deadline), {
    accounts: {
      proposal,
      proposer: provider.wallet.publicKey,
      system_program: SystemProgram.programId,
    },
  });

  return tx;
};

export const voteOnProposal = async (provider: AnchorProvider, id: number, vote: boolean) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [proposal] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('proposal'), new BN(id).toArrayLike(Buffer, 'le', 8)],
    PROGRAM_ID
  );
  const [userStake] = await web3.PublicKey.findProgramAddress(
    [Buffer.from('user_stake'), provider.wallet.publicKey.toBuffer()],
    PROGRAM_ID
  );

  const tx = await program.rpc.voteOnProposal(vote, {
    accounts: {
      proposal,
      user_stake: userStake,
      user: provider.wallet.publicKey,
    },
  });

  return tx;
};

export const bridgeTokensCcip = async (provider: AnchorProvider, amount: number, dstChain: string) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [stakingPool] = await web3.PublicKey.findProgramAddress([Buffer.from('staking_pool')], PROGRAM_ID);

  // Placeholder: Fetch user_token account
  const userToken = provider.wallet.publicKey; // Replace with actual token account

  const tx = await program.rpc.bridgeTokensCcip(new BN(amount), dstChain, {
    accounts: {
      mint: MINT_ADDRESS,
      user_token: userToken,
      staking_pool: stakingPool,
      user: provider.wallet.publicKey,
      token_program: TOKEN_PROGRAM_ID,
    },
  });

  return tx;
};

export const bridgeNftCcip = async (provider: AnchorProvider, nftId: string, dstChain: string) => {
  const program = new Program(idl, PROGRAM_ID, provider);
  const [stakingPool] = await web3.PublicKey.findProgramAddress([Buffer.from('staking_pool')], PROGRAM_ID);

  const tx = await program.rpc.bridgeNftCcip(new PublicKey(nftId), dstChain, {
    accounts: {
      nft: new PublicKey(nftId),
      staking_pool: stakingPool,
      user: provider.wallet.publicKey,
    },
  });

  return tx;
};