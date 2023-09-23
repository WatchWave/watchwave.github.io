import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="fr z-10 justify-between fixed top-0 h-16 bg-[hsl(var(--secondary))] shadow-sm font-poppins w-screen" role="navigation">
			<Link to="/" className="pl-8">
				<img src="/favicon.svg" alt="WatchWave" className="h-10" />
			</Link>
			<div className="pr-8 fr gap-3">
				<Link to="/" className="p-4">
					Home
				</Link>
				<Link to="/search" className="p-4">
					Search
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
