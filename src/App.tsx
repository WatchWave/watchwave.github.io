import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/routes/Home';
import Watch from '@/routes/Watch';
import Search from '@/routes/Search';
import { useStore } from '@/zustandStore';
import { useEffect } from 'react';
import Error from './routes/Error';
const App = () => {
	const { searchResults, search } = useStore();
	useEffect(() => {
		console.log(searchResults);
		console.log(search);
	}, [searchResults]);

	const BrowserRouter = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/watch/:type/:id',
			element: <Watch />,
		},
		{
			path: '/search/',
			element: <Search />,
		},
		{
			path: '/search/:query',
			element: <Search />,
		},
		{
			path: '*',
			element: <Error />,
		},
	]);

	return <RouterProvider router={BrowserRouter} />;
};

export default App;
