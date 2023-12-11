import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Link as NLink } from '@nextui-org/react';

import { useEffect, useState } from 'react';
import { Checkbox } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function Warning() {
	const { isOpen, onOpenChange, onClose } = useDisclosure({
		defaultOpen: true,
	});

	const [time, setTime] = useState(5);
	const [understand, setUnderstand] = useState(false);

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
			{localStorage.warningCleared === 'true' ? (
				<></>
			) : (
				<Modal
					classNames={{
						closeButton: 'hidden',
					}}
					backdrop="blur"
					placement="center"
					isDismissable={false}
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						<>
							<ModalHeader className="flex flex-col gap-1">Use Ad Blocker</ModalHeader>
							<ModalBody>
								<p>
									It is <b>highly</b> recommended that you use an ad blocker such as{' '}
									<NLink showAnchorIcon isExternal href="https://github.com/gorhill/uBlock#readme">
										Ublock Origin
									</NLink>{' '}
									while watching videos on WatchWave. There are spammy ads on the video players, which are out of our control and
									can't be disabled. Using an ad blocker is an easy solution to get rid of the ads on the video players. We also
									recommend the{' '}
									<NLink
										onClick={() => {
											onClose();
										}}
										as={Link}
										to="/download"
									>
										official desktop app
									</NLink>{' '}
									for WatchWave, which is absolutely ad-free (Only available for MacOS currently).
								</p>
								<br />
								<Checkbox isSelected={understand} onValueChange={setUnderstand} size="md">
									I confirm that I have read the message above and I am using an ad blocker.
								</Checkbox>
							</ModalBody>
							<ModalFooter>
								<Button
									color={time === 0 && understand ? 'primary' : 'default'}
									onClick={closeModal}
									disabled={!understand}
									className="disabled:opacity-50 disabled:cursor-not-allowed"
									variant={time === 0 && understand ? 'solid' : 'bordered'}
								>
									Ok{time !== 0 && ` (${time})`}
								</Button>
							</ModalFooter>
						</>
					</ModalContent>
				</Modal>
			)}
		</>
	);
}
