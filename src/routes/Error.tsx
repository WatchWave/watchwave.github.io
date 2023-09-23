import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div className="w-screen h-screen fc">
			<p className="text-5xl">404 | Page Not Found</p>
			<Link className="mt-5" to={'/'}>
				<Button>Go Home</Button>
			</Link>
		</div>
	);
};

export default Error;
