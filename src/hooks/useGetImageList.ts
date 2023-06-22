import { useCallback, useEffect, useState } from 'react';
import { getImageFromServer } from '../utils/getImageFromServer';

export const useFetchMoreData = () => {
	const [dataLength, setDataLength] = useState<number>(30);
	const [data, setData] = useState<any[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const sleep = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const fetchMoreData = useCallback(async () => {
		await sleep(1000);
		setDataLength((prev) => prev + 10);
	}, []);

	useEffect(() => {
		const fetchData = async (listLength: number) => {
			await getImageFromServer(listLength)
				.then((value) => {
					if (value) {
						setData(value);
						setIsLoading(false);
					}
				})
				.catch((error) => {
					setHasMore(false);
				});
		};
		fetchData(dataLength);
	}, [dataLength]);

	return { data, isLoading, hasMore, fetchMoreData, dataLength };
};
