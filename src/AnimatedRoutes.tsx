import Home from '@/routes/Home';
import Search from '@/routes/Search';
import Error from './routes/Error';
import { Toaster } from 'react-hot-toast';
import Palette from './components/Palette';
import WatchTV from './routes/WatchTV';
import WatchMovie from './routes/WatchMovie';
import Actor from './routes/Actor';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Settings from './routes/Settings';
import Warning from './components/Warning';
import Download from './routes/Download';

const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<>
			<Palette />
			<div className="sm:block hidden">
				<Toaster />
			</div>
			{localStorage.warningCleared === undefined || localStorage.warningCleared === 'false' ? <Warning /> : null}
			<AnimatePresence mode="wait">
				<Routes key={location.pathname} location={location}>
					<Route path="/" element={<Home />} errorElement={<Error />} />
					<Route path="/watch/tv/:id" element={<WatchTV />} errorElement={<Error />} />
					<Route path="/watch/movie/:id" element={<WatchMovie />} errorElement={<Error />} />
					<Route path="/search/:query" element={<Search />} errorElement={<Error />} />
					<Route path="/search/" element={<Search />} errorElement={<Error />} />
					<Route path="/download/" element={<Download />} errorElement={<Error />} />
					<Route path="/actor/:actor" element={<Actor />} errorElement={<Error />} />
					<Route path="/settings" element={<Settings />} errorElement={<Error />} />
					<Route path="*" element={<Error type="404" />} />
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default AnimatedRoutes;
