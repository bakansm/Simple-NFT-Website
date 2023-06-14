import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import NFTDetailPage from './pages/NFTDetail';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				index
				element={
					<BaseLayout>
						<HomePage />
					</BaseLayout>
				}
			/>
			<Route
				path='profile'
				element={
					<BaseLayout>
						<ProfilePage />
					</BaseLayout>
				}
			/>
			<Route
				path='nft-detail/:nftId'
				element={
					<BaseLayout>
						<NFTDetailPage />
					</BaseLayout>
				}
			/>
		</Routes>
	);
}

export default App;
