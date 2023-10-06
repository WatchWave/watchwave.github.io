import useRecordAnalytics from '@/hooks/useRecordAnalytics';
import { Button } from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';

const Error = ({ type }: { type?: string }) => {
	const location = useLocation();
	useRecordAnalytics(location);

	if (type === '404')
		return (
			<div className="w-screen h-screen fc">
				<p className="text-3xl sm:text-5xl">404 | Page Not Found</p>
				<Link className="mt-5" to={'/'} aria-label="home">
					<Button>Go Home</Button>
				</Link>
			</div>
		);

	return (
		<div className="w-screen h-screen fc">
			<p className="text-3xl sm:text-5xl">Something went wrong</p>
			<Link className="mt-5" to={'/'} aria-label="home">
				<Button>Go Home</Button>
			</Link>
		</div>
	);
};

export default Error;
