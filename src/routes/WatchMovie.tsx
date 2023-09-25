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
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import {
	genresProps,
	keywordsProps,
	castProps,
	creditsProps,
	detailsProps,
	keywordProps,
	reviewProps,
	reviewsProps,
	recommendationsProps,
	recommendationProps,
	videosProps,
	videoProps,
} from '@/types';
import Video from '@/components/Video';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

const WatchMovie = () => {
	const main = useRef<HTMLDivElement>(null);
	const { id } = useParams<{ id: string }>();

	const [result, setResult] = useState<detailsProps | null>(null);
	const [reviews, setReviews] = useState<reviewsProps | null>(null);
	const [recommedations, setRecommedations] = useState<recommendationsProps | null>(null);
	const [credits, setCredits] = useState<creditsProps | null>(null);
	const [keywords, setKeywords] = useState<keywordsProps | null>(null);
	const [videos, setVideos] = useState<videosProps | null>(null);
	const [imdbID, setImdbID] = useState<string | null>(null);

	const location = useLocation();

	const { popups } = useStore();

	useEffect(() => {
		main.current?.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {
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
		fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setVideos(response))
			.catch((err) => console.error(err));
		fetch(`https://api.themoviedb.org/3/movie/${id}/external_ids?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setImdbID(response.imdb_id))
			.catch((err) => console.error(err));
	}, [location]);

	useEffect(() => {
		document.title = `${result?.title} | WatchWave`;
	}, [result]);

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
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			ref={main}
			className="w-screen h-screen overflow-x-hidden pt-16 sm:pt-20 font-poppins gap-10"
		>
			<Navbar />
			<div className="w-screen sm:px-20">
				<div className="w-full relative">
					{result?.backdrop_path && (
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 0.5 }}
							className="w-full h-full scale-150 sm:scale-110 absolute -z-10 blur-2xl opacity-50"
						>
							<img className="w-full h-full" src={`https://image.tmdb.org/t/p/w400/${result.backdrop_path}`} />
						</motion.div>
					)}

					<motion.iframe
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
						allowFullScreen={true}
						className="w-full aspect-video sm:rounded-2xl"
						src={`https://vidsrc.to/embed/movie/${id}`}
					/>
				</div>
			</div>
			{result && (
				<div className="w-full fc mt-10 mb-10">
					<div className="w-full max-w-7xl fc px-5 sm:px-10 md:fr md:items-start gap-5 mb-20">
						<img
							className="rounded-xl max-w-[250px] aspect-[2/3] object-cover z-10"
							src={`https://image.tmdb.org/t/p/w400/${result.poster_path}`}
							alt=""
						/>
						<div className="fc gap-2 items-start">
							<h1 className="font-bold text-5xl">{result.title || result.name}</h1>
							<ul className="inline-flex font-bold pb-3 gap-2 tracking-tight">
								<li className="fr justify-start gap-3">{result.release_date.split('-')[0]}</li>
								<li>•</li>
								<li className="fr justify-start gap-3">{result.runtime ? timeConvert(result.runtime) : 'N/A'}</li>
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
								{
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
											<p>
												{credits?.cast &&
													credits.cast.slice(0, 5).map((cast: castProps, i: number) => (
														<span key={cast.name} className="hover:underline underline-offset-2">
															<Link to={`/actor/${cast.id}`}>{cast.name + (i !== 4 && ', ')}</Link>
														</span>
													))}
											</p>
										</li>
									</>
								}
								<li className="fr justify-start items-start gap-3">
									<div className="font-bold">Genres</div>
									<div className="fr flex-wrap justify-start gap-2">
										{result.genres && result.genres.map((genre: genresProps, i: number) => <Badge key={i}>{genre.name}</Badge>)}
									</div>
								</li>
								{keywords?.keywords && keywords.keywords.length !== 0 && (
									<li className="fr justify-start items-start gap-3 sm:col-span-2">
										<div className="font-bold">Keywords</div>
										<div className="fr flex-wrap justify-start gap-2">
											{keywords.keywords.map((keyword: keywordProps, i: number) => (
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
										(a: recommendationProps, b: recommendationProps) =>
											b.vote_count * b.vote_average - a.vote_count * a.vote_average
									)
									.map((movie: recommendationProps) => (
										<Movie key={movie.id + movie.media_type} result={movie} />
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

export default WatchMovie;
