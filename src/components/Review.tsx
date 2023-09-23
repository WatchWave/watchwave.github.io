import ReactMarkdown from 'react-markdown';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './ui/button';

const Review = ({ review }: { review: object }) => {
	const [showMore, setShowMore] = useState<boolean>(false);

	return (
		<div key={review.id} className="fc">
			<div className="fc gap-2 items-start">
				<h5 className="font-bold text-xl fr gap-3">
					{review.author_details.avatar_path && (
						<img
							className="aspect-square w-10 object-cover rounded-full"
							src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
						/>
					)}
					{review.author}
				</h5>
				<motion.div className="overflow-hidden w-full relative" initial={{ height: 'auto' }} animate={{ height: showMore ? 'auto' : 100 }}>
					<ReactMarkdown
						components={{
							br: ({ node, ...props }) => <br {...props} />,
						}}
						className="text-lg max-w-[50ch]"
					>
						{review.content}
					</ReactMarkdown>
					<AnimatePresence>
						{!showMore && (
							<motion.div
								initial={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="w-full h-1/2 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-background"
							/>
						)}
					</AnimatePresence>
				</motion.div>
				<div className="w-full fr justify-end">
					<Button onClick={() => setShowMore(!showMore)} variant={'secondary'}>
						Show {showMore ? 'Less' : 'More'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Review;
