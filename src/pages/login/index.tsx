import {
	Box,
	Checkbox,
	Flex,
	HStack,
	Input,
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
	const [value, setValue] = useState<string>('');
	const [userChoice, setUserChoise] = useState<boolean>();

	const handleClick = () => {
		const correctPhone = `+7${value.slice(1)}`;
		sessionStorage.setItem('phone', correctPhone);
		sendPhNumber(correctPhone);
		navigate('/verification');
	};
	return (
		<>
			<Flex
				h="100vh"
				w="100vw"
				flexDir="column"
				justifyContent="flex-start"
				alignItems="center"
				paddingInline="16px"
				pb="10%"
			>
				<Header
					fontSize="28px"
					fontWeight="800"
					label="Авторизация"
					flexPos="flex-start"
				/>
				<Flex
					h="100%"
					w="100%"
					flexDir="column"
					justifyContent="space-between"
					alignItems="flex-start"
				>
					<Box mt="50px" width="100%">
						<Text fontWeight="700" fontSize="20px">
							Введите номер телефона
						</Text>
						<Input
							variant="flushed"
							type="tel"
							placeholder="+7 000 000 00 00"
							width="100%"
							mb="16px"
							value={value}
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								setValue(event.target.value);
							}}
						/>
					</Box>
					<OperButton
						title="Получить код"
						onClick={handleClick}
						value={value}
						disabled={value.length === 11 ? false : true}
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
