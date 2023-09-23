import { Link } from 'react-router-dom';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { FiFilm } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';

const Movie = ({ result }: any[]) => {
	const child = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
		hidden: {
			opacity: 0,
			y: 200,
			transition: {
				type: 'spring',
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} viewport={{ once: true }} variants={child}>
			<Link className="rounded-xl w-full h-full" to={`/watch/${result.media_type}/${result.id}`}>
				<div className="fc justify-start gap-2 w-full h-full">
					<div className="relative group w-full">
						{result.poster_path ? (
							<img
								className="rounded-xl aspect-[2/3] w-full object-cover shadow-2xl"
								src={`https://image.tmdb.org/t/p/w400${result.poster_path}`}
								alt={result.title}
							/>
						) : (
							<div className="w-full aspect-[2/3] rounded-xl fc bg-[hsl(var(--secondary))]">
								<FiFilm className="text-[hsl(var(--primary))] text-5xl" />
							</div>
						)}
						<div className="absolute bg-black group-hover:opacity-100 opacity-0 bg-opacity-50 rounded-xl transition-opacity inset-0 fc">
							<BsFillPlayCircleFill className="mix-blend-difference rounded-full text-5xl" />
						</div>
					</div>
					<div className="fc gap-3 w-full h-full items-start justify-between">
						<p
							className={`font-bold w-full text-sm sm:text-base md:text-lg font-poppins text-left ${
								!result.title && !result.original_name && 'text-[hsl(var(--secondary))]'
							}`}
						>
							{result.title || result.original_name || 'No Title'}
						</p>
						<div className="fr justify-between w-full">
							<Badge variant={'outline'}>{result.media_type.includes('t') ? 'TV' : 'Movie'}</Badge>
							<Badge variant={'outline'}>{result.vote_average && result.vote_average.toFixed(1)}</Badge>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default Movie;
