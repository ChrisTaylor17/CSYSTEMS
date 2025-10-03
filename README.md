# Consilience DAO - AI-Powered Collaboration Platform

A decentralized collaboration platform that uses OpenAI for intelligent matchmaking and Solana blockchain for rewards and milestone NFTs.

## Features

- 🤖 **AI Matchmaking**: OpenAI GPT-4 matches users with projects based on skills and interests
- 💰 **Token Rewards**: Earn CS tokens on Solana blockchain for completing tasks
- 🎨 **Milestone NFTs**: Automatic NFT minting for project milestones
- 💬 **AI Chat Assistant**: Get guidance and support from AI throughout your journey
- 📱 **QR Check-ins**: Earn tokens for workspace check-ins
- 🔗 **Blockchain Integration**: Real Solana transactions and NFT minting

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 Turbo
- **Blockchain**: Solana (devnet/mainnet), Metaplex for NFTs
- **UI Components**: Radix UI, Lucide Icons

## Prerequisites

1. **OpenAI API Key**: Get from https://platform.openai.com/api-keys
2. **Solana Wallet**: Create a wallet for server-side operations
3. **Node.js**: Version 18 or higher

## Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Solana Configuration
NEXT_PUBLIC_SOLANA_NETWORK=devnet
SOLANA_PRIVATE_KEY=your-base58-encoded-private-key-here

# Optional: CS Token Mint Address (create one after first deployment)
CS_TOKEN_MINT_ADDRESS=your-token-mint-address

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Getting Your Solana Private Key

### Option 1: Create New Wallet (Recommended for Development)

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Generate new keypair
solana-keygen new --outfile ~/.config/solana/devnet.json

# Get your private key in base58 format
# Use a tool or script to convert the JSON array to base58
```

### Option 2: Use Existing Wallet

If you have a Phantom or Solflare wallet, export your private key (be careful with mainnet keys!).

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ChrisTaylor17/CSYSTEMS.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_SOLANA_NETWORK`
   - `SOLANA_PRIVATE_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
4. Deploy!

### Required Vercel Environment Variables

```
OPENAI_API_KEY=sk-proj-...
NEXT_PUBLIC_SOLANA_NETWORK=devnet
SOLANA_PRIVATE_KEY=your-base58-key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
CS_TOKEN_MINT_ADDRESS=optional-token-address
```

## Creating Your CS Token (One-time Setup)

After deployment, you need to create your CS token mint:

```bash
# Run this script once to create your token
node scripts/create-token.js
```

Then add the returned mint address to your environment variables as `CS_TOKEN_MINT_ADDRESS`.

## Usage Flow

1. **Sign Up**: Create profile with alias, interests, and skills
2. **Find Matches**: AI analyzes your profile and suggests best project matches
3. **Accept Match**: Join a project and get assigned a task
4. **Complete Task**: Work on your task and submit proof
5. **Earn Rewards**: AI verifies completion, mints NFT, and awards CS tokens
6. **Check-in**: Generate QR codes for workspace check-ins to earn bonus tokens

## API Routes

- `POST /api/ai-match` - AI matchmaking and chat
- `POST /api/mint-nft` - Mint milestone NFTs
- `POST /api/check-in` - Process QR check-ins

## Token Economics

- Task completion: Variable CS tokens (AI-determined)
- Check-ins: 5 CS tokens (4 to user, 1 to founder)
- NFT minting: Automatic for milestones

## Security Notes

- Never commit `.env` file
- Use devnet for testing
- Keep private keys secure
- Validate all user inputs
- Rate limit API endpoints in production

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### OpenAI API Errors
- Verify API key is correct
- Check you have credits in your OpenAI account
- Ensure you're using GPT-4 Turbo model

### Solana Errors
- Verify network (devnet/mainnet) is correct
- Ensure wallet has SOL for transactions
- Check private key format (base58)

### Vercel Deployment Issues
- Verify all environment variables are set
- Check build logs for errors
- Ensure Node.js version is 18+

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

MIT License - feel free to use for your own projects!

## Support

For issues or questions, open an issue on GitHub.
