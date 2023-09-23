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

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

const Watch = () => {
	const main = useRef<HTMLDivElement>(null);
	const { id, type } = useParams<{ id: string; type: string }>();
	const [result, setResult] = useState<object>({});
	const [reviews, setReviews] = useState<object>({});
	const [recommedations, setRecommedations] = useState<object>({});
	const [credits, setCredits] = useState<object>({});
	const [keywords, setKeywords] = useState<object>({});
	const { episode, setEpisode, season, setSeason } = useStore();
	const [seasons, setSeasons] = useState<object>({});
	const location = useLocation();

	useEffect(() => {
		main.current.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {
		console.log(result);
	}, [result]);

	useEffect(() => {
		if (type === 'tv') return;

		fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setResult(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setReviews(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setRecommedations(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setCredits(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/movie/${id}/keywords?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setKeywords(response))
			.catch((err) => console.error(err));
	}, [location]);

	useEffect(() => {
		document.title = `${result.title || result.name} | WatchWave`;
	}, [result]);

	useEffect(() => {
		if (type === 'movie') return;

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
	}, [location]);

	useRunOnce({
		fn: () => {
			toast.success('Please use an adblocker like uBlock Origin to block ads on the video player.', {
				position: 'bottom-center',
				duration: 5000,
			});
		},
	});

	const timeConvert = (n: number): string => {
		const num = n;
		const hours = num / 60;
		const rhours = Math.floor(hours);
		const minutes = (hours - rhours) * 60;
		const rminutes = Math.round(parseFloat(minutes.toString()));
		return rhours + ' h ' + rminutes + 'm';
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			ref={main}
			className="w-screen h-screen overflow-x-hidden pb-20 pt-16 font-poppins gap-10"
		>
			<Navbar />
			{type === 'movie' && (
				<div className="w-screen sm:px-20">
					<iframe allowFullScreen={true} className="w-full aspect-video" src={`https://vidsrc.to/embed/movie/${id}`} />
				</div>
			)}
			{type === 'tv' && (
				<div className="w-screen h-[90vh] md:fr fc bg-black overflow-hidden mb-10">
					{episode !== null && season !== null ? (
						<iframe
							allowFullScreen={true}
							className="w-full aspect-video"
							src={`https://vidsrc.to/embed/tv/${id}/${season}/${episode}`}
						/>
					) : (
						<div className="w-full aspect-video p-20 text-center fc text-zinc-300 text-2xl">Please select an episode to watch</div>
					)}

					<div
						className="bg-black w-full md:w-[initial] md:h-full md:border-l-[1px] overflow-scroll"
						style={{
							userSelect: 'none',
						}}
					>
						{Object.keys(seasons)
							.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]))
							.map((ssn) => (
								<div key={ssn} className="w-full text-left border-b-[1px]">
									<p className="text-xl px-5 py-5">{ssn}</p>
									{seasons[ssn].episodes.map((ep: any) => (
										<div
											key={ep.episode_number}
											onClick={() => {
												setEpisode(ep.episode_number);
												setSeason(ep.season_number);
											}}
											className="fr justify-start px-5 py-3 border-y-[1px] transition-all hover:bg-[hsl(var(--border))] cursor-pointer"
										>
											<p className="text-sm">
												<span className="font-bold">
													Episode {ep.episode_number}
													{!ep.name.toLowerCase().includes('episode') ? ':' : ''}{' '}
												</span>
												{!ep.name.toLowerCase().includes('episode') && ep.name}
											</p>
										</div>
									))}
								</div>
							))}
					</div>
				</div>
			)}
			{result && (
				<div className="w-full fc mt-10 mb-10">
					<div className="w-full max-w-6xl fc px-5 sm:px-10 md:fr md:items-start gap-5 mb-20">
						<img
							className="rounded-xl max-w-[250px] aspect-[2/3] object-cover"
							src={`https://image.tmdb.org/t/p/w400/${result.poster_path}`}
							alt=""
						/>
						<div className="fc gap-2 items-start">
							<h1 className="font-bold text-5xl">{result.title || result.name}</h1>
							<p className="text-lg max-w-[50ch]">{result.overview}</p>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start mt-5">
								{type === 'movie' && (
									<>
										<li className="fr justify-start gap-3">
											<div className="font-bold">Release Date:</div>
											<div>{result.release_date}</div>
										</li>
										<li className="fr justify-start gap-3">
											<div className="font-bold">Runtime:</div>
											<div>{timeConvert(result.runtime)}</div>
										</li>
										<li className="fr items-start gap-3">
											<div className="font-bold">Cast:</div>
											<div>
												{credits.cast &&
													credits.cast
														.slice(0, 5)
														.map((cast: any) => cast.name)
														.join(', ')}
											</div>
										</li>
									</>
								)}
								<li className="fr justify-start items-start gap-3">
									<div className="font-bold">Genres</div>
									<div className="fr flex-wrap justify-start gap-2">
										{result.genres && result.genres.map((genre: any, i: number) => <Badge key={i}>{genre.name}</Badge>)}
									</div>
								</li>
								<li className="fr justify-start items-start gap-3 sm:col-span-2">
									<div className="font-bold">Keywords</div>
									<div className="fr flex-wrap justify-start gap-2">
										{keywords.keywords &&
											keywords.keywords.map((keyword: any, i: number) => (
												<Badge variant={'outline'} key={i}>
													{keyword.name}
												</Badge>
											))}
									</div>
								</li>
							</ul>
						</div>
					</div>
					{type === 'movie' && recommedations.page && (
						<div className="w-full fc my-10 px-10">
							<h3 className="font-bold text-3xl mb-5">More Like This</h3>
							<div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-wrap md:flex-nowrap">
								{recommedations.results.slice(0, 5).map((result: object) => (
									<Movie key={result.id + result.media_type} result={result} />
								))}
							</div>
						</div>
					)}
					{type === 'movie' && reviews.page && (
						<div className="w-full fc my-10 px-10">
							<h3 className="font-bold text-3xl mb-5">Reviews</h3>
							<div className="fr flex-wrap gap-10">
								{reviews.results.map((review: object) => (
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

export default Watch;
