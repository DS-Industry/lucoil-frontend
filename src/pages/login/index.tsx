import { Checkbox, Flex, HStack, Input, Text } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomDrawer } from '../../component/drawer';
import { useUser } from '../../context/user-context';

export const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const { sendPhNumber } = useUser();
	const [value, setValue] = useState<string>('');
	const [userChoice, setUserChoise] = useState<boolean>();

	const handleClick = () => {
		sendPhNumber(value);
		navigate('/verification');
	};
	return (
		<>
			<Flex
				h="100vh"
				flexDir="column"
				justifyContent="center"
				alignItems="center"
				paddingInline="16px"
			>
				<Text>Пожалуйста введите номер телефона</Text>
				<Input
					mb="16px"
					type="number"
					value={value}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						setValue(event.target.value);
					}}
				/>
				<OperButton
					title="Получить код"
					onClick={handleClick}
					value={value}
					disabled={value.length === 11 ? false : true}
					switchCarWashType="tel"
				/>
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
