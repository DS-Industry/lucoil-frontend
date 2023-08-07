import { Button } from '@chakra-ui/react';
import { useOrder } from '../../../context/order-context';
import { useUser } from '../../../context/user-context';

interface IOperButton {
	title: string;
	onClick: any;
	disabled?: boolean;
	value?: string;
	isSum?: boolean;
	isOper?: boolean;
	switchCarWashType?: string;
}

export const OperButton: React.FC<IOperButton> = ({
	isSum = false,
	title,
	onClick,
	disabled,
	value,
	isOper = true,
	switchCarWashType,
}) => {
	const { updateStore } = useOrder();
	const { updateStore: updateUserStore } = useUser();

	const handleClick = () => {
		if (switchCarWashType === 'tel') {
			updateUserStore({
				phNumber: value,
			});
			onClick();
		}
		if (switchCarWashType && switchCarWashType !== 'tel') {
			sessionStorage.setItem('bayNumber', String(value));
			updateStore({
				bayNumber: Number(value),
			});
			if (switchCarWashType === 'bay') {
				onClick('sum');
			} else {
				onClick(switchCarWashType);
			}
		}
		if (isSum) {
			onClick();
			sessionStorage.setItem('sum', String(value));
			updateStore({
				sum: Number(value),
			});
		}

		if (!switchCarWashType && !isSum) {
			onClick();
		}
	};
	return (
		<>
			<Button
				bg="colors.PRIMARY_RED"
				w="100%"
				h="46px"
				borderRadius="4px"
				color="colors.WHITE"
				onClick={handleClick}
				isDisabled={!isOper ? false : value ? disabled : true}
			>
				{title}
			</Button>
		</>
	);
};
