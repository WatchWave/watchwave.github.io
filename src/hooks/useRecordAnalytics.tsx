import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const useRecordAnalytics = (location) => {
	useEffect(() => {
		ReactGA.send({ hitType: 'pageview', page: location.pathname, title: document.title });
	}, [location]);
};

export default useRecordAnalytics;
