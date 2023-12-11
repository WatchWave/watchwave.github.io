import { HashRouter } from 'react-router-dom';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedRoutes from './AnimatedRoutes';

const App = () => {
	useEffect(() => {
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		if (localStorage.warningCleared === undefined) {
			localStorage.warningCleared = 'false';
		}
		if (localStorage.stealthMode === undefined) localStorage.stealthMode = 'true';
		if (localStorage.popups === undefined) localStorage.popups = 'true';
		if (localStorage.stealthModeURL === undefined) localStorage.stealthModeURL = 'https://www.google.com/';
		if (localStorage.titleAndFaviconChange === undefined) localStorage.titleAndFaviconChange = 'false';

		const focusHandler = () => {
			document.title = 'WatchWave';
			// edit favicon
			const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
			favicon.href = '/favicon.svg';
		};

		const blurHandler = () => {
			document.title = 'Google Docs';
			// edit favicon
			const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
			favicon.href = '/GoogleDocs.png';
		};

		const failSafe = (e: KeyboardEvent) => {
			if (
				e.shiftKey &&
				e.key === 'D' &&
				localStorage.stealthMode === 'true' &&
				document.activeElement?.tagName !== 'INPUT' &&
				document.activeElement?.tagName !== 'TEXTAREA'
			) {
				window.open(localStorage.stealthModeURL);
				document.title = 'Google Docs';
				// edit favicon
				const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
				favicon.href = '/GoogleDocs.png';
			}
		};

		document.addEventListener('visibilitychange', () => {
			if (localStorage.titleAndFaviconChange === 'true') {
				if (document.visibilityState === 'visible') {
					focusHandler();
				} else {
					blurHandler();
				}
			}
		});

		window.addEventListener('keypress', failSafe);

		return () => {
			document.removeEventListener('visibilitychange', () => {
				if (document.visibilityState === 'visible') {
					focusHandler();
				} else {
					blurHandler();
				}
			});
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
