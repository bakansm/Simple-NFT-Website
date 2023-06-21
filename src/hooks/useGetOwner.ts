import { useEffect, useState } from 'react';
import { getOwnerOf } from '../contracts';

export const useGetOwner = (id: number) => {
	const [owner, setOwner] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchOwner = async () => {
			await getOwnerOf(id)
				.then((value) => {
					if (value) {
						setOwner(value);
					}
				})
				.catch((error) => {
					console.log(error);
					return;
				});
		};
		fetchOwner();
	}, [id]);

	return owner;
};
