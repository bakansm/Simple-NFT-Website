import { useNavigate } from 'react-router-dom';
import '../../scss/overlay.scss';
import { memo } from 'react';
import {
	LazyLoadComponent,
	LazyLoadImage,
} from 'react-lazy-load-image-component';
import { useGetOwner } from '../../hooks/useGetOwner';

export default memo(function ImgCard({ data }: any) {
	const navigate = useNavigate();

	const owner = useGetOwner(data.id);

	return (
		<>
			<div className='card overflow-hidden overlay'>
				<LazyLoadImage
					className='card-img-bottom hover-img'
					src={data.imageUrl}
					alt={data.alt}
				/>
				<span className='badge bg-primary position-absolute top-0 left-0 m-2 py-2 px-3'>
					# {data.id}
				</span>
				<div
					className='overlay-hover p-2'
					onClick={() => navigate(`/nft-detail/${data.id}`)}>
					<button className='btn btn-danger'>Save</button>
					{owner ? (
						<LazyLoadComponent>
							<button className='btn btn-dark text-nowrap overflow-hidden text-truncate w-100'>
								<i className='bi bi-person' /> {owner}
							</button>
						</LazyLoadComponent>
					) : (
						<LazyLoadComponent>
							<button className='btn btn-success w-100'>
								<i className='bi bi-box' /> Mintable
							</button>
						</LazyLoadComponent>
					)}
				</div>
			</div>
		</>
	);
});
