import PageLoadingSpinner from '../../components/PageLoadingSpinner';
import NFTImageList from './components/NFTImageList';
import { useFetchMoreData } from '../../hooks/useGetImageList';
import { hooks } from '../../connectors';
import { filterAccountNFT } from '../../contracts';

const { useAccounts } = hooks;
export default function HomePage() {
	const { data, isLoading, hasMore, fetchMoreData, dataLength } =
		useFetchMoreData();

	const account = useAccounts();

	const onClickHandle = (account: any) => {
		if (account) {
			filterAccountNFT(account[0]);
		}
	};

	return (
		<>
			{isLoading ? (
				<main className='container-fluid d-flex align-items-center justify-content-center flex-column'>
					<PageLoadingSpinner />
				</main>
			) : (
				<main className='container-fluid d-grid px-lg-5 px-sm-3 pb-4'>
					<NFTImageList
						dataLength={dataLength}
						hasMore={hasMore}
						fetchMoreData={fetchMoreData}
						data={data}
					/>
				</main>
			)}
		</>
	);
}
