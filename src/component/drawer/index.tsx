import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerBody,
	DrawerHeader,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ICustomDrawer {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export const CustomDrawer: React.FC<ICustomDrawer> = ({
	children,
	isOpen,
	onClose,
}) => {
	return (
		<>
			<Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent borderTopRadius="16px">
					<DrawerCloseButton />
					<DrawerHeader></DrawerHeader>
					<DrawerBody pl="16px" pr="16px">
						{children}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};
