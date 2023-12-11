import { videoProps } from '@/types';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

const Video = ({ video }: { video: videoProps }) => {
	const [started, setStarted] = useState(false);

	return (
		<div key={video.id} className="w-full group aspect-[16/9] relative cursor-pointer">
			<AnimatePresence mode="popLayout">
				{!started && (
					<motion.div
						initial={{ opacity: 0, filter: 'blur(10px)' }}
						animate={{ opacity: 1, filter: 'blur(0px)' }}
						exit={{ opacity: 0, filter: 'blur(10px)' }}
						transition={{ duration: 0.5 }}
						onClick={() => setStarted((started) => !started)}
						className="w-full aspect-video"
					>
						<img
							src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
							alt="placeholder"
							className="w-full h-full object-cover rounded-2xl"
						/>
						<div className="absolute inset-0 -right-1 fc">
							<button>
								<FaPlay className="group-hover:scale-150 transition-transform text-white" size={48} />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence mode="popLayout">
				{started && (
					<motion.div
						initial={{ opacity: 0, filter: 'blur(10px)' }}
						animate={{ opacity: 1, filter: 'blur(0px)' }}
						exit={{ opacity: 0, filter: 'blur(10px)' }}
						className="w-full aspect-video"
					>
						<motion.iframe
							initial={{ opacity: 0, filter: 'blur(10px)' }}
							whileInView={{ opacity: 1, filter: 'blur(0px)' }}
							transition={{ duration: 0.5 }}
							className="w-full h-full"
							src={`https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1&modestbranding=1&enablejsapi=1`}
							title={video.name}
							allowFullScreen
						/>
						<div className="absolute top-2 right-2 fc items-end justify-start pointer-events-none">
							<button onClick={() => setStarted(false)} className="pointer-events-auto bg-default-50 p-2 rounded-full">
								<AiFillCloseCircle size={24} />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Video;
