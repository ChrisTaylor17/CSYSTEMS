/**
 * Setup Verification Script
 * Run this to check if your environment is configured correctly
 */

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Checking your environment setup...\n');

const checks = {
  openai: false,
  solana_network: false,
  solana_key: false,
  app_url: false,
  token_mint: false
};

// Check OpenAI API Key
if (process.env.OPENAI_API_KEY) {
  if (process.env.OPENAI_API_KEY.startsWith('sk-')) {
    checks.openai = true;
    console.log('✅ OpenAI API Key: Configured');
  } else {
    console.log('⚠️  OpenAI API Key: Invalid format (should start with sk-)');
  }
} else {
  console.log('❌ OpenAI API Key: Not found');
}

// Check Solana Network
if (process.env.NEXT_PUBLIC_SOLANA_NETWORK) {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
  if (network === 'devnet' || network === 'mainnet-beta') {
    checks.solana_network = true;
    console.log(`✅ Solana Network: ${network}`);
  } else {
    console.log('⚠️  Solana Network: Invalid (use devnet or mainnet-beta)');
  }
} else {
  console.log('❌ Solana Network: Not found');
}

// Check Solana Private Key
if (process.env.SOLANA_PRIVATE_KEY) {
  checks.solana_key = true;
  console.log('✅ Solana Private Key: Configured');
} else {
  console.log('❌ Solana Private Key: Not found');
}

// Check App URL
if (process.env.NEXT_PUBLIC_APP_URL) {
  checks.app_url = true;
  console.log(`✅ App URL: ${process.env.NEXT_PUBLIC_APP_URL}`);
} else {
  console.log('❌ App URL: Not found');
}

// Check Token Mint (optional)
if (process.env.CS_TOKEN_MINT_ADDRESS) {
  checks.token_mint = true;
  console.log('✅ CS Token Mint: Configured');
} else {
  console.log('⚠️  CS Token Mint: Not configured (optional - run create-token.js)');
}

// Summary
console.log('\n' + '='.repeat(60));
const required = checks.openai && checks.solana_network && checks.solana_key && checks.app_url;
const total = Object.values(checks).filter(Boolean).length;

if (required) {
  console.log('✅ All required variables configured!');
  console.log(`📊 Status: ${total}/5 variables set`);
  console.log('\n🚀 You\'re ready to deploy!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev (to test locally)');
  console.log('2. Push to GitHub');
  console.log('3. Deploy to Vercel');
  console.log('4. Add these same variables to Vercel');
} else {
  console.log('⚠️  Missing required variables');
  console.log(`📊 Status: ${total}/5 variables set`);
  console.log('\n📝 To fix:');
  console.log('1. Copy .env.local.example to .env.local');
  console.log('2. Fill in your actual values');
  console.log('3. Run this script again');
  console.log('\n📖 See ENVIRONMENT_VARIABLES.md for help');
}

console.log('='.repeat(60) + '\n');

// Additional checks
if (checks.openai && checks.solana_network && checks.solana_key && checks.app_url) {
  console.log('💡 Tips:');
  if (process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'devnet') {
    console.log('   - Get free devnet SOL: https://solfaucet.com/');
  }
  if (!checks.token_mint) {
    console.log('   - Create CS token: node scripts/create-token.js');
  }
  console.log('   - Monitor OpenAI usage: https://platform.openai.com/usage');
  console.log('   - View transactions: https://explorer.solana.com/');
  console.log('\n');
}
