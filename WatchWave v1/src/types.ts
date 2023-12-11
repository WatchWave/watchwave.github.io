export interface SearchResultProps {
	adult: boolean;
	backdrop_path: string | null;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	title: string;
	poster_path: string | null;
	media_type: 'tv' | 'movie' | 'person';
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

export interface recommendationProps {
	original_name: string;
	adult: boolean;
	backdrop_path: string | null;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: 'tv' | 'movie' | 'person';
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface tvRecommendationProps {
	adult: boolean;
	backdrop_path: string | null;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string | null;
	media_type: 'tv' | 'movie' | 'person';
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

export interface episodeProps {
	air_date: string;
	episode_number: number;
	episode_type: string;
	id: number;
	name: string;
	overview: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
	crew: object[];
	guest_stars: object[];
}

export interface seasonsProps {
	[key: string]: {
		episodes: episodeProps[];
	};
}

export interface detailsProps {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: object;
	budget: number;
	genres: genresProps[];
	homepage: string;
	id: number;
	imdb_id: string;
	name: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: object[];
	production_countries: object[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: object[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface creditsProps {
	cast: castProps[];
	crew: object[];
	id: number;
}

export interface castProps {
	adult: boolean;
	gender: 1 | 2;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	credit_id: string;
	department: string;
	job: string;
}

export interface keywordProps {
	id: number;
	name: string;
}

export interface keywordsProps {
	id: number;
	keywords?: keywordProps[];
	results?: keywordProps[];
}

export interface genresProps {
	id: number;
	name: string;
}

export interface recommendationsProps {
	page: number;
	results: recommendationProps[];
	total_pages: number;
	total_results: number;
}
export interface tvRecommendationsProps {
	page: number;
	results: tvRecommendationProps[];
	total_pages: number;
	total_results: number;
}

export interface SearchResultsProps {
	page: number;
	results: SearchResultProps[];
	total_pages: number;
	total_results: number;
}

export interface reviewsProps {
	id: number;
	results: reviewProps[];
	page: number;
	total_pages: number;
	total_results: number;
}

export interface reviewProps {
	author: string;
	author_details: {
		name: string;
		username: string;
		avatar_path: string;
		rating: number;
	};
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}

export interface videosProps {
	id: number;
	results: videoProps[];
}

export interface videoProps {
	id: string;
	iso_639_1: string;
	iso_3166_1: string;
	key: string;
	name: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
}

// {
//     "adult": false,
//     "backdrop_path": "/H6j5smdpRqP9a8UnhWp6zfl0SC.jpg",
//     "genre_ids": [
//         28,
//         878,
//         12
//     ],
//     "id": 565770,
//     "original_language": "en",
//     "original_title": "Blue Beetle",
//     "overview": "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
//     "popularity": 1973.926,
//     "poster_path": "/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
//     "release_date": "2023-08-16",
//     "title": "Blue Beetle",
//     "video": false,
//     "vote_average": 7.1,
//     "vote_count": 646
// }

export interface suggestionProps {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface suggestionsProps {
	date?: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: suggestionProps[];
	total_pages: number;
	total_results: number;
}

interface Creator {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string | null;
}

export interface Genre {
	id: number;
	name: string;
}

export interface Network {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface Season {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	season_number: number;
	vote_average: number;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface Episode {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	episode_type: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string | null;
}

export interface TVShow {
	adult: boolean;
	backdrop_path: string;
	created_by: Creator[];
	episode_run_time: number[];
	first_air_date: string;
	genres: Genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: Episode;
	name: string;
	next_episode_to_air: null;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	seasons: Season[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

export interface ActorProps {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: string | null;
	gender: number;
	homepage: string | null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string | null;
}

export interface ActorCreditsProps {
	id: number;
	cast: castProps[];
	crew: crewProps[];
}

export interface crewProps {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	media_type: 'movie' | 'tv';
}

export interface MovieProps {
	original_name?: string;
	title?: string;
	adult?: boolean;
	backdrop_path?: string | null;
	id: number;
	original_language: string;
	original_title?: string;
	overview: string;
	poster_path?: string | null;
	media_type?: 'tv' | 'movie' | 'person';
	genre_ids: number[];
	popularity: number;
	first_air_date?: string;
	release_date?: string;
	video?: boolean;
	vote_average: number;
	vote_count: number;
	origin_country?: string[];
}
