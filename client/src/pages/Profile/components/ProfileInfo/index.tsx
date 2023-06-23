import { LazyLoadImage } from 'react-lazy-load-image-component';
import avatar from '../../assets/images/logo.png';
import { hooks } from '../../../../connectors';

export default function ProfileInfo(props: any) {
	const { useAccounts } = hooks;

	const accounts = useAccounts();

	return (
		<>
			<div className='d-flex align-items-center justify-content-center mb-5'>
				<LazyLoadImage
					src={avatar}
					alt='avatar'
					className='avatar'
				/>
			</div>
			<p className='h3 text-success text-center'>Address: {accounts}</p>
			<p className='h3 text-success text-center'>
				Total NFTs: {props.balance}
			</p>
		</>
	);
}
