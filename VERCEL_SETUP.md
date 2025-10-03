# Vercel Deployment Guide

## Required Environment Variables for Vercel

Add these in your Vercel project settings under "Environment Variables":

### 1. OpenAI Configuration

```
Variable Name: OPENAI_API_KEY
Value: sk-proj-your-actual-openai-api-key-here
```

**How to get it:**
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-` or `sk-`)
4. Paste into Vercel

### 2. Solana Network

```
Variable Name: NEXT_PUBLIC_SOLANA_NETWORK
Value: devnet
```

**Options:**
- `devnet` - For testing (recommended to start)
- `mainnet-beta` - For production (costs real SOL)

### 3. Solana Private Key

```
Variable Name: SOLANA_PRIVATE_KEY
Value: your-base58-encoded-private-key
```

**How to get it:**

#### Option A: Create New Wallet (Easiest)
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Generate keypair
solana-keygen new --outfile ~/my-wallet.json

# The output will show your public key
# You need to convert the JSON to base58 format
```

#### Option B: Use Online Tool
1. Go to https://www.sollet.io or use Phantom wallet
2. Create new wallet
3. Export private key
4. Convert to base58 if needed

**IMPORTANT:** 
- For devnet testing, create a NEW wallet
- Never use your mainnet wallet with real funds
- Keep this key secret!

### 4. App URL

```
Variable Name: NEXT_PUBLIC_APP_URL
Value: https://your-app-name.vercel.app
```

**Note:** Update this after your first deployment with your actual Vercel URL

### 5. CS Token Mint (Optional - Add Later)

```
Variable Name: CS_TOKEN_MINT_ADDRESS
Value: your-token-mint-address-here
```

**How to get it:**
- Deploy first without this variable
- Run the token creation script (see below)
- Add the returned address here
- Redeploy

## Step-by-Step Deployment

### 1. Prepare Your Repository

```bash
cd /Users/christaylormakarias/Desktop/CSYSTEMS
git init
git add .
git commit -m "Initial commit: Consilience DAO platform"
git branch -M main
git remote add origin https://github.com/ChrisTaylor17/CSYSTEMS.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository: `ChrisTaylor17/CSYSTEMS`
3. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables

In Vercel dashboard:
1. Go to your project
2. Click "Settings"
3. Click "Environment Variables"
4. Add each variable listed above
5. Select "Production", "Preview", and "Development" for each

### 4. Deploy

Click "Deploy" button. Vercel will:
- Install dependencies
- Build your Next.js app
- Deploy to production

### 5. Get Your Deployment URL

After deployment completes:
1. Copy your deployment URL (e.g., `https://csystems.vercel.app`)
2. Go back to Environment Variables
3. Update `NEXT_PUBLIC_APP_URL` with your actual URL
4. Redeploy

## Post-Deployment: Create CS Token

### Option 1: Using Solana CLI

```bash
# Install dependencies
npm install

# Create token creation script
node scripts/create-token.js
```

### Option 2: Manual Creation

1. Go to https://spl-token-ui.com/
2. Connect wallet
3. Create new token
4. Copy mint address
5. Add to Vercel environment variables

## Testing Your Deployment

1. Visit your Vercel URL
2. Click "Get Started"
3. Create a profile
4. Try "Find Project Matches"
5. Check console for any errors

## Common Issues

### Issue: "OpenAI API key not found"
**Solution:** Verify `OPENAI_API_KEY` is set in Vercel environment variables

### Issue: "Solana private key not configured"
**Solution:** Verify `SOLANA_PRIVATE_KEY` is set and in correct base58 format

### Issue: "Insufficient funds"
**Solution:** 
- For devnet: Get free SOL from https://solfaucet.com/
- For mainnet: Add SOL to your wallet

### Issue: Build fails
**Solution:** 
- Check build logs in Vercel
- Ensure all dependencies are in package.json
- Verify Node.js version is 18+

## Funding Your Devnet Wallet

```bash
# Get your wallet address
solana address

# Request airdrop (devnet only)
solana airdrop 2

# Or use web faucet
# Visit: https://solfaucet.com/
```

## Security Checklist

- [ ] Using devnet for testing
- [ ] Private keys not committed to git
- [ ] `.env` file in `.gitignore`
- [ ] Different wallets for dev/prod
- [ ] API keys have spending limits
- [ ] Rate limiting enabled

## Monitoring

### Check Deployment Status
- Vercel Dashboard: https://vercel.com/dashboard
- View logs in real-time
- Monitor function execution

### Check Blockchain Transactions
- Devnet Explorer: https://explorer.solana.com/?cluster=devnet
- Mainnet Explorer: https://explorer.solana.com/

## Updating Environment Variables

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Edit or add variables
5. Redeploy for changes to take effect

## Cost Estimates

### OpenAI API
- GPT-4 Turbo: ~$0.01 per request
- Budget: Set limits in OpenAI dashboard

### Solana Transactions
- Devnet: FREE
- Mainnet: ~0.000005 SOL per transaction (~$0.0005)

### Vercel Hosting
- Hobby Plan: FREE
- Pro Plan: $20/month (if needed)

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Add environment variables
3. ✅ Test basic functionality
4. ✅ Create CS token
5. ✅ Fund devnet wallet
6. ✅ Test full flow
7. 🚀 Share with users!

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check browser console
3. Verify all environment variables
4. Test API endpoints individually
5. Open GitHub issue if needed

---

**Ready to deploy?** Follow the steps above and you'll be live in minutes!
