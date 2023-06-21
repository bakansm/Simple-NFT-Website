import { LazyLoadComponent } from 'react-lazy-load-image-component';
import ImgCard from '../../../../components/ImgCard';

export default function NFTImageList(data: any) {
	return (
		<div
			id='collected'
			className='container-fluid d-grid'>
			<div
				className='row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2'
				data-masonry='{"percentPosition": true }'>
				{data.data.map((data: any, index: any) => {
					return (
						<div
							key={index}
							className='col gy-4'>
							<LazyLoadComponent>
								<ImgCard data={data} />
							</LazyLoadComponent>
						</div>
					);
				})}
			</div>
		</div>
	);
}
