import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/routes/Home';
import Watch from '@/routes/Watch';
import Search from '@/routes/Search';
import Error from './routes/Error';
import { Toaster } from 'react-hot-toast';
import Palette from './components/Palette';
import WatchTV from './routes/WatchTV';
import WatchMovie from './routes/WatchMovie';
const App = () => {
	const Router = createBrowserRouter([
		{
			path: '/',

			element: (
				<>
					<Palette />
					<Home />
				</>
			),
		},
		{
			path: '/watch/tv/:id',

			element: (
				<>
					<Palette />
					<WatchTV />
				</>
			),
		},
		{
			path: '/watch/movie/:id',
			element: (
				<>
					<Palette />
					<WatchMovie />
				</>
			),
		},
		{
			path: '/search/:query',

			element: (
				<>
					<Palette />
					<Search />
				</>
			),
		},
		{
			path: '/search/',

			element: (
				<>
					<Palette />
					<Search />
				</>
			),
		},
		{
			path: '*',

			element: (
				<>
					<Palette />
					<Error />
				</>
			),
		},
	]);

	return (
		<>
			<Toaster />
			<RouterProvider router={Router} />
		</>
	);
};

export default App;
