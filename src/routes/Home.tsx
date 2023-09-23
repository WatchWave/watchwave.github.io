import { useStore } from '@/zustandStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const Home = () => {
	const navigate = useNavigate();
	const { search, setSearch } = useStore();
	const handleSearch = () => {
		if (!search) return;
		navigate(`/search/${encodeURI(search).replace('.', '%2E')}`);
	};

	useEffect(() => {
		setSearch('');
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="fc w-screen h-screen overflow-x-hidden relative"
		>
			<div className="absolute inset-0 -z-10 bg-[url(/bg.webp)] bg-cover bg-no-repeat mix-blend-luminosity opacity-[15%]" />
			<Navbar />
			<div className="max-w-6xl w-full fc relative gap-4 px-10">
				<h1 className="font-poppins font-bold text-[clamp(36px,_8vw_,130px)]">WatchWave</h1>
				<p className="font-poppins text-center text-gray-500 max-w-[75ch] text-sm md:text-base">
					WatchWave is a free streaming service that allows you to watch movies and TV shows for free. WatchWave is not responsible for any
					content that you stream.
				</p>
				<form onSubmit={handleSearch} className="w-full max-w-4xl fc sm:fr gap-3">
					<Input className="md:text-xl" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
					<Button className="w-full sm:w-auto md:text-xl" type="submit">
						Search
					</Button>
				</form>
			</div>
			<div className="fixed bottom-0 w-screen py-3 px-3">
				<p className="font-poppins text-center text-gray-500">
					Made by <a href="https://lemirq.github.io">Vihaan</a> <span>© {new Date().getFullYear()}</span>
				</p>
			</div>
		</motion.div>
	);
};

export default Home;
