import { useEffect, useState } from 'react';
import { getAllContractNFTData } from '../utils/getAllContractNFTData';
import { getNFTBalance, getOwnerOf } from '../contracts';

export const useGetAccountNFT = (accounts: string[] | undefined) => {
	const [data, setData] = useState<any>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [balance, setBalance] = useState<number>(0);
	const [error, setError] = useState<any>(undefined);

	useEffect(() => {
		if (accounts) {
			const fetchData = async () => {
				await getAllContractNFTData()
					.then(async (value) => {
						if (value) {
							const dataList = [];
							for (let i of value) {
								const owner = await getOwnerOf(i.id);
								if (owner === accounts[0])
									dataList.push({ ...i, owner: owner });
							}
							setData(dataList);
							setIsLoading(false);
						}
					})
					.catch((error) => setError(error));
			};
			setIsLoading(true);
			fetchData();

			const fetchBalance = async () => {
				await getNFTBalance(accounts[0]).then((value) => {
					setBalance(parseInt(value.toString()));
				});
			};
			fetchBalance();
		}
	}, [accounts]);

	return { data, isLoading, balance, error };
};
