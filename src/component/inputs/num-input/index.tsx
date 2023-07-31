import { Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { OperButton } from '../../buttons/oper_button';

interface INumInput {
	label: string;
	isBay?: boolean;
	isSum?: boolean;
	onClick?: any;
	minValue: number;
	maxValue: number;
	nameMessage: string;
}

export const NumInput: React.FC<INumInput> = ({
	label,
	nameMessage,
	isBay,
	onClick,
	minValue,
	maxValue,
	isSum,
}) => {
	const minValueMessage = `${nameMessage} должна быть не менее ${minValue}`;
	const maxValueMessage = `${nameMessage} должна быть не более ${maxValue}`;

	const [value, setValue] = useState<string>('');
	const [messageSwitch, setMessageSwitch] = useState<number>(0);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		console.log(event.target.value);
		if (Number(event.target.value) < minValue) {
			setMessageSwitch(1);
		} else {
			if (Number(event.target.value) > maxValue) {
				setMessageSwitch(2);
			} else {
				setMessageSwitch(0);
			}
		}
	};

	return (
		<>
			<Text
				fontSize="20px"
				fontWeight="700"
				w="100%"
				textAlign="center"
				lineHeight="20px"
			>
				{label}
			</Text>

			{messageSwitch !== 0 && (
				<Text color="colors.PRIMARY_RED" fontSize="12px">
					{messageSwitch === 1 ? minValueMessage : maxValueMessage}
				</Text>
			)}
			<Input
				textAlign="center"
				value={value}
				onChange={handleChange}
				mt="10px"
				mb="10px"
				w="100%"
				variant="unstyled"
				fontWeight="700"
				bg="colors.WHITE"
				h="60px"
				fontSize="60px"
				type="number"
			/>
			<OperButton
				isBay={isBay}
				isSum={isSum}
				disabled={messageSwitch === 1 || messageSwitch === 2 ? true : false}
				onClick={onClick}
				value={value}
				title="Далее"
			/>
		</>
	);
};
