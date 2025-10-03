# Environment Variables for Vercel Deployment

Copy these exact variable names and values into your Vercel project settings.

## Required Variables (Must Have)

### 1. OPENAI_API_KEY
```
Variable Name: OPENAI_API_KEY
Value: sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Environment: Production, Preview, Development
```

**How to get:**
1. Visit https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name it "Consilience DAO"
4. Copy the key (starts with `sk-proj-` or `sk-`)
5. Paste into Vercel

**Important:**
- Keep this secret!
- Add billing credit ($5 minimum recommended)
- Monitor usage at https://platform.openai.com/usage

---

### 2. NEXT_PUBLIC_SOLANA_NETWORK
```
Variable Name: NEXT_PUBLIC_SOLANA_NETWORK
Value: devnet
Environment: Production, Preview, Development
```

**Options:**
- `devnet` - Free testing network (recommended to start)
- `mainnet-beta` - Real Solana network (costs real money)

**Start with devnet, switch to mainnet when ready for production**

---

### 3. SOLANA_PRIVATE_KEY
```
Variable Name: SOLANA_PRIVATE_KEY
Value: [your-base58-encoded-private-key]
Environment: Production, Preview, Development
```

**How to get:**

#### Method 1: Using Phantom Wallet (Easiest)
1. Install Phantom: https://phantom.app/
2. Create new wallet OR use existing
3. Go to Settings → Security & Privacy
4. Click "Export Private Key"
5. Enter password
6. Copy the private key string
7. Paste into Vercel

#### Method 2: Using Solana CLI
```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Generate new keypair
solana-keygen new --outfile ~/devnet-wallet.json

# Display the keypair (you'll need to convert to base58)
cat ~/devnet-wallet.json
```

**CRITICAL SECURITY:**
- ⚠️ For devnet: Create a NEW wallet just for testing
- ⚠️ For mainnet: Use a dedicated wallet with limited funds
- ⚠️ NEVER use your personal wallet with large holdings
- ⚠️ Keep this key absolutely secret

**Fund your wallet:**
- Devnet: https://solfaucet.com/ (free)
- Mainnet: Transfer SOL from exchange

---

### 4. NEXT_PUBLIC_APP_URL
```
Variable Name: NEXT_PUBLIC_APP_URL
Value: https://your-project-name.vercel.app
Environment: Production, Preview, Development
```

**How to get:**
1. Deploy to Vercel first (without this variable)
2. Copy your deployment URL from Vercel dashboard
3. Add this variable with your URL
4. Redeploy

**Examples:**
- `https://consilience-dao.vercel.app`
- `https://csystems.vercel.app`
- `https://my-dao-platform.vercel.app`

---

## Optional Variables (Add Later)

### 5. CS_TOKEN_MINT_ADDRESS
```
Variable Name: CS_TOKEN_MINT_ADDRESS
Value: [your-token-mint-address]
Environment: Production, Preview, Development
```

**How to get:**
1. Deploy app first without this variable
2. Run token creation script:
   ```bash
   npm install
   node scripts/create-token.js
   ```
3. Copy the mint address from output
4. Add to Vercel environment variables
5. Redeploy

**Note:** You can skip this initially. The app will work without it, but token minting features won't function until you add it.

---

## Complete .env File Template

Create this file locally for development:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-actual-key-here

# Solana Configuration  
NEXT_PUBLIC_SOLANA_NETWORK=devnet
SOLANA_PRIVATE_KEY=your-base58-private-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Add after creating token
CS_TOKEN_MINT_ADDRESS=your-token-mint-address-here
```

---

## Vercel Setup Checklist

- [ ] Created OpenAI account and got API key
- [ ] Added billing credit to OpenAI ($5+)
- [ ] Created Solana wallet (Phantom recommended)
- [ ] Switched wallet to devnet
- [ ] Got free devnet SOL from faucet
- [ ] Exported private key from wallet
- [ ] Pushed code to GitHub
- [ ] Connected GitHub repo to Vercel
- [ ] Added all 4 required environment variables
- [ ] Deployed successfully
- [ ] Updated NEXT_PUBLIC_APP_URL with actual URL
- [ ] Redeployed
- [ ] Tested the app
- [ ] (Optional) Created CS token
- [ ] (Optional) Added CS_TOKEN_MINT_ADDRESS

---

## Testing Your Variables

After deployment, test each integration:

### Test OpenAI:
1. Sign up on your app
2. Click "Find Project Matches"
3. Should see AI-generated match

### Test Solana:
1. Complete a task
2. Submit proof
3. Should mint NFT and tokens

### Test Check-in:
1. Generate QR code
2. Simulate scan
3. Should receive tokens

---

## Common Issues

### Issue: "OpenAI API key not found"
**Fix:** 
- Verify variable name is exactly `OPENAI_API_KEY`
- Check value starts with `sk-`
- Redeploy after adding

### Issue: "Solana private key not configured"
**Fix:**
- Verify variable name is exactly `SOLANA_PRIVATE_KEY`
- Check key is in base58 format (not JSON array)
- Ensure wallet has SOL

### Issue: "Insufficient funds"
**Fix:**
- Devnet: Get SOL from https://solfaucet.com/
- Mainnet: Transfer SOL to wallet

### Issue: Build fails
**Fix:**
- Check all variable names match exactly
- Ensure no extra spaces in values
- Verify all required variables are set
- Check Vercel build logs

---

## Security Best Practices

1. **Never commit .env file**
   - Already in .gitignore
   - Double-check before pushing

2. **Use separate wallets**
   - Devnet wallet for testing
   - Mainnet wallet for production
   - Never mix them

3. **Limit API spending**
   - Set OpenAI usage limits
   - Monitor spending daily
   - Start with small credit

4. **Rotate keys regularly**
   - Change keys every 90 days
   - Immediately if compromised
   - Use different keys per environment

5. **Monitor transactions**
   - Check Solana explorer regularly
   - Review OpenAI usage logs
   - Set up alerts for unusual activity

---

## Cost Monitoring

### OpenAI Costs:
- View usage: https://platform.openai.com/usage
- Set limits: https://platform.openai.com/account/limits
- Typical cost: $0.01-0.03 per user interaction

### Solana Costs:
- Devnet: FREE
- Mainnet: ~0.000005 SOL per transaction (~$0.0005)
- View transactions: https://explorer.solana.com/

### Vercel Costs:
- Hobby plan: FREE
- Pro plan: $20/month (if needed for scale)

---

## Ready to Deploy?

1. ✅ Get all 4 required variables
2. ✅ Add them to Vercel
3. ✅ Deploy
4. ✅ Test
5. ✅ Create token (optional)
6. 🚀 Launch!

**Need help?** Check QUICKSTART.md or VERCEL_SETUP.md
