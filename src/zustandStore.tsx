import { create } from 'zustand';

interface AppState {
	search: string;
	setSearch: (search: string) => void;
	searchResults: unknown;
	setSearchResults: (searchResults: unknown) => void;
	episode: number | null;
	setEpisode: (episode: number | null) => void;
	season: number | null;
	setSeason: (season: number | null) => void;
}

export const useStore = create<AppState>((set) => ({
	search: '',
	setSearch: (search: string) => set({ search }),
	searchResults: {},
	setSearchResults: (searchResults: unknown) => set({ searchResults }),
	episode: null,
	setEpisode: (episode) => set({ episode }),
	season: null,
	setSeason: (season) => set({ season }),
}));
