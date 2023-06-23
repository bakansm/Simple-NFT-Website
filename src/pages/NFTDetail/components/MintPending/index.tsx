export default function MintPending() {
	return (
		<div className='w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column position-absolute top-0 left-0'>
			<div
				className='spinner-border my-3 display-5'
				role='status'
			/>
			<div className='my-3'>
				<p>Pending transaction...</p>
			</div>
		</div>
	);
}
