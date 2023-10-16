import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@/zustandStore';
import { Input, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchResultProps, castProps, suggestionsProps } from '@/types';
import Slider from '@/components/Slider';
import Person from '@/components/Person';
import useRecordAnalytics from '@/hooks/useRecordAnalytics';
import ReactGA from 'react-ga4';
import { BsChevronDown } from 'react-icons/bs';
import Movie from '@/components/Movie';
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

	const [popular, setPopular] = useState<suggestionsProps | null>(null);
	const [topRated, setTopRated] = useState<suggestionsProps | null>(null);
	const [upcoming, setUpcoming] = useState<suggestionsProps | null>(null);
	const [filter, setFilter] = useState('all');

	const filteredItems = searchResults?.results
		.filter((result: SearchResultProps) => {
			if (filter === 'all') return true;
			if (filter === 'movies') return result.media_type === 'movie';
			if (filter === 'tv') return result.media_type === 'tv';
			if (filter === 'person') return result.media_type === 'person';
			return false;
		})
		.sort((a: SearchResultProps) => (a.poster_path ? -1 : 1))
		.sort((a: SearchResultProps, b: SearchResultProps) => a.popularity - b.popularity)
		.sort((a: SearchResultProps) => (a.media_type === 'person' ? 1 : -1));

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		navigate(`/search/${encodeURI(search).replace('.', '%2E')}`);
	};

	useRecordAnalytics(location);

	useEffect(() => {
		setSearch(query || '');
		if (!query) return;
		ReactGA.event({
			category: 'query',
			action: 'search',
			label: query,
		});
		setSearchResults(null);
		fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);

				setSearchResults(response);
			})
			.catch((err) => console.error(err));

		return () => {
			setSearchResults(null);
		};
	}, [location]);

	useMemo(() => {
		if (query) return;
		Promise.all([
			fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options),
			fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options),
			fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options),
		])
			.then(([popularResponse, topRatedResponse, upcomingResponse]) =>
				Promise.all([popularResponse.json(), topRatedResponse.json(), upcomingResponse.json()])
			)
			.then(([popular, topRated, upcoming]) => {
				setPopular(popular);
				setTopRated(topRated);
				setUpcoming(upcoming);
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
			className="w-screen h-screen fc justify-between pt-36 overflow-x-hidden select-none bg-background text-default-foreground"
		>
			<Navigation />
			<div className="max-w-6xl px-4 sm:px-10 w-full fc relative gap-4">
				<h1 className="font-inter font-bold text-6xl md:text-9xl">Search</h1>
				<form onSubmit={handleSearch} className="w-full max-w-4xl fc gap-3">
					<div className="fr gap-2 w-full">
						<Input placeholder="Search for a Movie, TV Show, or Person" value={search} onChange={(e) => setSearch(e.target.value)} />
						<Button type="submit">Search</Button>
						{query && (
							<Button onClick={() => navigate('/search')} variant="bordered">
								Clear
							</Button>
						)}
					</div>
					{query && (
						<div className="w-full">
							<Dropdown>
								<DropdownTrigger>
									<Button>
										{
											{
												all: 'All',
												movies: 'Movies',
												tv: 'TV Shows',
												person: 'People',
											}[filter]
										}{' '}
										<BsChevronDown />
									</Button>
								</DropdownTrigger>
								<DropdownMenu aria-label="Filter Selection" onAction={(key) => setFilter(key)}>
									<DropdownItem key="all">All</DropdownItem>
									<DropdownItem key="movies">Movies</DropdownItem>
									<DropdownItem key="tv">TV Shows</DropdownItem>
									<DropdownItem key="person">People</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					)}
				</form>
			</div>
			{searchResults && searchResults.page && searchResults.results.length !== 0 && (
				<>
					<AnimatePresence>
						{filteredItems && filteredItems?.length > 1 ? (
							<motion.div
								variants={container}
								initial="hidden"
								animate="visible"
								className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-6xl mt-10 px-4 sm:px-10"
							>
								{/* sort by popularity */}
								<AnimatePresence>
									{filteredItems &&
										filteredItems.map((result: SearchResultProps | castProps) => {
											return result.media_type.includes('t') || result.media_type.includes('m') ? (
												<Movie key={result.id + result.media_type} result={result} />
											) : (
												<Person key={result.id + result.media_type} result={result} />
											);
										})}
								</AnimatePresence>
							</motion.div>
						) : (
							<div className="max-w-6xl w-full h-full fc">
								<h1 className="font-inter font-bold text-gray-500 text-4xl">No results found</h1>
							</div>
						)}
					</AnimatePresence>
				</>
			)}
			{searchResults && searchResults.results?.length === 0 && (
				<div className="max-w-6xl w-full h-full fc">
					<h1 className="font-inter font-bold text-gray-500 text-4xl">No results found</h1>
				</div>
			)}
			{query && searchResults && searchResults.page !== searchResults.total_pages && filteredItems && filteredItems?.length > 0 && (
				<div className="w-full fc my-10">
					<Button onClick={loadNextPage} color="primary">
						Load More
					</Button>
				</div>
			)}
			{!query && (
				<>
					<AnimatePresence>
						{popular?.results.length !== 0 && <Slider type="movie" title="Popular" results={popular?.results} />}

						{topRated?.results.length !== 0 && <Slider type="movie" title="Top Rated" results={topRated?.results} />}

						{upcoming?.results.length !== 0 && <Slider type="movie" title="Upcoming" results={upcoming?.results} />}
					</AnimatePresence>
				</>
			)}
			<Footer />
		</motion.div>
	);
};

export default Search;
