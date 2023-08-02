import { Flex, Input, Text } from '@chakra-ui/react';
import { useUser } from '../../context/user-context';
import { OperButton } from '../../component/buttons/oper_button';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

export const VerificationPage = () => {
	const navigate = useNavigate();
	const { user, sendCode } = useUser();
	const [value, setValue] = useState<string>('');

	const handleClick = () => {
		sendCode(value);
		if (!user?.isLoading) {
			navigate('/home');
		}
	};

	return (
		<>
			<Flex
				h="100vh"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Text>Введите код</Text>
				<Input
					value={value}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						setValue(event.target.value);
					}}
				/>
				<OperButton
					title="Подтвердить"
					onClick={handleClick}
					value={value}
					disabled={false}
				/>
			</Flex>
		</>
	);
};
