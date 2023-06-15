import { useEffect, useState } from 'react';
import ImgCard from '../../components/common/ImgCard';
import PageLoadingSpinner from '../../components/common/PageLoadingSpinner';
import LazyLoad from 'react-lazy-load';
import { getImageFromServer } from '../../utils/getAllContractNFTData';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function HomePage() {
	const [data, setData] = useState<any[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [dataLength, setDataLength] = useState<number>(30);
	const [hasMore, setHasMore] = useState<boolean>(true);

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const fetchMoreData = async () => {
		await sleep(1000);
		setDataLength((prev) => prev + 10);
	};

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
					console.log(error);
				});
		};
		fetchData(dataLength);
	}, [dataLength]);

	return (
		<>
			{isLoading ? (
				<main
					className='container-fluid d-flex align-items-center justify-content-center flex-column'
					style={{ height: '92vh' }}>
					<PageLoadingSpinner />
				</main>
			) : (
				<main className='container-fluid d-grid px-lg-5 px-sm-3 pb-4'>
					<InfiniteScroll
						dataLength={dataLength}
						next={fetchMoreData}
						hasMore={hasMore}
						loader={
							<div className='w-100 d-flex align-items-center justify-content-center'>
								<div
									className='spinner-border my-3'
									role='status'
								/>
							</div>
						}
						endMessage={
							<p style={{ textAlign: 'center' }}>
								<b>No more NFT to load</b>
							</p>
						}>
						<div
							className='row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1'
							data-masonry='{"percentPosition": true }'>
							{data &&
								data.map((dataTemp: any, index: any) => (
									<div
										key={index}
										className='col cards gy-4'>
										<LazyLoad>
											<ImgCard data={dataTemp} />
										</LazyLoad>
									</div>
								))}
						</div>
					</InfiniteScroll>
				</main>
			)}
		</>
	);
}
