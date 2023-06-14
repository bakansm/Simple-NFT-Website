import { Link, useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { metaMask } from '../../../connectors';
import { useDispatch } from 'react-redux';

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { connector, isActive, accounts } = useWeb3React();

	useEffect(() => {
		const temp = localStorage.getItem('walletConnected');
		if (temp && !isActive) {
			const activateWallet = async () => {
				await metaMask.connectEagerly();
			};
			activateWallet();
		}
	}, [connector, isActive]);

	return (
		<nav className='navbar navbar-expand-lg'>
			<div className='container-fluid'>
				<div className='d-flex'>
					<div className='navbar-brand'>
						<Link to={'/'}>
							<img
								src={'/images/logo.png'}
								alt='logo'
								width={24}
								height={24}
							/>
						</Link>
					</div>
					<div className='hstack'>
						<button className='btn nav-item'>
							<Link
								className='nav-link'
								aria-current='page'
								to='/'>
								Home
							</Link>
						</button>
					</div>
				</div>
				<div className='d-flex flex-md-grow-1'>
					<form
						className='flex-grow-1 mx-3'
						role='search'>
						<i className='d-block d-md-none bi bi-search position-static py-2' />
						<i className='d-none d-md-block bi bi-search position-absolute py-2 px-3' />
						<input
							className='form-control ps-5 d-none d-md-block bg-secondary'
							type='text'
							placeholder='Search'
						/>
					</form>
					{isActive ? (
						<div className='dropdown'>
							<button
								className='btn btn-dark'
								data-bs-toggle='dropdown'
								aria-expanded='false'
								type='button'
								style={{
									width: '10rem',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
								}}>
								<span className='pe-2'>
									{accounts && accounts[0]}
								</span>
							</button>
							<ul className='dropdown-menu'>
								<li
									className='h5 ps-3 align-items-center justify-content-center pointer-event'
									onClick={() => navigate('/profile')}
									style={{ cursor: 'pointer' }}>
									<i className='bi bi-person-circle' />{' '}
									Profile
								</li>

								<li
									className='h5 ps-3 align-items-center justify-content-center pointer-event'
									onClick={() =>
										dispatch({ type: 'DISCONNECT' })
									}
									style={{ cursor: 'pointer' }}>
									<i className='bi bi-box-arrow-right' />{' '}
									Logout
								</li>
							</ul>
						</div>
					) : (
						<button
							className='btn btn-danger'
							style={{ minWidth: '10rem' }}
							onClick={() => dispatch({ type: 'CONNECT' })}>
							Connect Wallet
							<i className='bi bi-wallet ps-2' />
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}
