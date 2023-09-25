import { HashRouter } from 'react-router-dom';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedRoutes from './AnimatedRoutes';

const App = () => {
	useEffect(() => {
		const failSafe = (e: KeyboardEvent) => {
			// if ctrl shift d is pressed
			if (e.shiftKey && e.key === 'D') {
				window.open('https://docs.google.com/document/d/1mW3c1kWF0TmfHf-5b98qVDSeDq_9HzTXbramgrBuZyY/edit?usp=sharing');
			}
		};

		window.addEventListener('keypress', failSafe);
		return () => {
			window.removeEventListener('keypress', failSafe);
		};
	}, []);

	return (
		<HashRouter>
			{/* transfer all routes here */}
			<AnimatePresence mode="wait">
				<AnimatedRoutes />
			</AnimatePresence>
		</HashRouter>
	);
};

export default App;
