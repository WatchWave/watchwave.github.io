import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { ThemeProvider } from '@/components/theme-provider';
import ReactGA from 'react-ga4';
ReactGA.initialize('G-K71VRETLRW');
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NextUIProvider id="theme" className="bg-background text-default-foreground">
			<App />
		</NextUIProvider>
	</React.StrictMode>
);
