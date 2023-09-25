import { suggestionProps } from '@/types';
import Movie from './Movie';
import { motion } from 'framer-motion';
const Slider = ({ results, title, type }: { results: suggestionProps[] | undefined; title: string; type: string }) => {
	console.log(results);
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
				<h1 className="font-poppins font-bold text-4xl mb-10">{title}</h1>

				<motion.div
					variants={container}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 gap-14 sm:gap-5 sm:grid-cols-3 md:grid-cols-5"
				>
					{results?.map((result: suggestionProps) => (
						<Movie type={type} key={result.id} result={result} />
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Slider;
