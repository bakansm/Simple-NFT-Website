export default function PageLoadingSpinner() {
	return (
		<>
			<div
				className='container spinner-border mb-5'
				style={{ height: '5rem', width: '5rem' }}
				role='status'
			/>

			<strong className='display-3'>Loading...</strong>
		</>
	);
}
