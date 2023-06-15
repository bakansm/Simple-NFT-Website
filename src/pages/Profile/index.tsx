import { hooks } from '../../connectors';
import '../../scss/overlay.scss';
import ImgCard from '../../components/common/ImgCard';
import { useEffect, useState } from 'react';
import { getAllContractNFTData } from '../../utils/getAllContractNFTData';
import PageLoadingSpinner from '../../components/common/PageLoadingSpinner';
import { getNFTBalance, getOwnerOf } from '../../contracts';

const { useAccounts, useIsActive } = hooks;

export default function ProfilePage() {
	const accounts = useAccounts();
	const isActive = useIsActive();

	const [data, setData] = useState<any>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [balance, setBalance] = useState<number>(0);

	useEffect(() => {
		if (accounts) {
			const fetchData = async () => {
				await getAllContractNFTData()
					.then(async (value) => {
						if (value) {
							const dataList = [];
							for (let i of value) {
								const owner = await getOwnerOf(i.id);
								if (owner === accounts[0])
									dataList.push({ ...i, owner: owner });
							}
							setData(dataList);
							setIsLoading(false);
						}
					})
					.catch((error) => console.log(error));
			};
			setIsLoading(true);
			fetchData();

			const fetchBalance = async () => {
				const balance = await getNFTBalance(accounts[0]);
				setBalance(parseInt(balance.toString()));
			};
			fetchBalance();
		}
	}, [accounts]);
	return (
		<>
			{!isActive ? (
				<div
					className='container-fluid d-flex align-items-center justify-content-center'
					style={{ height: '93vh' }}>
					<p className='display-3'>Please connect to the wallet!</p>
				</div>
			) : (
				<div className='container-fluid p-5'>
					<div className='d-flex align-items-center justify-content-center mb-5'>
						<img
							src={'/images/logo.png'}
							alt='avatar'
							width={120}
							height={120}
						/>
					</div>
					<p className='h3 text-success text-center'>
						Address: {accounts}
					</p>
					<p className='h3 text-success text-center'>
						Total NFTs: {balance}
					</p>

					<hr className='my-4 border-light' />
					{isLoading ? (
						<main
							className='container-fluid d-flex align-items-center justify-content-center flex-column'
							style={{ height: '92vh' }}>
							<PageLoadingSpinner />
						</main>
					) : (
						<div
							id='collected'
							className='container-fluid d-grid'>
							<div
								className='row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2'
								data-masonry='{"percentPosition": true }'>
								{data &&
									data.map((data: any, index: any) => {
										return (
											<div
												key={index}
												className='col gy-4'>
												<ImgCard data={data} />
											</div>
										);
									})}
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}
