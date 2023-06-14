import { useNavigate } from 'react-router-dom';
import '../../../scss/overlay.scss';
import LazyLoad from 'react-lazy-load';
import { getOwnerOf } from '../../../contracts';
import { useEffect, useState } from 'react';

export default function ImgCard({ data }: any) {
	const navigate = useNavigate();
	const [owner, setOwner] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchOwner = async () => {
			await getOwnerOf(data.id)
				.then((value) => {
					if (value) {
						setOwner(value);
					}
				})
				.catch((error) => {});
		};
		if (!data.owner) {
			fetchOwner();
		} else {
			setOwner(data.owner);
		}
	}, [data]);

	return (
		<>
			<div className='card overflow-hidden overlay'>
				<LazyLoad>
					<img
						className='card-img-bottom hover-img'
						src={data.imageUrl}
						alt={data.alt}
						loading='lazy'
						style={{
							objectFit: 'scale-down',
							height: 'auto',
						}}
					/>
				</LazyLoad>
				<span
					className='badge bg-primary'
					style={{
						position: 'absolute',
						top: '1rem',
						left: '1rem',
					}}>
					# {data.id}
				</span>
				<div
					className='overlay-hover'
					onClick={() => navigate(`/nft-detail/${data.id}`)}>
					<button
						className='btn btn-danger'
						style={{
							position: 'absolute',
							right: '1rem',
							top: '1rem',
						}}>
						Save
					</button>
					{owner ? (
						<LazyLoad>
							<button
								className='btn btn-dark'
								style={{
									width: 'calc(100% - 2rem)',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									position: 'absolute',
									left: '1rem',
									bottom: '1rem',
								}}>
								<i className='bi bi-person' /> {owner}
							</button>
						</LazyLoad>
					) : (
						<LazyLoad>
							<button
								className='btn btn-success'
								style={{
									width: 'calc(100% - 2rem)',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									position: 'absolute',
									left: '1rem',
									bottom: '1rem',
								}}>
								<i className='bi bi-box' /> Mintable
							</button>
						</LazyLoad>
					)}
				</div>
			</div>
		</>
	);
}
