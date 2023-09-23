import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/routes/Home';
import Watch from '@/routes/Watch';
import Search from '@/routes/Search';
import Error from './routes/Error';
import { Toaster } from 'react-hot-toast';
import Palette from './components/Palette';
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
			path: '/watch/:type/:id',

			element: (
				<>
					<Palette />
					<Watch />
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
			path: '/search/:query',

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
