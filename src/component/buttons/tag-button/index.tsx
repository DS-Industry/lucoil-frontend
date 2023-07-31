import { Button } from '@chakra-ui/react';
import { useOrder } from '../../../context/order-context';
import { useCarWash } from '../../../context/carwash-context';

interface ITagButton {
	height: string;
	fontSize: string;
	bgColor: string;
	color: string;
	label: string;
	onClick?: any;
	disabled: boolean;
	carWash: any;
	distance: number;
	switchCarWashType: string;
}

export const TagButton: React.FC<ITagButton> = ({
	disabled,
	switchCarWashType,
	height,
	fontSize,
	color,
	label,
	bgColor,
	onClick,
	carWash,
	distance,
}) => {
	const { updateStore } = useOrder();
	const { updateStore: updateCWState } = useCarWash();

	const handleClick = () => {
		onClick(switchCarWashType);
		updateStore({
			carWashId: carWash.id,
		});
		updateCWState({
			carWash,
		});
	};

	return (
		<>
			<Button
				isDisabled={disabled}
				display="flex"
				w="100%"
				h={height}
				paddingTop="10px"
				paddingBottom="10px"
				borderRadius="4px"
				bg={bgColor}
				fontWeight="600"
				fontSize={fontSize}
				color={color}
				onClick={handleClick}
			>
				{label}
			</Button>
		</>
	);
};
