import 'react-cmdk/dist/cmdk.css';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/zustandStore';

const Palette = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();
	const { popups, setPopups } = useStore();

	useEffect(() => {
		setSearch('');
	}, [open]);

	useEffect(() => {
		// add cmd p shortcut
		document.addEventListener('keydown', (e) => {
			if (e.metaKey && e.key === 'k') {
				e.preventDefault();
				setOpen(true);
			}
		});

		// remove cmd p shortcut
		return () => {
			document.removeEventListener('keydown', (e) => {
				if (e.metaKey && e.key === 'k') {
					e.preventDefault();
					setOpen(true);
				}
			});
		};
	}, []);

	const filteredItems = filterItems(
		[
			{
				heading: 'Pages',
				id: 'pages',
				items: [
					{
						id: 'home',
						children: 'Home',
						href: '#',
						icon: 'HomeIcon',
						onClick: () => {
							navigate(`/`);
						},
					},
					{
						id: 'search',
						children: 'Search',
						href: '#',
						icon: 'MagnifyingGlassIcon',
						onClick: () => {
							navigate(`/search/${encodeURI(search).replace('.', '%2E')}`);
						},
					},
					{
						id: 'vihaan',
						children: "Vihaan's Website",
						icon: 'GlobeAltIcon',
						href: 'https://lemirq.github.io/',
					},
				],
			},
			{
				heading: 'Settings',
				id: 'settings',
				items: [
					{
						id: 'turnoffpopups',
						children: 'Toggle Popups',
						icon: 'EyeIcon',
						onClick: () => {
							setPopups(!popups);
						},
					},
					{
						id: 'toggletheme',
						children: 'Toggle Theme',
						icon: 'MoonIcon',
						onClick: () => {
							localStorage.setItem('vite-ui-theme', localStorage.getItem('vite-ui-theme') === 'dark' ? 'light' : 'dark');
							document.documentElement.classList.remove(localStorage.getItem('vite-ui-theme') === 'dark' ? 'light' : 'dark');
							document.documentElement.classList.add(localStorage.getItem('vite-ui-theme') === 'dark' ? 'dark' : 'light');
						},
					},
				],
			},
			{
				heading: 'Tips',
				id: 'tips',
				items: [
					{
						id: 'tip1',
						children: 'Keep typing to search for a movie or tv show!',
						icon: 'BoltIcon',
						onClick: () => {
							setSearch('Replace this with a movie or tv show! Then press enter to search!');
						},
						closeOnSelect: false,
					},
				],
			},
		],
		search
	);

	return (
		<CommandPalette onChangeSearch={setSearch} onChangeOpen={setOpen} search={search} isOpen={open} page="root">
			<CommandPalette.Page id="root">
				{filteredItems.length ? (
					filteredItems.map((list) => (
						<CommandPalette.List key={list.id} heading={list.heading}>
							{list.items.map(({ id, ...rest }) => (
								<CommandPalette.ListItem key={id} index={getItemIndex(filteredItems, id)} {...rest} />
							))}
						</CommandPalette.List>
					))
				) : (
					<CommandPalette.FreeSearchAction onClick={() => navigate(`/search/${encodeURI(search).replace('.', '%2E')}`)} />
				)}
			</CommandPalette.Page>
		</CommandPalette>
	);
};

export default Palette;
