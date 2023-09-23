import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useStore } from '@/zustandStore';
import { Button } from '@/components/ui/button';
import Movie from '@/components/Movie';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

const Search = () => {
	const navigate = useNavigate();
	const { query } = useParams();
	const { search, setSearch, searchResults, setSearchResults } = useStore();
	const handleSearch = () => {
		navigate(`/search/${encodeURI(search).replace('.', '%2E')}`);
	};

	useEffect(() => {
		setSearch(query!);
		console.log(searchResults);
		if (!query) return;

		fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options)
			.then((response) => response.json())
			.then((response) => setSearchResults(response))
			.catch((err) => console.error(err));
	}, []);

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
		}),
	};

	useEffect(() => {
		console.log(searchResults);
	}, [searchResults]);

	const loadNextPage = () => {
		if (!query) return;

		if (searchResults.page === searchResults.total_pages) return;

		fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${searchResults.page + 1}`, options)
			.then((response) => response.json())
			.then((response) => setSearchResults({ ...searchResults, results: [...searchResults.results, ...response.results], page: response.page }))
			.catch((err) => console.error(err));
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-screen h-screen fc justify-between pt-36 overflow-x-hidden"
		>
			<Navbar />
			<div className="max-w-6xl px-10 w-full fc relative gap-4">
				<h1 className="font-poppins font-bold text-6xl md:text-9xl">Search</h1>
				<form onSubmit={handleSearch} className="w-full max-w-4xl fr gap-3">
					<Input value={search} onChange={(e) => setSearch(e.target.value)} />
					<Button type="submit">Search</Button>
				</form>
			</div>
			{searchResults.page && searchResults.results.length !== 0 && (
				<motion.div
					variants={container}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mt-10 px-10"
				>
					{searchResults.results.map((result: any) => (
						<Movie key={result.id} result={result} />
					))}
				</motion.div>
			)}
			{searchResults.results?.length === 0 && (
				<div className="max-w-6xl w-full h-full fc">
					<h1 className="font-poppins font-bold text-gray-500 text-4xl">No results found</h1>
				</div>
			)}
			{query && searchResults.page !== searchResults.total_pages && (
				<div className="w-full fc my-10">
					<Button onClick={loadNextPage} variant={'secondary'}>
						Load More
					</Button>
				</div>
			)}
			<Footer />
		</motion.div>
	);
};

export default Search;
