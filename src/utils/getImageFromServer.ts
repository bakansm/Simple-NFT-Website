import axios from 'axios';

export const getImageFromServer = async (listLength: number) => {
	const list: number[] = [];
	for (let i = 0; i < listLength; i++) {
		list.push(i + 1);
	}
	return await axios
		.all(
			list.map(async (id) => {
				return axios.get(
					`${process.env.REACT_APP_NFT_BASE_API_URL}${id.toString()}`
				);
			})
		)
		.then(async (responses) => {
			const contractNFTList: any[] = [];
			for (let i of responses) {
				contractNFTList.push({
					id: i.data.tokenId,
					imageUrl: `${
						process.env.REACT_APP_IMAGE_BASE_URL
					}${i.data.image.slice(7)}`,
				});
			}
			return contractNFTList;
		})
		.catch((error) => error);
};
