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

	const fetchMoreData = () => {
		setDataLength(dataLength + 10);
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
				.catch((error) => console.log(error));
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
						dataLength={dataLength} //This is important field to render the next data
						next={fetchMoreData}
						hasMore={true}
						loader={<h4>Loading...</h4>}
						endMessage={
							<p style={{ textAlign: 'center' }}>
								<b>Yay! You have seen it all</b>
							</p>
						}>
						<div
							className='row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1'
							data-masonry='{"percentPosition": true }'>
							{data &&
								data.map((data: any, index: any) => (
									<div
										key={index}
										className='col cards gy-4'>
										<LazyLoad>
											<ImgCard data={data} />
										</LazyLoad>
									</div>
								))}
						</div>
						{/* <div className='container-fluid d-flex align-items-center justify-content-center'>
						<button onClick={fetchMoreData}>Load more</button>
					</div> */}
					</InfiniteScroll>
				</main>
			)}
		</>
	);
}
