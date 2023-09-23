import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useStore } from '@/zustandStore';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTgwN2Q4MmE5ZGY4Y2MyN2Y4ZGNiMjEzNTg4MWEyOSIsInN1YiI6IjY1MGNkZDk4ZjkyNTMyMDBhZGUwYzViMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EZ5L6kv4NcM_1dLl7ewmQ7kkxJ1Q3d1zYU89WaviOoA`,
//     },
// };

// fetch(
//     `https://api.themoviedb.org/3/search/movie?query=${query.toLowerCase().replace(' ', '%20')}&include_adult=false&language=en-US&page=1`,
//     options
// )
//     .then((response) => response.json())
//     .then((response) => setSearchResults(response))
//     .catch((err) => console.error(err));

export const useFetchData = (url: string, query: string) => {
	const { setSearchResults } = useStore();

	const { data, isLoading, isError, error } = useQuery(
		['data', url],
		() =>
			fetch(
				`https://api.themoviedb.org/3/search/movie?query=${query
					.toLowerCase()
					.replace(' ', '%20')}&include_adult=false&language=en-US&page=1`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
					},
				}
			)
				.then((res) => res.json())
				.then((res) => setSearchResults(res))
				.catch((err) => console.error(err)),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: false,
		}
	);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return { data, isLoading, isError, error };
};
