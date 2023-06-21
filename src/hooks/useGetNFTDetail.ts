import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNFTData, getOwnerOf } from '../contracts';

export const useGetNFTDetail = (id: number) => {
	const [data, setData] = useState<any>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(undefined);
	const mintStatus = useSelector<any>((state) => state.mintNFTStatus);

	useEffect(() => {
		const fetchData = async () => {
			let NFTData: any;
			await getNFTData(id)
				.then((value) => {
					NFTData = value;
				})
				.catch((error) => setError(error));
			await getOwnerOf(id)
				.then((value) => {
					setData({
						name: NFTData.name,
						description: NFTData.description,
						imageUrl: `${process.env.REACT_APP_IMAGE_BASE_URL}${NFTData.imageUrl}`,
						owner: value,
					});
				})
				.catch((error) => {
					setData({
						name: NFTData.name,
						description: NFTData.description,
						imageUrl: `${process.env.REACT_APP_IMAGE_BASE_URL}${NFTData.imageUrl}`,
						owner: null,
					});
				});
			setIsLoading(false);
		};
		fetchData();
	}, [id]);

	return { data, isLoading, mintStatus, error };
};
