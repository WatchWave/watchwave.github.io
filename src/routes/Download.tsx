import Navigation from '@/components/Navbar';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiSolidLock } from 'react-icons/bi';
import { HiDesktopComputer } from 'react-icons/hi';
import { RxValueNone } from 'react-icons/rx';
import { DiLinux } from 'react-icons/di';
import { FaApple } from 'react-icons/fa';
import { SiWindows } from 'react-icons/si';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import { BsChevronDown } from 'react-icons/bs';

const Download = () => {
	const [os, setOs] = useState('Not known');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const getOperatingSystem = () => {
		let operatingSystem = 'Not known';
		if (window.navigator.appVersion.indexOf('Win') !== -1) {
			operatingSystem = 'Windows';
		}
		if (window.navigator.appVersion.indexOf('Mac') !== -1) {
			operatingSystem = 'MacOS';
		}
		if (window.navigator.appVersion.indexOf('X11') !== -1) {
			operatingSystem = 'UNIX OS';
		}
		if (window.navigator.appVersion.indexOf('Linux') !== -1) {
			operatingSystem = 'Linux';
		}
		setOs(operatingSystem);
	};

	useEffect(() => {
		getOperatingSystem();
	}, []);

	const getFeature = (feature: string, description: string, icon: JSX.Element) => {
		return (
			<>
				<motion.li
					className="p-3 sm:flex hidden sm:p-5 gap-3 rounded-2xl w-full h-full bg-foreground-100 fc justify-start items-start text-5xl text-secondary"
					variants={children}
				>
					<div>{icon}</div>
					<div className="fc gap-2 items-start">
						<p className="text-xl text-foreground">{feature}</p>
						<p className="text-base sm:text-xl text-foreground-400">{description}</p>
					</div>
				</motion.li>
				<motion.li
					className="p-4 sm:hidden sm:p-5 gap-3 rounded-xl w-full h-full bg-foreground-100 fr justify-between items-start text-5xl text-secondary"
					variants={children}
				>
					<div className="fc gap-2 items-start">
						<p className="text-xl text-foreground">{feature}</p>
						<p className="text-base sm:text-xl text-foreground-400">{description}</p>
					</div>
					{icon}
				</motion.li>
			</>
		);
	};

	const container = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
				duration: 1,
				delayChildren: 0,
			},
		},
	};

	const children = {
		hidden: { opacity: 0, y: 100, scale: 0.5 },
		show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1 } },
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fc w-screen h-screen overflow-x-hidden relative select-none text-default-foreground bg-background font-inter"
		>
			<Navigation />
			<div className="w-full h-full overflow-hidden justify-start fc gap-10 max-w-8xl pt-36 px-5">
				<div className="fc gap-3 max-w-6xl">
					<motion.h1
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 100 }}
						transition={{ duration: 1 }}
						className="text-4xl md:text-9xl font-bold tracking-tighter"
					>
						WatchWave
					</motion.h1>
					<div className="md:fr fc gap-4 justify-between md:gap-16">
						<motion.p
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 100 }}
							transition={{ duration: 1, delay: 0.5 }}
							className="text-xl sm:text-2xl md:text-4xl font-medium text-default-500 tracking-tighter"
						>
							...as a desktop app
						</motion.p>

						<Modal scrollBehavior="inside" size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} className="z-10">
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="flex flex-col gap-1">Instructions for Installation</ModalHeader>
										<ModalBody>
											<div className="w-full h-full fc gap-10">
												<p className="w-full text-danger ">
													Please read these instructions carefully before installing WatchWave.
												</p>
												<div className="w-full fr justify-start items-start gap-3">
													<div className="text-2xl fc w-14 font-bold border-2 border-secondary rounded-full aspect-square">
														1
													</div>
													<div className="w-full fc gap-2 items-start">
														<p className="text-xl">Download the app</p>
														<p className="text-base text-foreground-400">Click the button below to download the app.</p>
														<button
															className={`px-4 py-2 rounded-2xl bg-transparent border-secondary border-2 sm:text-xl md:text-xl hover:bg-secondary transition-colors hover:text-white outline-none my-4`}
														>
															<a
																href="https://github.com/WatchWave/watchwave.github.io/raw/main/releases/WatchWave.dmg?download="
																download
																className="fr gap-2 w-full h-full"
																target="_blank"
															>
																<FaApple /> Download for MacOS
															</a>
														</button>
														<video src="/dl/Step1.mp4" className="rounded-xl w-full" autoPlay loop />
													</div>
												</div>
												<div className="w-full fr justify-start items-start gap-3">
													<div className="text-2xl fc w-14 font-bold border-2 border-secondary rounded-full aspect-square">
														2
													</div>
													<div className="w-full fc gap-2 items-start">
														<p className="text-xl">Download the app</p>
														<p>Open Terminal and enter the following command to download the app. </p>
														<code className="p-1 bg-default-200 border-2 rounded-xl border-default-200 my-4">
															<p>sudo spctl --global-disable</p>
															<p>xattr -cr /Applications/WatchWave.app</p>
															<p>sudo spctl --global-enable</p>
														</code>
														<video src="/dl/Step2.mp4" className="rounded-xl w-full" autoPlay loop />
													</div>
												</div>
												<div className="w-full fr justify-start items-start gap-3">
													<div className="w-full fc gap-2 items-start p-4 border-secondary border-2 rounded-3xl">
														<h1 className="text-2xl">Why do I have to do all that?</h1>
														<p>
															Apple is very greedy and wants me to pay $100 a year to be able to sign my apps. I'm not
															going to do that.
														</p>
														<a href="https://www.buymeacoffee.com/sharmavihaan" target="_blank">
															<img
																src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
																alt="Buy Me A Coffee"
																className="w-40 h-10"
															/>
														</a>
													</div>
												</div>
											</div>
										</ModalBody>
										<ModalFooter>
											<Button color="secondary" onPress={onClose}>
												Ok
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
						<Dropdown>
							<DropdownTrigger>
								<motion.button
									initial={{ opacity: 0, y: 100 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 100 }}
									transition={{ duration: 1, delay: 1 }}
									className={`px-4 py-2 rounded-2xl bg-transparent border-secondary border-2 fr gap-2 sm:text-xl md:text-2xl font-black hover:bg-secondary transition-colors hover:text-white outline-none`}
								>
									Download {os !== 'Not known' ? `for ${os}` : ''} <BsChevronDown className="inline" />
								</motion.button>
							</DropdownTrigger>
							<DropdownMenu aria-label="Static Actions" disabledKeys={['win', 'linux']}>
								<DropdownItem key="mac">
									<div className="fr justify-start gap-2" onClick={onOpen}>
										<FaApple /> Download for MacOS
									</div>
								</DropdownItem>
								<DropdownItem key="win">
									<div className="fr justify-start gap-2">
										<SiWindows /> Not available for Windows... yet
									</div>
								</DropdownItem>
								<DropdownItem key="linux">
									<div className="fr justify-start gap-2">
										<DiLinux /> Not available for Linux... yet
									</div>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				<motion.ul
					className="w-full grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-3 max-w-6xl"
					variants={container}
					initial="hidden"
					animate="show"
				>
					{getFeature('Ad-Free Experience', 'Enjoy uninterrupted browsing with our built-in adblocker.', <RxValueNone />)}
					{getFeature('Lightning-Fast Performance', 'Experience lightning-fast browsing with our native app.', <HiDesktopComputer />)}
					{getFeature(
						'Enhanced Stealth Mode',
						'Protect your privacy with our improved stealth mode that minimizes your window.',
						<BiSolidLock />
					)}
				</motion.ul>
				<div
					className="w-full max-w-7xl app-img-c fc items-start"
					style={{
						perspective: 'var(--perspective)',
					}}
				>
					{/* 3000px perspective */}
					<motion.img
						initial={{ opacity: 0, y: 100, filter: 'blur(20px)' }}
						animate={{
							opacity: 1,
							filter: 'blur(0px)',
							transform: 'rotateX(var(--rotateX)) matrix(1, 0, 0, 1, 0, 0)',
						}}
						exit={{ opacity: 0, y: 100, filter: 'blur(20px)' }}
						transition={{ duration: 1, delay: 2.5 }}
						src="/App.png"
						alt="App"
						className="w-full h-full rounded-xl app-img shadow-2xl object-cover"
					/>
				</div>
			</div>
		</motion.div>
	);
};
export default Download;
