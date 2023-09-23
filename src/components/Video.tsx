import { videoProps } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';

const Video = ({ video }: { video: videoProps }) => {
	const [started, setStarted] = useState(false);
	const iframe = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		const iframeWindow = iframe.current?.contentWindow;
		if (iframeWindow) {
			iframeWindow.addEventListener('blur', () => {
				console.log('blur');
			});
		}
	}, [iframe]);

	return (
		<div key={video.id} className="w-full group aspect-[16/9] relative cursor-pointer">
			{!started && (
				<div onClick={() => setStarted((started) => !started)} className="w-full aspect-video">
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
				</div>
			)}
			{started && (
				<div className="w-full aspect-video">
					<iframe
						ref={iframe}
						className="w-full h-full"
						src={`https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1&modestbranding=1&enablejsapi=1`}
						title={video.name}
						allowFullScreen
					/>
					<div className="absolute inset-0 fc items-end justify-start pointer-events-none">
						<button onClick={() => setStarted(false)} className="pointer-events-auto bg-secondary px-9 p-5 rounded-bl-3xl">
							<AiFillCloseCircle size={24} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Video;
