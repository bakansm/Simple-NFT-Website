import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNFTImageUrlMetadata, getOwnerOf, mintNFT } from '../../contracts';
import PageLoadingSpinner from '../../components/common/PageLoadingSpinner';
import { hooks } from '../../connectors';
import { metaMask } from '../../connectors';

const { useAccounts } = hooks;

export default function NFTDetailPage() {
	const accounts = useAccounts();
	const { nftId } = useParams();
	const [data, setData] = useState<any>(undefined);
	const [isPending, setIsPending] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const imageUrl = await getNFTImageUrlMetadata(Number(nftId));
			await getOwnerOf(Number(nftId))
				.then((value) => {
					setData({
						imageUrl: `https://ipfs.io/ipfs/${imageUrl}`,
						owner: value,
						mintable: false,
					});
				})
				.catch((error) => {
					setData({
						imageUrl: `https://ipfs.io/ipfs/${imageUrl}`,
						owner: null,
						mintable: true,
					});
				});
			setIsLoading(false);
		};
		fetchData();
	}, [nftId]);

	return (
		<>
			{isLoading ? (
				<main
					className='container-fluid d-flex align-items-center justify-content-center flex-column'
					style={{ height: '92vh' }}>
					<PageLoadingSpinner />
				</main>
			) : (
				data && (
					<main
						className='w-100 d-flex align-items-xl-center justify-content-center'
						style={{ height: '92vh' }}>
						<div
							className='card overflow-hidden'
							style={{ boxShadow: '0px 0px 16px 8px #cacaca' }}>
							{isPending && (
								<div
									className='w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column'
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
									}}>
									<div
										className='spinner-border my-3'
										role='status'></div>
									<div className='my-3'>
										<p>Pending transaction...</p>
									</div>
								</div>
							)}
							<img
								src={data.imageUrl}
								alt='img'
								className='card-img-top'
								loading='lazy'
								style={{
									objectFit: 'scale-down',
									height: 'auto',
								}}
							/>
							<div className='card-body text-black'>
								<h5 className='card-title'>NFT #{nftId}</h5>
								<hr className='my-4 border-light' />
								{data.owner && (
									<p className='card-text'>
										NFT Owner: {data.owner}
									</p>
								)}
								<div className='d-flex justify-content-between'>
									<button
										className='btn btn-dark'
										onClick={() => navigate('/')}>
										Back to HOME
									</button>
									{data.mintable && (
										<button
											className='btn btn-success'
											onClick={async () => {
												setIsPending(true);
												if (accounts) {
													await mintNFT(accounts[0])
														.then(() => {
															alert(
																'Mint successfully'
															);
															setIsPending(false);
															navigate(0);
														})
														.catch((error) =>
															console.log(error)
														);
												} else {
													await metaMask.activate();
												}
											}}>
											Mint NFT
										</button>
									)}
								</div>
							</div>
						</div>
					</main>
				)
			)}
		</>
	);
}
