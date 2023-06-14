import { combineReducers } from 'redux';
import { ConnectWalletReducer } from './connectWalletReducer';

export const rootReducer = combineReducers({
	connectWallet: ConnectWalletReducer,
});
