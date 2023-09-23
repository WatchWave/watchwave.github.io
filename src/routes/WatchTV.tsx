import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/zustandStore';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';
import useRunOnce from '@/hooks/useRunOnce';
import Review from '@/components/Review';
import Movie from '@/components/Movie';
import { AiOutlineCloseCircle } from 'react-icons/ai';
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
import Video from '@/components/Video';

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

	const { episode, setEpisode, season, setSeason, popups } = useStore();
	const [seasons, setSeasons] = useState<seasonsProps>({});
	const location = useLocation();

	useEffect(() => {
		main.current?.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {
		document.title = `${result?.name} | WatchWave`;
	}, [result]);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => {
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

		fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setResult(response))
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
			.then((response) => {
				console.log(response);
				setKeywords(response);
			})
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

	useRunOnce({
		fn: () => {
			if (popups)
				toast.custom(
					(t) => {
						return (
							<div
								className={`${
									t.visible ? 'animate-enter' : 'animate-leave'
								} max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black bg-secondary ring-opacity-5 px-5 py-3`}
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
						position: 'bottom-center',
						duration: 5000,
					}
				);
		},
	});

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			ref={main}
			className="w-screen h-screen overflow-x-hidden pt-16 sm:pt-20 font-poppins gap-10"
		>
			<Navbar />

			<div className="w-screen h-[90vh] md:fr fc mb-10 sm:px-10 relative">
				{result?.backdrop_path && (
					<div className="w-full h-[90vh] scale-150 absolute -z-10 blur-2xl opacity-50">
						<img className="w-full h-full" src={`https://image.tmdb.org/t/p/w400/${result.backdrop_path}`} />
					</div>
				)}
				{episode !== null && season !== null ? (
					<div className="w-full h-full bg-black fc sm:rounded-l-2xl">
						<iframe
							allowFullScreen={true}
							className="w-full aspect-video"
							src={`https://vidsrc.to/embed/tv/${id}/${season}/${episode}`}
						/>
					</div>
				) : (
					<div className="w-full h-full p-20 bg-black sm:rounded-l-2xl text-center fc text-zinc-300 text-2xl">
						Please select an episode to watch
					</div>
				)}

				<div
					className="bg-black/80 sm:rounded-r-2xl backdrop-blur-xl w-full md:w-[initial] md:h-full md:border-l-[1px] overflow-auto"
					style={{
						userSelect: 'none',
					}}
				>
					{Object.keys(seasons)
						.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]))
						.map((ssn) => (
							<div key={ssn} className="w-full text-left border-b-[1px] text-white">
								<p className="text-xl px-5 py-5">{ssn}</p>
								{seasons[ssn].episodes.map((ep: episodeProps) => {
									const { episode_number, season_number, name } = ep;
									return (
										<div
											key={episode_number}
											onClick={() => {
												setEpisode(episode_number);
												setSeason(season_number);
											}}
											className="fr justify-start px-5 py-3 border-y-[1px] transition-all hover:bg-black cursor-pointer"
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
				</div>
			</div>

			{result && (
				<div className="w-full fc mt-10 mb-10">
					<div className="w-full max-w-7xl fc px-5 sm:px-10 md:fr md:items-start gap-5 mb-20">
						<img
							className="rounded-xl max-w-[250px] aspect-[2/3] object-cover"
							src={`https://image.tmdb.org/t/p/w400/${result.poster_path}`}
							alt=""
						/>
						<div className="fc gap-2 items-start">
							<h1 className="font-bold text-5xl">{result.name}</h1>
							<ul className="inline-flex font-bold pb-3 gap-2 tracking-tight">
								<li className="fr justify-start gap-3">{`${new Date(result.first_air_date).getFullYear()} - ${new Date(
									result.last_air_date
								).getFullYear()}`}</li>
								<li>•</li>
								<li className="fr justify-start gap-3">{result.number_of_seasons} Seasons</li>
								<li>•</li>
								<li className="fr justify-start gap-3">{result.number_of_episodes} Episodes</li>
								<li>•</li>
								<li className="fr justify-start gap-3">{result.genres[0].name}</li>
								<li>•</li>
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
										<div>
											{credits?.cast &&
												credits.cast
													.slice(0, 5)
													.map((cast: castProps) => cast.name)
													.join(', ')}
										</div>
									</li>
								</>
								<li className="fr justify-start items-start gap-3">
									<div className="font-bold">Genres</div>
									<div className="fr flex-wrap justify-start gap-2">
										{result.genres && result.genres.map((genre: genresProps, i: number) => <Badge key={i}>{genre.name}</Badge>)}
									</div>
								</li>
								{keywords?.results && keywords.results.length !== 0 && (
									<li className="fr justify-start items-start gap-3 sm:col-span-2">
										<div className="font-bold">Keywords</div>
										<div className="fr flex-wrap justify-start gap-2">
											{keywords.results.map((keyword: keywordProps, i: number) => (
												<Badge variant={'outline'} key={i}>
													{keyword.name}
												</Badge>
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
							<div className="w-full fr gap-3">
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
