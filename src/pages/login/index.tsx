import { Flex } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import { Header } from '../../component/header';
import { PhoneInput } from '../../component/inputs/phone-input';

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const { sendPhNumber } = useUser();
	const [value, setValue] = useState<any>('');

	const handleClick = () => {
		const phNumber = `+7 ${value}`;
		const correctPhNumber = phNumber.replaceAll(' ', '');
		console.log(correctPhNumber);
		sessionStorage.setItem('phone', correctPhNumber);
		sendPhNumber(phNumber);
		navigate('/verification');
	};

	const formatPhoneNumber = (input: string) => {
		let splitFormatter = input.split('');
		if (
			(input.length === 4 || input.length === 8 || input.length === 11) &&
			splitFormatter[splitFormatter.length - 1] === ' '
		) {
			splitFormatter.pop();
		} else if (
			input.length === 4 ||
			input.length === 8 ||
			input.length === 11
		) {
			splitFormatter.splice(input.length - 1, 0, ' ');
		}
		return splitFormatter.join('');
	};

	return (
		<>
			<Flex
				h="100vh"
				w="100vw"
				flexDir="column"
				justifyContent="flex-start"
				alignItems="center"
			>
				<Header
					fontSize="28px"
					fontWeight="800"
					label="Авторизация"
					flexPos="flex-start"
					paddingLeft="16px"
				/>
				<Flex
					h="100%"
					w="100%"
					flexDir="column"
					justifyContent="space-between"
					paddingInline="16px"
					alignItems="flex-start"
				>
					<PhoneInput
						value={value}
						setValue={setValue}
						formatPhoneNumber={formatPhoneNumber}
					/>
					<OperButton
						title="Далее"
						onClick={handleClick}
						value={value.length === 13 ? value : null}
						disabled={value.length === 13 ? false : true}
						switchCarWashType="tel"
					/>
				</Flex>
			</Flex>
		</>
	);
};
