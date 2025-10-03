import { Connection, Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
const RPC_ENDPOINT = NETWORK === 'mainnet-beta' 
  ? 'https://api.mainnet-beta.solana.com' 
  : 'https://api.devnet.solana.com';

export const connection = new Connection(RPC_ENDPOINT, 'confirmed');

export async function getServerKeypair(): Promise<Keypair> {
  const privateKeyString = process.env.SOLANA_PRIVATE_KEY;
  if (!privateKeyString) {
    throw new Error('SOLANA_PRIVATE_KEY not configured');
  }
  const privateKeyArray = Uint8Array.from(Buffer.from(privateKeyString, 'base58'));
  return Keypair.fromSecretKey(privateKeyArray);
}

export async function createCSToken(payer: Keypair): Promise<PublicKey> {
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    9 // 9 decimals
  );
  return mint;
}

export async function mintCSTokens(
  mint: PublicKey,
  recipient: PublicKey,
  amount: number,
  payer: Keypair
): Promise<string> {
  const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipient
  );

  const signature = await mintTo(
    connection,
    payer,
    mint,
    recipientTokenAccount.address,
    payer.publicKey,
    amount * Math.pow(10, 9) // Convert to smallest unit
  );

  return signature;
}

export async function createWallet(): Promise<{ publicKey: string; privateKey: string }> {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey.toBase58(),
    privateKey: Buffer.from(keypair.secretKey).toString('base58'),
  };
}
