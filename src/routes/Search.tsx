import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useStore } from '@/zustandStore';
import { Button } from '@/components/ui/button';
import Movie from '@/components/Movie';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchResultProps, suggestionsProps } from '@/types';
import Slider from '@/components/Slider';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

const Search = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { query } = useParams();
	const { search, setSearch, searchResults, setSearchResults } = useStore();

	const [nowPlaying, setNowPlaying] = useState<suggestionsProps | null>(null);
	const [popular, setPopular] = useState<suggestionsProps | null>(null);
	const [topRated, setTopRated] = useState<suggestionsProps | null>(null);
	const [upcoming, setUpcoming] = useState<suggestionsProps | null>(null);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		navigate(`/search/${encodeURI(search).replace('.', '%2E')}`);
	};

	useEffect(() => {
		console.log(searchResults);
	}, [searchResults]);

	useEffect(() => {
		setSearch(query || '');
		if (!query) return;
		setSearchResults(null);
		fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);

				setSearchResults({ ...response, results: response.results.filter((result: SearchResultProps) => result.media_type !== 'person') });
			})
			.catch((err) => console.error(err));

		return () => {
			setSearchResults(null);
		};
	}, [location]);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setNowPlaying(response);
			})
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setPopular(response);
			})
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setTopRated(response);
			})
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setUpcoming(response);
			})
			.catch((err) => console.error(err));
	}, []);

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
		}),
	};

	const loadNextPage = () => {
		if (!query) return;
		if (!searchResults) return;

		if (searchResults.page === searchResults.total_pages) return;

		fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${searchResults.page + 1}`, options)
			.then((response) => response.json())
			.then((response) =>
				setSearchResults({
					...searchResults,
					results: [...searchResults.results, ...response.results],
					page: response.page,
					total_pages: response.total_pages,
					total_results: response.total_results,
				})
			)
			.catch((err) => console.error(err));
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="w-screen h-screen fc justify-between pt-36 overflow-x-hidden select-none"
		>
			<Navbar />
			<div className="max-w-6xl px-10 w-full fc relative gap-4">
				<h1 className="font-poppins font-bold text-6xl md:text-9xl">Search</h1>
				<form onSubmit={handleSearch} className="w-full max-w-4xl fr gap-3">
					<Input value={search} onChange={(e) => setSearch(e.target.value)} />
					<Button type="submit">Search</Button>
					{query && (
						<Button onClick={() => navigate('/search')} variant={'outline'}>
							Clear
						</Button>
					)}
				</form>
			</div>
			{searchResults && searchResults.page && searchResults.results.length !== 0 && (
				<motion.div
					variants={container}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mt-10 px-10"
				>
					{/* sort by popularity */}
					{searchResults.results
						.sort((a: SearchResultProps, b: SearchResultProps) => b.vote_average * b.vote_count - a.vote_average * b.vote_count)
						.map((result: SearchResultProps) => (
							<Movie key={result.id + result.media_type} result={result} />
						))}
				</motion.div>
			)}
			{searchResults && searchResults.results?.length === 0 && (
				<div className="max-w-6xl w-full h-full fc">
					<h1 className="font-poppins font-bold text-gray-500 text-4xl">No results found</h1>
				</div>
			)}
			{query && searchResults && searchResults.page !== searchResults.total_pages && (
				<div className="w-full fc my-10">
					<Button onClick={loadNextPage} variant={'secondary'}>
						Load More
					</Button>
				</div>
			)}
			{!query && (
				<>
					{nowPlaying?.results.length !== 0 && <Slider type="movie" title="Now Playing" results={nowPlaying?.results} />}

					{popular?.results.length !== 0 && <Slider type="movie" title="Popular" results={popular?.results} />}

					{topRated?.results.length !== 0 && <Slider type="movie" title="Top Rated" results={topRated?.results} />}

					{upcoming?.results.length !== 0 && <Slider type="movie" title="Upcoming" results={upcoming?.results} />}
				</>
			)}
			<Footer />
		</motion.div>
	);
};

export default Search;
