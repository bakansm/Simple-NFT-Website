import axios from 'axios';
import { getAllNFTIds } from '../contracts';

export const getAllContractNFTData = async () => {
	const NFTIdsList = await getAllNFTIds();
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
					// owner: owner,
				});
			}
			return contractNFTList;
		})
		.catch((error) => console.log(error));
};

export const getImageFromServer = async (listLength: number) => {
	const list: number[] = [];
	for (let i = 0; i < listLength; i++) {
		list.push(i + 1);
	}
	return await axios
		.all(
			list.map(async (id) => {
				return axios.get(
					`https://www.galverse.art/api/metadata/${id.toString()}`
				);
			})
		)
		.then(async (responses) => {
			const contractNFTList: any[] = [];
			for (let i of responses) {
				// const owner = await getOwnerOf(i.data.tokenId);
				contractNFTList.push({
					id: i.data.tokenId,
					imageUrl: `https://ipfs.io/ipfs/${i.data.image.slice(7)}`,
					// owner: owner,
				});
			}
			return contractNFTList;
		})
		.catch((error) => console.log(error));
};
