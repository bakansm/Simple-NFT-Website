import { LazyLoadImage } from 'react-lazy-load-image-component';
import { hooks, metaMask } from '../../../../connectors';
import { useNavigate, useParams } from 'react-router-dom';
import { mintNFT } from '../../../../contracts';
import MintPending from '../MintPending';
import MintFail from '../MintFail';
import MintSuccess from '../MintSuccess';
import { useDispatch } from 'react-redux';

export default function NFTCard(props: any) {
	const { useAccounts } = hooks;
	const accounts = useAccounts();
	const navigate = useNavigate();
	const { nftId } = useParams();
	const dispatch = useDispatch();

	const MintNFT = async () => {
		dispatch({ type: 'PENDING' });
		if (accounts) {
			await mintNFT(accounts[0])
				.then(() => {
					dispatch({ type: 'SUCCESS' });
				})
				.catch((error) => {
					dispatch({ type: 'FAIL' });
					console.log(error);
				});
		} else {
			await metaMask.activate();
			localStorage.setItem('walletConnected', 'true');
		}
	};

	return (
		<div className='card p-0 container-lg shadow h-auto overflow-hidden'>
			{props.mintStatus.isPending && <MintPending />}
			{props.mintStatus.isSuccess && <MintSuccess />}
			{props.mintStatus.isFail && <MintFail />}
			<div className='card-body row border-box p-0 p-lg-3'>
				<div className='col-md g-0 px-lg-3'>
					<LazyLoadImage
						src={props.data.imageUrl}
						alt='img'
						className='card-img'
					/>
				</div>
				<div className='col-md d-flex flex-column justify-content-between g-0 px-lg-3'>
					<div className='card-header'>
						<p className='h3'>NFT #{nftId}</p>
						{props.data.owner && (
							<p className='h6'>Owner: {props.data.owner}</p>
						)}
					</div>
					<div className='px-3 d-flex flex-column justify-content-start py-3 h-100'>
						<div className='card-title h4'>{props.data.name}</div>
						<div className='card-content'>
							{props.data.description}
						</div>
					</div>
					<div className='card-footer d-flex justify-content-between'>
						<button
							className='btn btn-dark'
							onClick={() => navigate('/')}>
							Back to HOME
						</button>
						{!props.data.owner && (
							<button
								className='btn btn-success'
								onClick={MintNFT}>
								Mint NFT
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
