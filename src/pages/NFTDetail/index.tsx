import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNFTData, getOwnerOf, mintNFT } from '../../contracts';
import PageLoadingSpinner from '../../components/common/PageLoadingSpinner';
import { hooks } from '../../connectors';
import { metaMask } from '../../connectors';

const { useAccounts } = hooks;

export default function NFTDetailPage() {
	const accounts = useAccounts();
	const { nftId } = useParams();
	const [data, setData] = useState<any>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [mintStatus, setMintStatus] = useState<any>({
		isPending: undefined,
		isSuccess: undefined,
		isFail: undefined,
	});

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			let NFTData: any;
			await getNFTData(Number(nftId))
				.then((value) => {
					NFTData = value;
				})
				.catch((error) => console.log(error));
			await getOwnerOf(Number(nftId))
				.then((value) => {
					setData({
						name: NFTData.name,
						description: NFTData.description,
						imageUrl: `https://ipfs.io/ipfs/${NFTData.imageUrl}`,
						owner: value,
					});
				})
				.catch((error) => {
					setData({
						name: NFTData.name,
						description: NFTData.description,
						imageUrl: `https://ipfs.io/ipfs/${NFTData.imageUrl}`,
						owner: null,
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
					<main className='container-fluid d-flex align-items-xl-center justify-content-center py-5'>
						<div
							className='card overflow-hidden'
							style={{
								boxShadow: '0px 0px 16px 8px #cacaca',
								width: '600px',
							}}>
							{mintStatus.isPending && (
								<div
									className='w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column'
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
									}}>
									<div
										className='spinner-border my-3 display-5'
										role='status'
									/>
									<div className='my-3'>
										<p>Pending transaction...</p>
									</div>
								</div>
							)}
							{mintStatus.isSuccess && (
								<div
									className='w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column'
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
									}}>
									<div>
										<i className='bi bi-check-circle-fill text-success display-5' />
									</div>
									<div className='my-3'>
										<p>NFT is minted successfully</p>
									</div>
									<button
										className='btn btn-success'
										onClick={() => navigate(0)}>
										Confirm
									</button>
								</div>
							)}
							{mintStatus.isFail && (
								<div
									className='w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column'
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
									}}>
									<div>
										<i className='bi bi-x-circle-fill text-danger display-5' />
									</div>
									<div className='my-3'>
										<p>NFT is minted failed</p>
									</div>
									<button
										className='btn btn-danger'
										onClick={() => navigate(0)}>
										Cancel
									</button>
								</div>
							)}
							<div className='card-header'>
								<p className='h3'>NFT #{nftId}</p>
								{data.owner && (
									<p className='h6'>Owner: {data.owner}</p>
								)}
							</div>
							<div className='p-3'>
								<img
									src={data.imageUrl}
									alt='img'
									className='card-img'
									loading='lazy'
									style={{
										objectFit: 'scale-down',
										height: 'auto',
									}}
								/>
							</div>
							<div className='d-flex flex-column px-3'>
								<div className='card-body text-black'>
									<p className='card-title h4'>{data.name}</p>
									<p className='card-content'>
										{data.description}
									</p>
								</div>
							</div>
							<div className='d-flex justify-content-between card-footer'>
								<button
									className='btn btn-dark'
									onClick={() => navigate('/')}>
									Back to HOME
								</button>
								{!data.owner && (
									<button
										className='btn btn-success'
										onClick={async () => {
											setMintStatus({
												...mintStatus,
												isPending: true,
											});
											if (accounts) {
												await mintNFT(accounts[0])
													.then(() => {
														setMintStatus({
															isPending: false,
															isSuccess: true,
															isError: false,
														});
													})

													.catch((error) => {
														setMintStatus({
															isPending: false,
															isSuccess: false,
															isError: true,
														});
														console.log(error);
													});
											} else {
												await metaMask.activate();
												localStorage.setItem(
													'walletConnected',
													'true'
												);
											}
										}}>
										Mint NFT
									</button>
								)}
							</div>
						</div>
					</main>
				)
			)}
		</>
	);
}
