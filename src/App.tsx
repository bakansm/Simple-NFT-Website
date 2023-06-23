import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseLayout from './layouts';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import NFTDetailPage from './pages/NFTDetail';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				index
				element={
					<LazyLoadComponent>
						<BaseLayout>
							<HomePage />
						</BaseLayout>
					</LazyLoadComponent>
				}
			/>
			<Route
				path='profile'
				element={
					<LazyLoadComponent>
						<BaseLayout>
							<ProfilePage />
						</BaseLayout>
					</LazyLoadComponent>
				}
			/>
			<Route
				path='nft-detail/:nftId'
				element={
					<LazyLoadComponent>
						<BaseLayout>
							<NFTDetailPage />
						</BaseLayout>
					</LazyLoadComponent>
				}
			/>
		</Routes>
	);
}

export default App;
