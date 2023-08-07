import {
	Box,
	Checkbox,
	Flex,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	border,
} from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomDrawer } from '../../component/drawer';
import { useUser } from '../../context/user-context';
import { Header } from '../../component/header';

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const { sendPhNumber } = useUser();
	const [value, setValue] = useState<any>('');
	const [userChoice, setUserChoise] = useState<boolean>();

	const handleClick = () => {
		sessionStorage.setItem('phone', value);
		sendPhNumber(value);
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
				pb="20%"
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
					<Box mt="50px" width="100%">
						<Text fontWeight="700" fontSize="20px">
							Введите номер телефона
						</Text>
						<InputGroup>
							<InputLeftAddon
								border="0"
								bgColor="colors.WHITE"
								children="+7"
								fontWeight="500"
								pb="2px"
								pr="0px"
							/>
							<Input
								pl="10px"
								variant="flushed"
								type="tel"
								placeholder="000 000 00 00"
								width="100%"
								fontSize="15px"
								fontWeight="500"
								mb="16px"
								pb="0px"
								value={value}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									const input = event.target.value;
									const formatted = formatPhoneNumber(input);
									if (formatted.length <= 13) {
										setValue(formatted);
									}
								}}
							/>
						</InputGroup>
					</Box>
					<OperButton
						title="Получить код"
						onClick={handleClick}
						value={value}
						disabled={value.length === 13 ? false : true}
						switchCarWashType="tel"
					/>
				</Flex>
			</Flex>

			<CustomDrawer
				isOpen={!userChoice}
				isConf={true}
				isCloseOnOverlayClick={false}
				onClose={() => {
					setUserChoise(true);
				}}
			>
				<HStack>
					<Checkbox
						onChange={() => {
							setUserChoise(true);
						}}
					/>
					<Text>Что то про политику конфиденциальности</Text>
				</HStack>
			</CustomDrawer>
		</>
	);
};
