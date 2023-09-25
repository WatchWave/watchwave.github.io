import ReactMarkdown from 'react-markdown';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { reviewProps } from '@/types';

const Review = ({ review }: { review: reviewProps }) => {
	const [showMore, setShowMore] = useState<boolean>(false);
	const [height, setHeight] = useState<number | null>(null);
	const el = useRef<HTMLDivElement>(null);

	useEffect(() => {
		el.current && setHeight(el.current?.clientHeight);
	}, []);

	return (
		<div key={review.id} className="fc p-7 bg-secondary rounded-xl">
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
				<motion.div
					ref={el}
					className="overflow-hidden w-full relative"
					initial={{ height: 'auto' }}
					animate={{ height: showMore ? 'auto' : height && height < 150 ? 'auto' : 100 }}
				>
					<ReactMarkdown
						components={{
							br: ({ ...props }) => <br {...props} />,
						}}
						className="text-lg max-w-[50ch]"
					>
						{review.content}
					</ReactMarkdown>
					<AnimatePresence>
						{!showMore && height && height > 100 && (
							<motion.div
								initial={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="w-full h-1/2 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-secondary"
							/>
						)}
					</AnimatePresence>
				</motion.div>
				{height && height > 100 && (
					<div className="w-full fr justify-end">
						<Button onClick={() => setShowMore(!showMore)} variant={'outline'}>
							Show {showMore ? 'Less' : 'More'}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Review;
