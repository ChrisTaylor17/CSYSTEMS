import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';

const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
const RPC_ENDPOINT = NETWORK === 'mainnet-beta' 
  ? 'https://api.mainnet-beta.solana.com' 
  : 'https://api.devnet.solana.com';

export async function mintMilestoneNFT(
  payer: Keypair,
  recipient: PublicKey,
  projectName: string,
  milestone: string,
  teamMembers: string[]
): Promise<string> {
  const connection = new Connection(RPC_ENDPOINT);
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(payer));

  const { nft } = await metaplex.nfts().create({
    uri: JSON.stringify({
      name: `${projectName} - ${milestone}`,
      description: `Milestone NFT for ${projectName}. Team: ${teamMembers.join(', ')}`,
      image: `https://api.dicebear.com/7.x/shapes/svg?seed=${projectName}`,
      attributes: [
        { trait_type: 'Project', value: projectName },
        { trait_type: 'Milestone', value: milestone },
        { trait_type: 'Team Size', value: teamMembers.length.toString() },
      ],
    }),
    name: `${projectName} Milestone`,
    sellerFeeBasisPoints: 500,
    tokenOwner: recipient,
  });

  return nft.address.toBase58();
}
