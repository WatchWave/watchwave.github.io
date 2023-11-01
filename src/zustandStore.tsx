import { create } from 'zustand';
import { SearchResultsProps } from './types';

interface AppState {
	search: string;
	setSearch: (search: string) => void;
	searchResults: SearchResultsProps | null;
	setSearchResults: (searchResults: SearchResultsProps | null) => void;
	episode: number | null;
	setEpisode: (episode: number | null) => void;
	season: number | null;
	setSeason: (season: number | null) => void;
	popups: boolean;
	setPopups: (popups: boolean) => void;
	warningCleared: boolean;
	setWarningCleared: (warningCleared: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
	search: '',
	setSearch: (search: string) => set({ search }),
	searchResults: null,
	setSearchResults: (searchResults: SearchResultsProps | null) => set({ searchResults }),
	episode: null,
	setEpisode: (episode) => set({ episode }),
	season: null,
	setSeason: (season) => set({ season }),
	popups: true,
	setPopups: (popups) => set({ popups }),
	warningCleared: false,
	setWarningCleared: (warningCleared: boolean) => set({ warningCleared }),
}));
