/**
 * Script to create CS Token on Solana
 * Run this once after deployment to create your token mint
 */

const { Connection, Keypair } = require('@solana/web3.js');
const { createMint } = require('@solana/spl-token');
require('dotenv').config();

async function createCSToken() {
  try {
    console.log('🚀 Creating CS Token...\n');

    // Setup connection
    const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
    const endpoint = network === 'mainnet-beta' 
      ? 'https://api.mainnet-beta.solana.com' 
      : 'https://api.devnet.solana.com';
    
    const connection = new Connection(endpoint, 'confirmed');
    console.log(`📡 Connected to Solana ${network}`);

    // Get payer keypair
    const privateKeyString = process.env.SOLANA_PRIVATE_KEY;
    if (!privateKeyString) {
      throw new Error('SOLANA_PRIVATE_KEY not found in environment variables');
    }

    const privateKeyArray = Uint8Array.from(Buffer.from(privateKeyString, 'base58'));
    const payer = Keypair.fromSecretKey(privateKeyArray);
    console.log(`💰 Payer address: ${payer.publicKey.toBase58()}`);

    // Check balance
    const balance = await connection.getBalance(payer.publicKey);
    console.log(`💵 Balance: ${balance / 1e9} SOL`);

    if (balance === 0) {
      console.log('\n⚠️  WARNING: Wallet has no SOL!');
      if (network === 'devnet') {
        console.log('Get free devnet SOL from: https://solfaucet.com/');
      } else {
        console.log('Add SOL to your wallet to continue');
      }
      return;
    }

    // Create token mint
    console.log('\n⏳ Creating token mint...');
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey, // mint authority
      payer.publicKey, // freeze authority
      9 // decimals
    );

    console.log('\n✅ SUCCESS! CS Token created!');
    console.log('\n📋 Token Details:');
    console.log(`   Mint Address: ${mint.toBase58()}`);
    console.log(`   Network: ${network}`);
    console.log(`   Decimals: 9`);
    console.log(`   Authority: ${payer.publicKey.toBase58()}`);
    
    console.log('\n🔧 Next Steps:');
    console.log('1. Add this to your .env file:');
    console.log(`   CS_TOKEN_MINT_ADDRESS=${mint.toBase58()}`);
    console.log('\n2. Add to Vercel environment variables');
    console.log('3. Redeploy your application');
    
    console.log(`\n🔍 View on Explorer:`);
    console.log(`   https://explorer.solana.com/address/${mint.toBase58()}?cluster=${network}`);

  } catch (error) {
    console.error('\n❌ Error creating token:', error.message);
    
    if (error.message.includes('insufficient funds')) {
      console.log('\n💡 Solution: Add SOL to your wallet');
      if (process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'devnet') {
        console.log('   Get free devnet SOL: https://solfaucet.com/');
      }
    }
  }
}

// Run the script
createCSToken();
