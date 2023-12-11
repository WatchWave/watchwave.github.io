import { useStore } from '@/zustandStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useRunOnce from '@/hooks/useRunOnce';
import { Button, Input } from '@nextui-org/react';
import { Kbd } from '@nextui-org/react';
import ReactGA from 'react-ga4';
import useRecordAnalytics from '@/hooks/useRecordAnalytics';

const Home = () => {
	// Use the search query from the URL to set the search state
	const navigate = useNavigate();
	const { search, setSearch } = useStore();
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		navigate(`/search/${encodeURI(search).replace('.', '%2E')}`);
	};
	const location = useLocation();

	useEffect(() => {
		console.log(localStorage.electron);
		setSearch('');
	}, []);
	useRecordAnalytics(location);

	useRunOnce({
		fn: () => {
			if (localStorage.popups === 'true')
				toast.custom(
					(t) => {
						return (
							<div
								className={`${
									t.visible ? 'animate-enter' : 'animate-leave'
								} max-w-md w-full shadow- rounded-lg pointer-events-auto flex ring-1 ring-black bg-default-50 text-default-foreground ring-opacity-5 px-5 py-3`}
							>
								<div className="fr justify-between gap-3">
									<div>{t.icon && <>{t.icon}</>}</div>
									<div className="rounded-lg text-sm font-semibold overflow-hidden">
										Try pressing <Kbd keys={['command']}>K</Kbd> or <Kbd keys={['ctrl']}>K</Kbd> to open the palette!
									</div>
								</div>
							</div>
						);
					},
					{
						position: 'bottom-right',
						duration: 5000,
						icon: '⚡️',
					}
				);
		},
	});

	ReactGA.send({ hitType: 'pageview', page: location.pathname });

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fc w-screen h-screen overflow-x-hidden relative select-none text-default-foreground bg-default-50"
		>
			<div className="absolute inset-0  bg-[url(/bg-light.webp)] opacity-60 dark:bg-[url(/bg-dark.webp)] bg-cover bg-no-repeat" />
			<Navbar transparent />
			<div className="max-w-6xl w-full fc relative gap-4 px-10">
				<h1 className="font-inter font-bold fc sm:fr gap-1">
					<motion.svg
						className="sm:h-[clamp(36px,_9vw_,130px)] sm:w-[clamp(36px,_9vw_,130px)] md:h-[130px] w-full h-full dark:stroke-white stroke-black"
						width="90"
						height="81"
						viewBox="0 0 90 81"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.path
							animate={{ pathLength: 1 }}
							initial={{ pathLength: 0 }}
							transition={{
								duration: 2,
								ease: 'easeInOut',
							}}
							d="M0 10.2062V10.2062C8.68276 5.19325 19.7777 7.99117 25.0449 16.5221L58.5 70.7062V70.7062C49.8172 75.7192 38.7223 72.9213 33.4551 64.3904L0 10.2062Z"
							fill="none"
							strokeWidth={4}
							strokeDasharray="0 1"
						/>
						<motion.path
							animate={{ pathLength: 1 }}
							initial={{ pathLength: 0 }}
							transition={{
								duration: 2,
								ease: 'easeInOut',
							}}
							d="M30 10.7021V10.7021C38.6703 5.6963 49.7507 8.52051 54.967 17.0657L75.5 50.7021V50.7021C66.8297 55.7079 55.7493 52.8837 50.533 44.3384L30 10.7021Z"
							fill="none"
							strokeWidth={4}
							strokeDasharray="0 1"
						/>
						<motion.path
							animate={{ pathLength: 1 }}
							initial={{ pathLength: 0 }}
							transition={{
								duration: 2,
								ease: 'easeInOut',
							}}
							d="M66.6063 13.3877C70.7505 6.85852 79.3054 4.75754 86.0027 8.62422L89.6091 10.7064L75.5885 34.9908L66.5381 20.0671C65.2898 18.0085 65.3162 15.4203 66.6063 13.3877V13.3877Z"
							fill="none"
							strokeWidth={4}
							strokeDasharray="0 1"
						/>
					</motion.svg>
					<p className="sm:text-[clamp(36px,_8vw_,130px)] text-lg fr">
						<span className="sm:hidden block">W</span>atchWave
					</p>
				</h1>
				<p className="font-inter text-center text-default-600 max-w-[75ch] text-sm md:text-base">
					WatchWave is a free streaming service that allows you to watch movies and TV shows for free. WatchWave is not responsible for any
					content that you stream.
				</p>
				<form onSubmit={handleSearch} className="w-full max-w-4xl fc sm:fr gap-3">
					<Input size="lg" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
					<Button className="w-full sm:w-auto" variant="shadow" color="primary" type="submit">
						Search
					</Button>
				</form>
			</div>
			<div className="fixed bottom-0 w-screen py-3 px-3 fr gap-2">
				<svg className="w-5 h-auto" xmlns="http://www.w3.org/2000/svg" width="145" height="125" viewBox="0 0 145 125">
					<path
						className="fill-default-600"
						fillRule="evenodd"
						clipRule="evenodd"
						d="M56.0583 56.7265L72.7693 28.9571L95.9812 28.937L56.0312 96.7368L0 0H23.2009L56.0583 56.7265Z"
					/>
					<path
						className="fill-default-600"
						fillRule="evenodd"
						clipRule="evenodd"
						d="M74.3425 0.917236V20.945ZM74.3425 20.945H110.167L61.3707 104.972L72.9712 125L145 0.917236H74.3425"
					/>
				</svg>
				<p className="font-inter text-center text-default-600">
					Curated by <a href="https://lemirq.github.io">Vihaan</a> <span>© {new Date().getFullYear()}</span>
				</p>
			</div>
		</motion.div>
	);
};

export default Home;
