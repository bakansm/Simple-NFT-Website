import { metaMask } from '../../connectors';

const initialState = {
	isConnected: false,
};

enum ActionType {
	CONNECT = 'CONNECT',
	DISCONNECT = 'DISCONNECT',
}
export interface IInitialState {
	isConnected: boolean;
}

type TAction = {
	type: ActionType;
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
		localStorage.removeItem('walletConnected');
		await metaMask.deactivate();
	} else {
		localStorage.removeItem('walletConnected');
		await metaMask.resetState();
	}
};

export const ConnectWalletReducer = async (
	state: IInitialState = initialState,
	action: TAction
) => {
	switch (action.type) {
		case ActionType.CONNECT:
			await connectWallet();
			return {
				isConnected: true,
			};
		case ActionType.DISCONNECT:
			await disconnectWallet();
			return { isConnected: true };
		default:
			return state;
	}
};
