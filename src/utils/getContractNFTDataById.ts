import { getNFTImageUrlMetadata, getOwnerOf } from '../contracts';

export const getContractNFTDataById = async (tokenId: number) => {
	const imageUrlMetadata = await getNFTImageUrlMetadata(tokenId);
	const owner = await getOwnerOf(tokenId);
	const data = {
		imageUrl: `https://ipfs.io/ipfs/${imageUrlMetadata}`,
		owner: owner,
	};
	return data;
};
