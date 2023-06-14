import Header from '../../components/layouts/Header';

export default function BaseLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='container-fluid'>
			<Header />
			{children}
		</div>
	);
}
