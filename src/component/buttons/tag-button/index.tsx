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
	carWash: any;
	switchCarWashType: string;
	distance: number;
}

export const TagButton: React.FC<ITagButton> = ({
	distance,
	height,
	fontSize,
	color,
	label,
	bgColor,
	onClick,
	carWash,
}) => {
	const { updateStore } = useOrder();
	const { updateStore: updateCWState } = useCarWash();

	const handleClick = () => {
		console.log('i am here!!!');
		const carWashDistance: any = { ...carWash, distance };
		onClick('bay');
		updateStore({
			carWashId: carWash.id,
		});
		updateCWState({
			carWash: carWashDistance,
		});
		sessionStorage.setItem('carWash', JSON.stringify(carWashDistance));
	};

	return (
		<Button
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
	);
};
