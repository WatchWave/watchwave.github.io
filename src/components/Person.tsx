import { castProps } from '@/types';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Chip } from '@nextui-org/react';

const Person = ({ result, className }: { result: castProps; className?: string }) => {
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
			className={`${twMerge('w-full h-full max-w-[250px] mx-auto group sm:hover:z-10 relative', className)}`}
			whileHover={{ scale: document.body.clientWidth > 768 ? 1.05 : 1 }}
			viewport={{ once: true }}
			variants={child}
		>
			{result.profile_path && (
				<div className="absolute blur-2xl opacity-70 sm:opacity-0 sm:group-hover:opacity-70 w-full h-full transition-opacity -z-10 fc">
					<img
						className="rounded-xl aspect-[2/3] w-full object-cover max-w-[250px] scale-100 sm:scale-125"
						src={`https://image.tmdb.org/t/p/w400/${result.profile_path}`}
						draggable={false}
					/>
				</div>
			)}
			<Link draggable={false} className="rounded-xl w-full h-full" to={`/actor/${result.id}`} aria-label="actor">
				<div className="fc justify-start gap-2 w-full h-full">
					<div className="relative fc group w-full">
						{result.profile_path ? (
							<img
								className="rounded-xl aspect-[2/3] w-full object-cover shadow-2xl max-w-[250px]"
								src={`https://image.tmdb.org/t/p/w400/${result.profile_path}`}
								alt={result.title}
							/>
						) : (
							<div className="w-full aspect-[2/3] max-w-[250px] rounded-xl fc bg-default-50">
								<BsFillPersonFill className="text-default-500 text-5xl" />
							</div>
						)}
					</div>
					<div className="fc gap-3 w-full h-full items-start justify-between">
						<p className="font-bold text-sm sm:text-base md:text-lg font-inter text-left">{result.name}</p>
						<div className="fr justify-between w-full">
							<Chip variant="bordered">Person</Chip>
							{result.known_for_department.length !== 0 && <Chip variant="bordered">{result.known_for_department}</Chip>}
						</div>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export default Person;
