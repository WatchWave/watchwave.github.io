import { motion } from 'framer-motion';
import { Divider, Button, Kbd, Switch, Input, Tooltip, Select, SelectItem } from '@nextui-org/react';
import Navigation from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { Selection } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import useRecordAnalytics from '@/hooks/useRecordAnalytics';

const Settings = () => {
	const setDarkMode = (darkMode: Selection) => {
		switch (darkMode.currentKey) {
			case 'light':
				document.documentElement.classList.remove('dark');
				localStorage.theme = 'light';
				setSelectedKeys(new Set(['light']));
				break;
			case 'dark':
				document.documentElement.classList.add('dark');
				localStorage.theme = 'dark';
				setSelectedKeys(new Set(['dark']));
				break;
			case 'system':
				window.matchMedia('(prefers-color-scheme: dark)').matches
					? document.documentElement.classList.add('dark')
					: document.documentElement.classList.remove('dark');
				localStorage.removeItem('theme');
				setSelectedKeys(new Set(['system']));
				break;
			default:
				document.documentElement.classList.remove('dark');
				localStorage.removeItem('theme');
				setSelectedKeys(new Set(['system']));
				break;
		}
	};

	const location = useLocation();
	useRecordAnalytics(location);

	const handleStealthMode = (stealthMode: boolean) => {
		localStorage.stealthMode = stealthMode;
		setStealthMode(stealthMode);
	};

	const handleStealthModeURL = (stealthModeURL: string) => {
		localStorage.stealthModeURL = stealthModeURL;
		setStealthModeURL(stealthModeURL);
	};

	const handlePopups = (popups: boolean) => {
		localStorage.popups = popups;
		setPopups(popups);
	};

	const handleTitleAndFaviconChange = (titleAndFaviconChange: boolean) => {
		localStorage.titleAndFaviconChange = titleAndFaviconChange;
		setTitleAndFavicon(titleAndFaviconChange);
	};

	const [selectedKeys, setSelectedKeys] = useState(new Set([localStorage.theme || 'system']));
	const [stealthMode, setStealthMode] = useState(
		(localStorage.stealthMode === 'true' ? true : false) || (localStorage.stealthMode === undefined && true)
	);
	const [stealthModeURL, setStealthModeURL] = useState(localStorage.stealthModeURL || 'https://google.com/');
	const [popups, setPopups] = useState((localStorage.popups === 'true' ? true : false) || (localStorage.popups === undefined && true));
	const [titleAndFavicon, setTitleAndFavicon] = useState(
		(localStorage.titleAndFaviconChange === 'true' ? true : false) || (localStorage.titleAndFaviconChange === undefined && false)
	);

	useEffect(() => {
		if (stealthModeURL !== undefined) localStorage.stealthModeURL = stealthModeURL;
	}, [stealthModeURL]);

	useEffect(() => {
		localStorage.popups = popups;
	}, [popups]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="w-screen h-screen justify-start fc pt-24 px-5 md:pt-36 overflow-x-hidden bg-background text-default-foreground"
		>
			<Navigation />
			<div className="max-w-4xl w-full fc items-start border rounded-lg sm:p-10 p-5 border-divider gap-5">
				<div className="fc gap-3 items-start">
					<h1 className="text-4xl font-bold text-center">Settings</h1>
				</div>
				<Divider className="mb-5" />
				<div className="fc gap-10 w-full items-start">
					<div className="fc gap-3 w-full items-start">
						<h3 className="text-2xl font-bold">Theme</h3>
						<p>Choose between light, dark, or system theme.</p>
						<Select label="Select a theme" selectedKeys={selectedKeys} onSelectionChange={setDarkMode}>
							<SelectItem textValue="System" key="system" value="system">
								<div className="fr gap-1 justify-start">
									<HiMiniComputerDesktop />
									System
								</div>
							</SelectItem>
							<SelectItem textValue="Light" key="light" value="light">
								<div className="fr gap-1 justify-start">
									<BsFillSunFill />
									Light
								</div>
							</SelectItem>
							<SelectItem textValue="Dark" key="dark" value="dark">
								<div className="fr gap-1 justify-start">
									<BsFillMoonFill /> Dark
								</div>
							</SelectItem>
						</Select>
					</div>

					<div className="fc gap-3 w-full items-start">
						<div className="fr gap-2 w-full justify-between">
							<h3 className="text-2xl font-bold">Stealth Mode</h3>
							<Switch isSelected={stealthMode} onValueChange={handleStealthMode} />
						</div>
						<p>
							When this is enabled, WatchWave will open any URL that you provide when you press <Kbd keys={['shift']}>D</Kbd>, making it
							great for stealthily watching videos in class. This feature is unavailable on mobile.
						</p>
						<div className="w-full fc sm:fr gap-2">
							{!stealthMode ? (
								<Tooltip isDisabled={stealthMode} content="Stealth Mode is disabled, enable it to edit the URL">
									<Input
										value={stealthModeURL}
										onChange={(e) => setStealthModeURL(e.target.value)}
										label="URL to open"
										disabled={!stealthMode}
										classNames={{
											mainWrapper: !stealthMode ? 'cursor-not-allowed' : '',
											base: !stealthMode ? 'cursor-not-allowed' : '',
											input: !stealthMode ? 'cursor-not-allowed' : '',
											label: !stealthMode ? 'cursor-not-allowed' : '',
											helperWrapper: !stealthMode ? 'cursor-not-allowed' : '',
											innerWrapper: !stealthMode ? 'cursor-not-allowed' : '',
											inputWrapper: !stealthMode ? '!cursor-not-allowed' : '',
										}}
										placeholder='URL to open when "Shift + D" is pressed'
									/>
								</Tooltip>
							) : (
								<Input
									value={stealthModeURL}
									onChange={(e) => setStealthModeURL(e.target.value)}
									label="URL to open"
									disabled={!stealthMode}
									placeholder='URL to open when "Shift + D" is pressed'
								/>
							)}
							<Button className="sm:h-full w-full sm:w-auto" onClick={() => handleStealthModeURL('https://google.com/')} variant="flat">
								Reset
							</Button>
						</div>
					</div>
					<div className="fc gap-3 w-full items-start">
						<div className="fr gap-2 w-full justify-between">
							<h3 className="text-2xl font-bold">Popups</h3>
							<Switch isSelected={popups} onValueChange={handlePopups} />
						</div>
						<p>Disable general popups like the one on the homepage.</p>
					</div>
					<div className="fc gap-3 w-full items-start">
						<div className="fr gap-2 w-full justify-between">
							<h3 className="text-2xl font-bold">Title and Favicon Change</h3>
							<Switch isSelected={titleAndFavicon} onValueChange={handleTitleAndFaviconChange} />
						</div>
						<p>
							By default, when you switch to another tab, WatchWave will change the title and favicon to Google Docs in order to
							disguise itself. This could be useful if you are watching videos in class and don't want to get caught. If you don't want
							this to happen, you can disable it here.
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Settings;
