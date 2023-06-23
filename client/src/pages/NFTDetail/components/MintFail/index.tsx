import { useDispatch } from 'react-redux';

export default function MintFail() {
	const dispatch = useDispatch();

	return (
		<div className='w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column position-absolute top-0 left-0'>
			<div>
				<i className='bi bi-x-circle-fill text-danger display-5' />
			</div>
			<div className='my-3'>
				<p>NFT is minted failed</p>
			</div>
			<button
				className='btn btn-danger'
				onClick={() => dispatch({ type: 'RESET' })}>
				Cancel
			</button>
		</div>
	);
}
