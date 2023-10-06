import Home from '@/routes/Home';
import Search from '@/routes/Search';
import Error from './routes/Error';
import WatchTV from './routes/WatchTV';
import WatchMovie from './routes/WatchMovie';
import Actor from './routes/Actor';
import Tags from './routes/Tags';

import { Route, Routes } from 'react-router-dom';

const r = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/watch/tv/:id" element={<WatchTV />} />
			<Route path="/watch/movie/:id" element={<WatchMovie />} />
			<Route path="/search/:query" element={<Search />} />
			<Route path="/search/" element={<Search />} />
			<Route path="/genres/:genre" element={<Tags />} />
			<Route path="/actor/:actor" element={<Actor />} />
			<Route path="*" element={<Error />} />
		</Routes>
	);
};

export default r;
