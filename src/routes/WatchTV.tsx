import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useStore } from '@/zustandStore';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, ScrollShadow } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';
import useRunOnce from '@/hooks/useRunOnce';
import Review from '@/components/Review';
import Movie from '@/components/Movie';
import Video from '@/components/Video';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Navigation from '@/components/Navbar';
import ReactGA from 'react-ga4';
import {
	TVShow,
	episodeProps,
	seasonsProps,
	videosProps,
	keywordsProps,
	reviewsProps,
	tvRecommendationsProps,
	creditsProps,
	keywordProps,
	videoProps,
	tvRecommendationProps,
	castProps,
	genresProps,
	reviewProps,
} from '@/types';
import useRecordAnalytics from '@/hooks/useRecordAnalytics';
import { BsChevronDown } from 'react-icons/bs';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

const WatchTV = () => {
	const main = useRef<HTMLDivElement>(null);
	const { id } = useParams<{ id: string }>();

	const [result, setResult] = useState<TVShow | null>(null);
	const [reviews, setReviews] = useState<reviewsProps | null>(null);
	const [recommedations, setRecommedations] = useState<tvRecommendationsProps | null>(null);
	const [credits, setCredits] = useState<creditsProps | null>(null);
	const [keywords, setKeywords] = useState<keywordsProps | null>(null);
	const [videos, setVideos] = useState<videosProps | null>(null);
	const [imdbID, setImdbID] = useState<string | null>(null);

	const { episode, setEpisode, season, setSeason } = useStore();
	const [seasons, setSeasons] = useState<seasonsProps>({});
	const location = useLocation();
	const [source, setSource] = useState('0');

	useEffect(() => {
		main.current?.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {
		if (result !== undefined) document.title = `${result?.name || result?.original_name} | WatchWave`;
	}, [result]);

	useRecordAnalytics(location);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);

				ReactGA.event({
					action: 'View',
					category: 'TV',
					label: response.name || response.original_name,
				});
				console.log(response.name || response.original_name);

				for (let i = 1; i <= response.number_of_seasons; i++) {
					fetch(`https://api.themoviedb.org/3/tv/${id}/season/${i}?language=en-US`, options)
						.then((response) => response.json())
						.then((response) => {
							setSeasons((seasons) => ({ ...seasons, ['Season ' + i]: { episodes: response.episodes } }));
						})
						.catch((err) => console.error(err));
				}
				setResult(response);
			})
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setReviews(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setRecommedations(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setCredits(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/tv/${id}/keywords?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setKeywords(response))
			.catch((err) => console.error(err));
		fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setImdbID(response.imdb_id))
			.catch((err) => console.error(err));
		fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setVideos(response))
			.catch((err) => console.error(err));
	}, [location]);

	useEffect(() => {
		if (season !== undefined) {
			const track = `${result?.name || result?.original_name}: Season ${season}`;
			ReactGA.event({
				action: 'View',
				category: 'Season',
				label: track,
			});
		}
	}, [season]);

	useEffect(() => {
		if (episode !== null) {
			// show name, episode number and then name
			const track = `${result?.name || result?.original_name}: Ep${episode}: ${seasons[`Season ${season}`]?.episodes[episode - 1].name}`;
			ReactGA.event({
				action: 'View',
				category: 'Episode',
				// show name episode number and then name
				label: track,
			});
		}
	}, [episode]);

	const sourceCollection = [
		`https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
		`https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
		`https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}&color=006FEE`,
	];

	useRunOnce({
		fn: () => {
			if (localStorage.popups === 'true')
				toast.custom(
					(t) => {
						return (
							<div
								className={`${
									t.visible ? 'animate-enter' : 'animate-leave'
								} max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black bg-default-50 text-default-foreground ring-opacity-5 px-5 py-3`}
							>
								<div className="fr justify-between">
									<div className="rounded-lg text-sm font-semibold overflow-hidden">
										Please use an adblocker like uBlock Origin to block ads on the video player.
									</div>
									<button className="fc" onClick={() => toast.dismiss(t.id)}>
										<AiOutlineCloseCircle className="text-xl" />
									</button>
								</div>
							</div>
						);
					},
					{
						position: 'top-center',
						duration: 5000,
					}
				);
		},
	});

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			ref={main}
			className="w-screen h-screen overflow-x-hidden pt-16 sm:pt-20 font-inter gap-10 bg-background text-default-foreground"
		>
			<Navigation />

			<motion.div
				viewport={{
					once: true,
				}}
				whileInView={{
					filter: 'blur(0px)',
					opacity: 1,
					scale: 1,
				}}
				initial={{
					filter: 'blur(10px)',
					opacity: 0,
					scale: 1.05,
				}}
				transition={{
					duration: 1,
					ease: 'easeInOut',
				}}
				className="w-screen h-[90vh] md:fr fc mb-10 sm:px-10 relative sm:gap-3"
			>
				{result?.backdrop_path && (
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.5 }}
						viewport={{ once: true }}
						className="w-full h-[90vh] scale-125 absolute -z-10 blur-2xl opacity-50 pointer-events-none"
					>
						<img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w400/${result.backdrop_path}`} />
					</motion.div>
				)}
				{episode !== null && season !== null ? (
					<div className="w-full h-full bg-black fc md:rounded-l-2xl sm:rounded-2xl">
						<iframe
							allowFullScreen={true}
							className="w-full aspect-video sm:rounded-2xl md:rounded-none"
							src={sourceCollection[source]}
						/>
						<div className="w-full fc py-4">
							<Dropdown>
								<DropdownTrigger>
									<Button>
										Source {parseInt(source) + 1} <BsChevronDown />
									</Button>
								</DropdownTrigger>
								<DropdownMenu aria-label="Source Selection" onAction={(key) => setSource(key)}>
									<DropdownItem key={0}>Source 1</DropdownItem>
									<DropdownItem key={1}>Source 2</DropdownItem>
									<DropdownItem key={2}>Source 3</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>
				) : (
					<div className="tracking-tighter w-full h-full p-20 bg-black md:rounded-l-2xl sm:rounded-2xl text-center fc text-zinc-300 text-2xl">
						Please select an episode to watch
					</div>
				)}
				<div className="bg-default-50 h md:h-full sm:rounded-2xl md:rounded-r-2xl w-full md:w-auto min-h-[40vh] max-h-full">
					<ScrollShadow className="md:min-w-[300px] md:max-w-[350px] h-full w-full md:w-auto" size={100}>
						<motion.div
							whileInView={{
								opacity: 1,
								filter: 'blur(0px)',
							}}
							initial={{
								opacity: 0,
								filter: 'blur(10px)',
							}}
							viewport={{ once: true }}
						>
							{Object.keys(seasons)
								.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]))
								.map((ssn, i) => (
									<div key={ssn} className="w-full text-left border-b-[1px] border-foreground-200">
										<div className="fr justify-start w-full gap-4 px-5 py-5">
											<img
												draggable={false}
												className="max-w-[70px] h-auto rounded-xl"
												src={`https://image.tmdb.org/t/p/w400/${result?.seasons[i].poster_path}`}
												alt=""
											/>
											<p className="text-xl whitespace-nowrap font-bold tracking-tight">{ssn}</p>
										</div>
										{seasons[ssn].episodes.map((ep: episodeProps) => {
											const { episode_number, season_number, name } = ep;
											return (
												<div
													key={episode_number}
													onClick={() => {
														setEpisode(episode_number);
														setSeason(season_number);
													}}
													// add bg red if its the current episode
													className={`fr justify-start px-5 py-3 border-y-[1px] border-foreground-200 transition-all hover:bg-default-200 cursor-pointer ${
														episode_number === episode && season_number === season ? 'bg-default-200' : ''
													}`}
												>
													<p className="text-sm">
														<span className="font-bold">
															Episode {episode_number}
															{!name.toLowerCase().includes('episode') ? ':' : ''}{' '}
														</span>
														{!name.toLowerCase().includes('episode') && name}
													</p>
												</div>
											);
										})}
									</div>
								))}
						</motion.div>
					</ScrollShadow>
				</div>
			</motion.div>

			{result && (
				<div className="w-full fc mt-10 mb-10">
					<div className="w-full max-w-7xl fc px-5 sm:px-10 md:fr md:items-start gap-5 mb-20">
						<img
							className="rounded-xl max-w-[250px] aspect-[2/3] object-cover z-10"
							src={`https://image.tmdb.org/t/p/w400/${result.poster_path}`}
							alt=""
						/>
						<div className="fc gap-2 items-start">
							<h1 className="font-bold text-3xl sm:text-5xl">{result.name}</h1>
							<ul className="sm:inline-flex fr flex-wrap font-bold pb-3 gap-2 tracking-tight text-sm sm:text-base">
								<li className="fr whitespace-nowrap justify-start gap-3">{`${new Date(
									result.first_air_date
								).getFullYear()} - ${new Date(result.last_air_date).getFullYear()}`}</li>
								<li className="">•</li>
								<li className="fr whitespace-nowrap justify-start gap-3">{result.number_of_seasons} Seasons</li>
								<li className="">•</li>
								<li className="fr whitespace-nowrap justify-start gap-3">{result.number_of_episodes} Episodes</li>
								<li className="">•</li>
								<li className="fr whitespace-nowrap justify-start gap-3">{result.genres[0].name}</li>
								<li className="">•</li>
								{imdbID && (
									<li className="fr justify-start gap-3">
										<a href={`https://www.imdb.com/title/${imdbID}`}>
											<img src="/IMDbLogo.svg" className="h-5" alt="" />
										</a>
									</li>
								)}
							</ul>
							<p className="text-lg max-w-[50ch]">{result.overview}</p>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start mt-5">
								<>
									<li className="fr justify-start gap-3">
										<div className="font-bold">First Air:</div>
										<div>{result.first_air_date}</div>
									</li>
									<li className="fr justify-start gap-3">
										<div className="font-bold">Runtime:</div>
										<div>{result.origin_country}</div>
									</li>
									<li className="fr items-start gap-3">
										<div className="font-bold">Cast:</div>
										<p>
											{credits?.cast &&
												credits.cast.slice(0, 5).map((cast: castProps, i: number) => (
													<span key={cast.name} className="hover:underline underline-offset-2">
														<Link to={`/actor/${cast.id}`} aria-label={`View details for ${cast.name}`}>
															{cast.name + (i !== 4 && ', ')}
														</Link>
													</span>
												))}
										</p>
									</li>
								</>
								{/* <li className="fr justify-start items-start gap-3">
									<div className="font-bold">Genres</div>
									<div className="fr flex-wrap justify-start gap-2">
										{result.genres &&
											result.genres.map((genre: genresProps, i: number) => (
												<Link to={`/genres/${genre.name}`}>
													<Badge key={i}>{genre.name}</Badge>
												</Link>
											))}
									</div>
								</li> */}
								<li className="fr justify-start items-start gap-3">
									<div className="font-bold">Genres</div>
									<div className="fr flex-wrap justify-start gap-2">
										{result.genres && result.genres.map((genre: genresProps, i: number) => <Chip key={i}>{genre.name}</Chip>)}
									</div>
								</li>
								{keywords?.results && keywords.results.length !== 0 && (
									<li className="fr justify-start items-start gap-3 sm:col-span-2">
										<div className="font-bold">Keywords</div>
										<div className="fr flex-wrap justify-start gap-2">
											{keywords.results.map((keyword: keywordProps, i: number) => (
												<Chip variant="bordered" key={i}>
													{keyword.name}
												</Chip>
											))}
										</div>
									</li>
								)}
							</ul>
						</div>
					</div>
					{recommedations && recommedations.results.length !== 0 && (
						<div className="w-full fc my-10 px-10">
							<h3 className="font-bold text-3xl mb-5">More Like This</h3>
							<div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-wrap md:flex-nowrap">
								{recommedations.results
									.slice(0, 5)
									.sort(
										(a: tvRecommendationProps, b: tvRecommendationProps) =>
											b.vote_count * b.vote_average - a.vote_count * a.vote_average
									)
									.map((movie: tvRecommendationProps) => (
										<Movie key={movie.id + movie.media_type} type="tv" result={movie} />
									))}
							</div>
						</div>
					)}
					{videos && videos.results.length !== 0 && (
						<div className="w-full fc px-10 my-10">
							<h3 className="font-bold text-3xl mb-5">Trailers</h3>
							<div className="w-full md:grid-cols-3 grid-cols-1 sm:grid-cols-2 grid gap-3">
								{videos.results
									.filter((video: videoProps) => video.site === 'YouTube' && video.type === 'Trailer')
									.sort((a: videoProps, b: videoProps) => b.size - a.size)
									.map((video: videoProps) => (
										<Video key={video.id} video={video} />
									))}
							</div>
						</div>
					)}
					{reviews && reviews.results.length !== 0 && (
						<div className="w-full fc my-10 px-10">
							<h3 className="font-bold text-3xl mb-5">Reviews</h3>
							<div className="fr items-start flex-wrap gap-10 w-full">
								{reviews.results.map((review: reviewProps) => (
									<Review key={review.id} review={review} />
								))}
							</div>
						</div>
					)}
				</div>
			)}
			<Footer />
		</motion.div>
	);
};

export default WatchTV;
