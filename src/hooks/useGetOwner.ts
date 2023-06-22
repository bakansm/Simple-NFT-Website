import { useEffect, useState } from 'react';
import { getAmountOfMintedNFT, getOwnerOf } from '../contracts';

export const useGetOwner = (id: number) => {
	const [owner, setOwner] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchOwner = async () => {
			const AmountOfMintedNFT: number = await getAmountOfMintedNFT();
			if (AmountOfMintedNFT > id) {
				await getOwnerOf(id).then((value) => {
					if (value) {
						setOwner(value);
					}
				});
			}
		};
		fetchOwner();
	}, [id]);

	return owner;
};
