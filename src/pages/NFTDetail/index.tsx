import { useParams } from 'react-router-dom';
import PageLoadingSpinner from '../../components/PageLoadingSpinner';
import { useGetNFTDetail } from '../../hooks/useGetNFTDetail';
import NFTCard from './components/NFTCard';
import { useSelector } from 'react-redux';

export default function NFTDetailPage() {
	const { nftId } = useParams();
	const { data, isLoading, error } = useGetNFTDetail(Number(nftId));
	const mintNFTStatus = useSelector<any>((state) => state.mintNFTStatus);

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
					<main className='h-100 container-fluid d-flex align-items-xl-center justify-content-center py-md-5'>
						<NFTCard
							data={data}
							mintNFTStatus={mintNFTStatus}
						/>
					</main>
				)
			)}
		</>
	);
}
