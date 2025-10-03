# Quick Start Guide

Get your Consilience DAO platform running in 10 minutes!

## What You Need

1. **OpenAI API Key** - For AI matchmaking
2. **Solana Wallet** - For blockchain transactions
3. **GitHub Account** - For deployment
4. **Vercel Account** - For hosting (free)

## Step 1: Get OpenAI API Key (2 minutes)

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Save it somewhere safe

**Cost:** ~$0.01 per AI request. Add $5 credit to start.

## Step 2: Create Solana Wallet (3 minutes)

### Easy Method (Recommended):

1. Install Phantom Wallet: https://phantom.app/
2. Create new wallet
3. Switch to "Devnet" in settings
4. Copy your wallet address

### Get Your Private Key:

⚠️ **IMPORTANT:** Only use devnet for testing!

1. In Phantom, go to Settings → Export Private Key
2. Copy the private key
3. This is your `SOLANA_PRIVATE_KEY`

### Get Free Devnet SOL:

1. Go to https://solfaucet.com/
2. Paste your wallet address
3. Click "Devnet" and request airdrop
4. You'll get 1-2 SOL (fake money for testing)

## Step 3: Deploy to Vercel (5 minutes)

### A. Push to GitHub

```bash
cd /Users/christaylormakarias/Desktop/CSYSTEMS
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ChrisTaylor17/CSYSTEMS.git
git push -u origin main
```

### B. Deploy on Vercel

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Import repository: `ChrisTaylor17/CSYSTEMS`
4. Click "Deploy" (don't add variables yet)
5. Wait for deployment to complete

### C. Add Environment Variables

In Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add these 4 variables:

```
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_SOLANA_NETWORK=devnet
SOLANA_PRIVATE_KEY=your-phantom-private-key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

3. Click "Redeploy" after adding variables

## Step 4: Create CS Token (Optional)

After deployment, create your token:

```bash
npm install
node scripts/create-token.js
```

Copy the mint address and add to Vercel:
```
CS_TOKEN_MINT_ADDRESS=your-mint-address
```

## Step 5: Test Your App! 🎉

1. Visit your Vercel URL
2. Click "Get Started"
3. Create profile:
   - Alias: `yourname.builder`
   - Interests: `AI, Design, Web3`
   - Skills: `React, Python, Marketing`
4. Click "Find Project Matches"
5. Watch AI match you with a project!
6. Accept match and complete task
7. Submit proof and get NFT + tokens!

## Troubleshooting

### "OpenAI API Error"
- Check API key is correct
- Verify you have credits: https://platform.openai.com/account/billing

### "Solana Error"
- Make sure you're on devnet
- Check you have SOL: https://solfaucet.com/
- Verify private key format

### "Build Failed"
- Check Vercel logs
- Ensure all environment variables are set
- Try redeploying

## What's Next?

### For Testing:
- ✅ Use devnet (free)
- ✅ Test all features
- ✅ Invite friends to test

### For Production:
- 🔄 Switch to mainnet-beta
- 💰 Add real SOL to wallet
- 🔒 Use secure key management
- 📊 Set up monitoring

## Environment Variables Summary

| Variable | Where to Get It | Required |
|----------|----------------|----------|
| `OPENAI_API_KEY` | https://platform.openai.com/api-keys | ✅ Yes |
| `NEXT_PUBLIC_SOLANA_NETWORK` | Use `devnet` or `mainnet-beta` | ✅ Yes |
| `SOLANA_PRIVATE_KEY` | Phantom wallet export | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL | ✅ Yes |
| `CS_TOKEN_MINT_ADDRESS` | Run create-token script | ⚠️ Optional |

## Costs

### Development (Devnet):
- Solana: **FREE** ✅
- OpenAI: ~$0.01 per request
- Vercel: **FREE** ✅

### Production (Mainnet):
- Solana: ~$0.0005 per transaction
- OpenAI: ~$0.01 per request
- Vercel: FREE (Hobby) or $20/month (Pro)

## Support

Need help?
- 📖 Read full README.md
- 🚀 Check VERCEL_SETUP.md
- 🐛 Open GitHub issue
- 💬 Check Vercel logs

## Security Reminders

- ⚠️ Never commit `.env` file
- ⚠️ Use devnet for testing
- ⚠️ Keep private keys secret
- ⚠️ Don't share API keys
- ⚠️ Use different wallets for dev/prod

---

**You're all set!** 🎉 Your AI-powered DAO platform is live!

Share your Vercel URL and start building your community.
