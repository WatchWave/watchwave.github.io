import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/zustandStore';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

const Watch = () => {
	const { id, type } = useParams<{ id: string; type: string }>();
	const [result, setResult] = useState<object>({});
	const { episode, setEpisode, season, setSeason } = useStore();
	const [seasons, setSeasons] = useState<object>({});

	useEffect(() => {
		if (type === 'tv') return;

		fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setResult(response))
			.catch((err) => console.error(err));
	}, []);

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
	}, []);

	useEffect(() => {
		console.log(seasons);
	}, [seasons]);

	useEffect(() => {
		console.log(result);
	}, [result]);

	const timeConvert = (n: number) => {
		const num = n;
		const hours = num / 60;
		const rhours = Math.floor(hours);
		const minutes = (hours - rhours) * 60;
		const rminutes = Math.round(minutes);
		return hours + ' h ' + rminutes + 'm';
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-screen h-screen overflow-x-hidden pb-20 pt-16 font-poppins gap-10"
		>
			<Navbar />
			{type === 'movie' && (
				<div className="w-screen h-screen px-20">
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
							.sort()
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
					<div className="w-full max-w-6xl fc px-10 md:fr items-start gap-5">
						<img className="rounded-xl" src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`} alt="" />
						<div className="fc gap-2 items-start">
							<h1 className="font-bold text-5xl">{result.title || result.name}</h1>
							<p className="text-lg max-w-[50ch]">{result.overview}</p>
							<ul className="grid grid-cols-2 gap-5 items-start mt-5">
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
									</>
								)}
								<li className="fr justify-start gap-3">
									<div className="font-bold">Genres</div>
									<div className="fr gap-2">
										{result.genres && result.genres.map((genre: any, i: number) => <Badge key={i}>{genre.name}</Badge>)}
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
			<Footer />
		</motion.div>
	);
};

export default Watch;
