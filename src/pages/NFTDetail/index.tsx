import { useParams } from 'react-router-dom';
import PageLoadingSpinner from '../../components/PageLoadingSpinner';
import { useGetNFTDetail } from '../../hooks/useGetNFTDetail';
import NFTCard from './components/NFTCard';

export default function NFTDetailPage() {
	const { nftId } = useParams();
	const { data, isLoading, mintStatus, error } = useGetNFTDetail(
		Number(nftId)
	);

	return (
		<>
			{error ? (
				<main className='container-fluid d-flex align-items-center justify-content-center flex-column'>
					<h1>Cannot get NFT now, please try again few minutes</h1>
				</main>
			) : isLoading ? (
				<main className='container-fluid d-flex align-items-center justify-content-center flex-column'>
					<PageLoadingSpinner />
				</main>
			) : (
				data && (
					<main className='container-fluid d-flex align-items-xl-center justify-content-center py-lg-5'>
						<NFTCard
							data={data}
							mintStatus={mintStatus}
						/>
					</main>
				)
			)}
		</>
	);
}
