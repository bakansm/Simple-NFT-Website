import { LazyLoadComponent } from 'react-lazy-load-image-component';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImgCard from '../../../../components/ImgCard';

export default function NFTImageList(props: any) {
	return (
		<InfiniteScroll
			dataLength={props.dataLength}
			next={props.fetchMoreData}
			hasMore={props.hasMore}
			loader={
				<div className='w-100 d-flex align-items-center justify-content-center'>
					<div className='spinner-border my-3' />
				</div>
			}
			endMessage={
				<p className='text-center'>
					<b>No more NFT to load</b>
				</p>
			}>
			<div
				className='row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1'
				data-masonry='{"percentPosition": true }'>
				{props.data.map((dataTemp: any, index: any) => (
					<div
						key={index}
						className='col cards gy-4'>
						<LazyLoadComponent>
							<ImgCard data={dataTemp} />
						</LazyLoadComponent>
					</div>
				))}
			</div>
		</InfiniteScroll>
	);
}
