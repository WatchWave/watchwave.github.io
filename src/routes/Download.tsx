import Navigation from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { BiSolidLock } from 'react-icons/bi';
import { HiDesktopComputer } from 'react-icons/hi';
import { RxValueNone } from 'react-icons/rx';
import { DiLinux } from 'react-icons/di';
import { FaApple } from 'react-icons/fa';
import { SiWindows } from 'react-icons/si';

const Download = () => {
	const imageRef = useRef<HTMLImageElement>(null);

	const getOperatingSystem = () => {
		let operatingSystem = 'Not known';
		if (window.navigator.appVersion.indexOf('Win') !== -1) {
			operatingSystem = 'Windows OS';
		}
		if (window.navigator.appVersion.indexOf('Mac') !== -1) {
			operatingSystem = 'MacOS';
		}
		if (window.navigator.appVersion.indexOf('X11') !== -1) {
			operatingSystem = 'UNIX OS';
		}
		if (window.navigator.appVersion.indexOf('Linux') !== -1) {
			operatingSystem = 'Linux OS';
		}

		return operatingSystem;
	};

	const handleDownload = () => {
		// detect platform
		const operatingSystem = getOperatingSystem();
		// redirect to download page
		if (operatingSystem === 'MacOS') {
			window.open('https://github.com/WatchWave/watchwave.github.io/raw/main/public/WatchWave.dmg?download=');
		}
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (imageRef.current) {
				const { left, top, width, height } = imageRef.current.getBoundingClientRect();
				const x = e.clientX - left;
				const y = e.clientY - top;
				// perspective towards the mouse
				const angleX = -(width / 2 - x) / 300;
				const angleY = (height / 2 - y) / 300;
				imageRef.current.style.transform = `perspective(1000px) rotateX(${angleY}deg) rotateY(${angleX}deg)`;
			}
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);
	const getFeature = (feature: string, description: string, icon: JSX.Element) => {
		return (
			<li className="p-5 gap-3 rounded-2xl w-full h-full bg-foreground-100 fc justify-start items-start text-5xl text-secondary">
				{icon}
				<div className="fc gap-2 items-start">
					<p className="text-xl text-foreground">{feature}</p>
					<p className="text-xl text-foreground-300">{description}</p>
				</div>
			</li>
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fc w-screen h-screen overflow-x-hidden relative select-none text-default-foreground bg-default-50 font-inter"
		>
			<Navigation />
			<div className="w-full max-w-8xl px-10 fr gap-10 items-start justify-center pt-36 relative">
				<div className="w-2/4 gap-10 fc items-start">
					<div className="fc gap-3 items-start">
						<h1 className="sm:text-[clamp(36px,_8vw_,110px)] text-lg font-bold tracking-tight leading-[1]">WatchWave...</h1>
						<p className="text-2xl tracking-tighter">But as a native app.</p>
						<button
							onClick={handleDownload}
							className="bg-foreground-100 rounded-2xl px-5 py-3 gap-3 transition-colors text-2xl font-bold fr border-secondary border-2 hover:bg-secondary"
						>
							{getOperatingSystem() === 'MacOS' ? <FaApple /> : getOperatingSystem() === 'Windows OS' ? <SiWindows /> : <DiLinux />}
							{getOperatingSystem() === 'MacOS'
								? 'Download for MacOS'
								: getOperatingSystem() === 'Windows OS'
								? 'Download for Windows'
								: 'Download for Linux'}
						</button>
					</div>
					<div>
						<ul className="w-full grid grid-cols-3 gap-4 items-start">
							{getFeature('No Ads', "There's a built in adblocker.", <RxValueNone />)}
							{getFeature('Native Support', "It's a native app, so it's faster.", <HiDesktopComputer />)}
							{getFeature('Better Stealth Mode', 'Stealth mode now minimizes your window.', <BiSolidLock />)}
						</ul>
					</div>
				</div>
				<div className="w-2/4 h-full fr justify-end max-w-8xl px-10">
					<img src="/app.png" className="w-full shadow-2xl" ref={imageRef} />
				</div>
			</div>
		</motion.div>
	);
};
export default Download;
