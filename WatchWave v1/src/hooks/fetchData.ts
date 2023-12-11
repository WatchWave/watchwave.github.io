const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
	},
};

import { SetStateAction } from 'react';

import { keywordsProps } from '@/types';

export const fetchData = (query: string, action: (response: any) => void) => {
	fetch(query, options)
		.then((response) => response.json())
		.then((response) => {
			action(response);
		})
		.catch((err) => console.error(err));
};
