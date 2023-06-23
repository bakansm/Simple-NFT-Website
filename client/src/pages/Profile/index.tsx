import { hooks } from '../../connectors';
import '../../scss/overlay.scss';
import PageLoadingSpinner from '../../components/PageLoadingSpinner';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import './scss/avatar.modules.scss';
import NFTImageList from './components/NFTImageList';
import ProfileInfo from './components/ProfileInfo';
import { useGetAccountNFT } from '../../hooks/useGetAccountNFT';

const { useAccounts, useIsActive } = hooks;
export default function ProfilePage() {
	const accounts = useAccounts();
	const isActive = useIsActive();

	const { data, isLoading, balance } = useGetAccountNFT(accounts);

	return (
		<>
			{!isActive ? (
				<div className='container-fluid d-flex align-items-center justify-content-center'>
					<p className='display-3'>Please connect to the wallet!</p>
				</div>
			) : (
				<div className='container-fluid p-5'>
					<ProfileInfo balance={balance} />
					{isLoading ? (
						<main className='container-fluid d-flex align-items-center justify-content-center flex-column mt-5'>
							<PageLoadingSpinner />
						</main>
					) : (
						<LazyLoadComponent>
							<NFTImageList data={data} />
						</LazyLoadComponent>
					)}
				</div>
			)}
		</>
	);
}
