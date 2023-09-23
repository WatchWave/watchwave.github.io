import { Link } from 'react-router-dom';
import { FiFilm } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { recommendationProps, SearchResultProps, suggestionProps } from '@/types';
import { twMerge } from 'tailwind-merge';

const Movie = ({
	result,
	disabled,
	className,
	type,
}: {
	result: recommendationProps | SearchResultProps | suggestionProps;
	disabled?: boolean;
	className?: string;
	type?: string;
}) => {
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
		<motion.div
			className={`${twMerge('w-full h-full group relative', className)}`}
			whileHover={{ scale: 1.05 }}
			viewport={{ once: true }}
			variants={child}
		>
			{result.poster_path && !disabled && (
				<div className="absolute blur-2xl opacity-0 group-hover:opacity-70 inset-0 transition-opacity -z-10">
					<img
						className="rounded-xl aspect-[2/3] w-full object-cover max-w-[250px] scale-115"
						src={`https://image.tmdb.org/t/p/w400${result.poster_path}`}
						draggable={false}
					/>
				</div>
			)}
			<Link className="rounded-xl w-full h-full" to={`/watch/${result.media_type ? result.media_type : type}/${result.id}`}>
				<div className="fc justify-start gap-2 w-full h-full">
					<div className="relative fc group w-full">
						{result.poster_path ? (
							<img
								className="rounded-xl aspect-[2/3] w-full object-cover shadow-2xl max-w-[250px]"
								src={`https://image.tmdb.org/t/p/w400${result.poster_path}`}
								alt={result.title}
							/>
						) : (
							<div className="w-full aspect-[2/3] rounded-xl fc bg-secondary">
								<FiFilm className="text-primary text-5xl" />
							</div>
						)}
					</div>
					<div className="fc gap-3 w-full h-full items-start justify-between">
						<p
							className={`font-bold text-sm sm:text-base md:text-lg font-poppins text-left ${
								!result.title && !result.original_name && 'text-secondary'
							}`}
						>
							{result.title || result.original_name || 'No Title'}
						</p>
						<div className="fr justify-between w-full">
							{
								<Badge variant={'outline'}>
									{result.media_type ? (result.media_type.includes('t') ? 'TV' : 'Movie') : type?.includes('t') ? 'TV' : 'Movie'}
								</Badge>
							}
							<Badge variant={'outline'}>{result.vote_average && result.vote_average.toFixed(1)}</Badge>
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default Movie;
