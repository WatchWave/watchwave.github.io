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

const AnimatedRoutes = () => {
	const location = useLocation();
	return (
		<>
			<Palette />
			<div className="sm:block hidden">
				<Toaster />
			</div>
			<AnimatePresence mode="wait">
				<Routes key={location.pathname} location={location}>
					<Route path="/" element={<Home />} />
					<Route path="/watch/tv/:id" element={<WatchTV />} />
					<Route path="/watch/movie/:id" element={<WatchMovie />} />
					<Route path="/search/:query" element={<Search />} />
					<Route path="/search/" element={<Search />} />
					<Route path="/actor/:actor" element={<Actor />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default AnimatedRoutes;
