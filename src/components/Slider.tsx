import { suggestionProps } from '@/types';
import Movie from './Movie';
import { motion } from 'framer-motion';
const Slider = ({ results, title, type }: { results: suggestionProps[] | undefined; title: string; type: string }) => {
	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
		}),
	};

	return (
		<motion.div className="max-w-6xl w-full py-20 px-10">
			<div className="w-full">
				<h1 className="font-inter font-bold text-4xl mb-10">{title}</h1>

				<motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
					{results?.slice(0, 10).map((result: suggestionProps) => (
						<Movie type={type} key={`${result.id}${result.title}${title}`} result={result} />
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Slider;
