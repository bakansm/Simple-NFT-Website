import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import './scss/Global.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { hooks as metaMaskHooks, metaMask } from './connectors';
import type { MetaMask } from '@web3-react/metamask';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const connector: [MetaMask, Web3ReactHooks][] = [[metaMask, metaMaskHooks]];
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Web3ReactProvider connectors={connector}>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</QueryClientProvider>
			</Provider>
		</Web3ReactProvider>
	</React.StrictMode>
);

reportWebVitals();
