import { combineReducers } from 'redux';
import { ConnectWalletReducer } from './connectWalletReducer';
import { mintNFTStatusReducer } from './mintNFTStatusReducer';

export const rootReducer = combineReducers({
	connectWallet: ConnectWalletReducer,
	mintNFTStatus: mintNFTStatusReducer,
});
