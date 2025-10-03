import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { getServerKeypair, mintCSTokens } from '@/utils/solana';

// In production, store this in a database
const CS_TOKEN_MINT = process.env.CS_TOKEN_MINT_ADDRESS;

export async function POST(request: NextRequest) {
  try {
    const { userAddress, projectId, qrData } = await request.json();

    if (!userAddress || !projectId || !qrData) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify QR data (in production, add more validation)
    const [alias, timestamp] = qrData.split('-');
    const checkInTime = parseInt(timestamp);
    const now = Date.now();
    
    // QR code valid for 5 minutes
    if (now - checkInTime > 5 * 60 * 1000) {
      return NextResponse.json(
        { success: false, error: 'QR code expired' },
        { status: 400 }
      );
    }

    if (!CS_TOKEN_MINT) {
      return NextResponse.json(
        { success: false, error: 'CS Token not configured' },
        { status: 500 }
      );
    }

    const payer = await getServerKeypair();
    const recipient = new PublicKey(userAddress);
    const mint = new PublicKey(CS_TOKEN_MINT);

    // Mint 5 CS tokens (4 to user, 1 to founder)
    const userSignature = await mintCSTokens(mint, recipient, 4, payer);
    const founderSignature = await mintCSTokens(mint, payer.publicKey, 1, payer);

    return NextResponse.json({
      success: true,
      tokensEarned: 4,
      userSignature,
      founderSignature,
    });
  } catch (error: any) {
    console.error('Check-in Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
