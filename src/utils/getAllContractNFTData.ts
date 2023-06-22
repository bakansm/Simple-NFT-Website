import axios from 'axios';

export const getAllContractNFTData = async (NFTIdsList: number[]) => {
	return await axios
		.all(
			NFTIdsList.map(async (id) => {
				return axios.get(
					`https://www.galverse.art/api/metadata/${id.toString()}`
				);
			})
		)
		.then(async (responses) => {
			const contractNFTList: any[] = [];
			for (let i of responses) {
				contractNFTList.push({
					id: i.data.tokenId,
					imageUrl: `https://ipfs.io/ipfs/${i.data.image.slice(7)}`,
				});
			}
			return contractNFTList;
		})
		.catch((error) => error);
};


