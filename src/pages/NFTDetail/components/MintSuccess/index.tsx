import { useDispatch } from 'react-redux';

export default function MintSuccess() {
	const dispatch = useDispatch();

	return (
		<div className='w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column position-absolute top-0 left-0'>
			<div>
				<i className='bi bi-check-circle-fill text-success display-5' />
			</div>
			<div className='my-3'>
				<p>NFT is minted successfully</p>
			</div>
			<button
				className='btn btn-success'
				onClick={() => dispatch({ type: 'RESET' })}>
				Confirm
			</button>
		</div>
	);
}
