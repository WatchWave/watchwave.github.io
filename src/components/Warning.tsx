import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Link, useDisclosure, Tooltip } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Warning() {
	const { isOpen, onOpenChange, onClose } = useDisclosure({
		defaultOpen: true,
	});

	const [time, setTime] = useState(5);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setTime(time - 1);
		}, 1000);
		if (time === 0) {
			clearTimeout(timeout);
		}
	}, [time]);

	const closeModal = () => {
		if (time === 0) {
			localStorage.warningCleared = 'true';
			onClose();
		}
	};
	return (
		<>
			<Modal backdrop="blur" placement="center" isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<>
						<ModalHeader className="flex flex-col gap-1">Use Ad Blocker</ModalHeader>
						<ModalBody>
							<p>
								It is <b>highly</b> recommended that you use an ad blocker such as{' '}
								<Link showAnchorIcon isExternal href="https://github.com/gorhill/uBlock#readme">
									Ublock Origin
								</Link>{' '}
								while watching videos on WatchWave. There are spammy ads on the video players, which are out of our control and can't
								be disabled. Using an ad blocker is an easy solution to get rid of the ads on the video players.
								<br />
								<br />
								Click OK to close this popup permanently.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button color={time === 0 ? 'primary' : 'default'} onClick={closeModal} variant={time === 0 ? 'solid' : 'bordered'}>
								Ok{time !== 0 && ` (${time})`}
							</Button>
						</ModalFooter>
					</>
				</ModalContent>
			</Modal>
		</>
	);
}
