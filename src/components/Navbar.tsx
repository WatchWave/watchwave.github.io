import { useState } from 'react';
import Logo from './Logo';
import { Link as RLink, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Link } from '@nextui-org/react';

const Navigation = ({ transparent }: { transparent?: boolean }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const menuItems = [
		{
			name: 'Home',
			to: '/',
		},
		{
			name: 'Search',
			to: '/search',
		},
		{
			name: 'Settings',
			to: '/settings',
		},
	];

	return (
		<Navbar
			shouldHideOnScroll
			classNames={{
				base: `z-50 justify-between fixed top-0 h-16 shadow-sm font-inter w-screen backdrop-blur-2xl sm:px-16 ${
					transparent ? 'bg-transparent' : ''
				}`,
				wrapper: 'max-w-full',
			}}
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent>
				<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
				<RLink to="/">
					<NavbarBrand>
						<Logo className="h-10" />
						<p className="font-bold text-inherit">WatchWave</p>
					</NavbarBrand>
				</RLink>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex sm:gap-10" justify="center">
				<NavbarItem isActive={location.pathname === '/'}>
					<Link as={RLink} to="/" color="foreground">
						Home
					</Link>
				</NavbarItem>
				<NavbarItem isActive={location.pathname === '/search'}>
					<Link as={RLink} to="/search" color="foreground">
						Search
					</Link>
				</NavbarItem>
				<NavbarItem isActive={location.pathname === '/settings'}>
					<Link as={RLink} to="/settings" color="foreground">
						Settings
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu className="bg-background/20">
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link as={RLink} color="foreground" className="w-full" isBlock to={item.to} size="lg">
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
		// <nav
		// 	className="fr z-50 justify-between fixed top-0 h-16 bg-[hsl(var(--secondary))]/70 shadow-sm font-inter w-screen backdrop-blur-2xl backdrop-filter"
		// 	role="navigation"
		// >
		// 	<Link aria-label="home" to="/" className="pl-8">
		// 		<Logo className="h-10" />
		// 	</Link>
		// 	<div className="pr-8 fr gap-3">
		// 		<Link aria-label="home" to="/" className="p-4">
		// 			Home
		// 		</Link>
		// 		<Link aria-label="search" to="/search" className="p-4">
		// 			Search
		// 		</Link>
		// 	</div>
		// </nav>
	);
};

export default Navigation;
