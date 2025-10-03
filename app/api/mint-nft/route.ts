import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { getServerKeypair } from '@/utils/solana';
import { mintMilestoneNFT } from '@/utils/nft';

export async function POST(request: NextRequest) {
  try {
    const { recipientAddress, projectName, milestone, teamMembers } = await request.json();

    if (!recipientAddress || !projectName || !milestone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const payer = await getServerKeypair();
    const recipient = new PublicKey(recipientAddress);

    const nftAddress = await mintMilestoneNFT(
      payer,
      recipient,
      projectName,
      milestone,
      teamMembers || []
    );

    return NextResponse.json({
      success: true,
      nftAddress,
      explorerUrl: `https://explorer.solana.com/address/${nftAddress}?cluster=${process.env.NEXT_PUBLIC_SOLANA_NETWORK}`,
    });
  } catch (error: any) {
    console.error('NFT Minting Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
