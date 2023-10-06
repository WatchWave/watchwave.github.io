import Footer from '@/components/Footer';
import Movie from '@/components/Movie';
import Navbar from '@/components/Navbar';
import { Button } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { ActorCreditsProps, ActorProps, castProps } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useRecordAnalytics from '@/hooks/useRecordAnalytics';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

const Actor = () => {
	const { actor: id } = useParams();
	const location = useLocation();

	const [actorCredits, setActorCredits] = useState<ActorCreditsProps | null>(null);
	const [currentActor, setCurrentActor] = useState<ActorProps | null>(null);

	const [showMore, setShowMore] = useState<boolean>(false);
	const [height, setHeight] = useState<number | null>(null);

	const [index, setIndex] = useState<number[]>([0, 20]);

	const el = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => setCurrentActor(response))
			.catch((err) => console.error(err));

		fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`, options)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setActorCredits(response);
			})
			.catch((err) => console.error(err));
	}, [location]);
	useRecordAnalytics(location);

	useEffect(() => {
		el.current && setHeight(el.current?.clientHeight);
	}, [el.current, currentActor?.biography]);

	const handleLoadMore = () => {
		setIndex([index[0], index[1] + 20]);
	};

	const formatDate = (date: string) => {
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const d = new Date(date);
		const day = d.getDate();
		const month = monthNames[d.getMonth()];
		const year = d.getFullYear();
		return `${month} ${day}, ${year}`;
	};

	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
		}),
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 2 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="w-screen h-screen overflow-x-hidden pt-16 sm:pt-28 font-inter gap-10 select-none bg-background text-default-foreground"
		>
			<Navbar />
			<div className="w-full fc">
				<div className="fc md:fr md:justify-start md:items-start w-full max-w-6xl px-10 gap-5">
					<div className="relative">
						<motion.img
							whileInView={{ opacity: 1, filter: 'blur(0px)' }}
							initial={{ opacity: 0, filter: 'blur(10px)' }}
							transition={{ duration: 1 }}
							src={`https://image.tmdb.org/t/p/original/${currentActor?.profile_path}`}
							className="max-w-[300px] w-full md:w-[initial] rounded-2xl z-30 relative"
						/>
						<div className="scale-125 absolute inset-0 blur-2xl z-20 opacity-50 pointer-events-none">
							<img src={`https://image.tmdb.org/t/p/original/${currentActor?.profile_path}`} className="w-full h-full" />
						</div>
					</div>
					<main className="fc items-start gap-3 z-10">
						<h1 className="text-5xl md:text-7xl font-semibold mb-3">{currentActor?.name}</h1>

						<ul className="fr gap-3">
							{currentActor?.homepage && (
								<>
									<li>
										<a className="sm:hover:underline underline-offset-2" href={currentActor?.homepage}>
											Website
										</a>
									</li>
									<li>•</li>
								</>
							)}
							<li>
								<Chip>{currentActor?.known_for_department}</Chip>
							</li>
							<li>•</li>
							<li className="fr justify-start gap-3">
								<a target="blank" href={`https://www.imdb.com/name/${currentActor?.imdb_id}`}>
									<img src="/IMDbLogo.svg" className="h-5" />
								</a>
							</li>
						</ul>
						<ul className="fc gap-2 items-start">
							{currentActor?.birthday && (
								<li className="text-2xl">
									<p className="text-xl">
										<span className="font-semibold">Birthday: </span>
										{formatDate(currentActor?.birthday)}
									</p>
								</li>
							)}
							{currentActor?.place_of_birth && (
								<li className="text-2xl">
									<p className="text-xl">
										<span className="font-semibold">Place of Birth: </span>
										{currentActor?.place_of_birth}
									</p>
								</li>
							)}
							{currentActor?.deathday && (
								<li className="text-2xl">
									<p className="text-xl">
										<span className="font-semibold">Deathday: </span>
										{formatDate(currentActor?.deathday)}
									</p>
								</li>
							)}
						</ul>
						{currentActor?.biography && (
							<>
								<motion.div
									ref={el}
									className="overflow-hidden relative"
									initial={{ height: 'auto' }}
									animate={{ height: showMore ? 'auto' : height && height < 200 ? 'auto' : 200 }}
								>
									<p className="text-base text-foreground-500">{currentActor?.biography}</p>
									<AnimatePresence>
										{!showMore && height && height > 200 && (
											<motion.div
												initial={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className="w-full h-2/3 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-background"
											/>
										)}
									</AnimatePresence>
								</motion.div>
								{height && height >= 200 && (
									<div className="w-full fr justify-end">
										<Button variant="bordered" onClick={() => setShowMore(!showMore)}>
											Show {showMore ? 'Less' : 'More'}
										</Button>
									</div>
								)}
							</>
						)}
					</main>
				</div>
				<section className="w-full px-10 mt-20">
					<h2 className="text-4xl font-semibold mb-5">Known For</h2>
					<motion.div
						variants={container}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
					>
						{actorCredits?.cast &&
							actorCredits?.cast
								.sort((a: castProps, b: castProps) => a.vote_average * a.popularity - b.vote_average * b.popularity)
								.sort((a: castProps) => (a.poster_path ? -1 : 1))
								.slice(index[0], index[1])
								.map((movie, i) => <Movie key={movie.id + movie.media_type + i} result={movie} />)}
					</motion.div>

					{/* dont show if total movies are 10 */}
					{actorCredits?.cast?.length !== 10 && (
						<div className="w-full fr">
							<Button className="mt-10" variant="bordered" onClick={handleLoadMore}>
								Load More
							</Button>
						</div>
					)}
				</section>
			</div>
			<Footer />
		</motion.div>
	);
};

export default Actor;
