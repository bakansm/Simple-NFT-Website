import { metaMask } from '../../connectors';

const CONNECT = 'CONNECT';
const DISCONNECT = 'DISCONNECT';

const initialState = {
	isConnected: false,
};

export interface IInitialState {
	isConnected: boolean;
}

type TAction = {
	type: 'CONNECT' | 'DISCONNECT';
	payload?: any;
};

const connectWallet = async () => {
	if (window.ethereum) {
		await metaMask.activate();
		localStorage.setItem('walletConnected', 'true');
	} else alert('Please install Ethereum Wallet');
};

const disconnectWallet = async () => {
	if (metaMask?.deactivate) {
		await metaMask.deactivate();
		localStorage.removeItem('walletConnected');
	} else {
		await metaMask.resetState();
		localStorage.removeItem('walletConnected');
	}
};

export const ConnectWalletReducer = async (
	state: IInitialState = initialState,
	action: TAction
) => {
	switch (action.type) {
		case CONNECT:
			await connectWallet();
			return {
				isConnected: true,
			};
		case DISCONNECT:
			await disconnectWallet();
			return { isConnected: true };
		default:
			return state;
	}
};
