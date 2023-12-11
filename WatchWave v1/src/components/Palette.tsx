import '@/cmdk.css';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Palette = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

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
						icon: 'HomeIcon',
						onClick: () => {
							navigate(`/`);
						},
					},
					{
						id: 'search',
						children: 'Search',
						icon: 'MagnifyingGlassIcon',
						onClick: () => {
							navigate(`/search/${encodeURI(search).replace('.', '%2E')}`);
						},
					},
					{
						id: 'settings',
						children: 'Settings',
						icon: 'Cog6ToothIcon',
						onClick: () => {
							navigate(`/settings`);
						},
					},
					{
						id: 'vihaan',
						children: "Vihaan's Website",
						href: 'https://lemirq.github.io/',
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
							{list.items.map(({ id, ...rest }) =>
								id === 'vihaan' ? (
									<CommandPalette.ListItem
										key={id}
										index={getItemIndex(filteredItems, id)}
										{...rest}
										target="_blank"
										rel="noopener noreferrer"
									>
										<svg className="w-5 h-auto" xmlns="http://www.w3.org/2000/svg" width="145" height="125" viewBox="0 0 145 125">
											<path
												className="fill-gray-500"
												fillRule="evenodd"
												clipRule="evenodd"
												d="M56.0583 56.7265L72.7693 28.9571L95.9812 28.937L56.0312 96.7368L0 0H23.2009L56.0583 56.7265Z"
											/>
											<path
												className="fill-gray-500"
												fillRule="evenodd"
												clipRule="evenodd"
												d="M74.3425 0.917236V20.945ZM74.3425 20.945H110.167L61.3707 104.972L72.9712 125L145 0.917236H74.3425"
											/>
										</svg>
										<p>{rest.children}</p>
									</CommandPalette.ListItem>
								) : (
									<CommandPalette.ListItem key={id} index={getItemIndex(filteredItems, id)} {...rest} />
								)
							)}
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
