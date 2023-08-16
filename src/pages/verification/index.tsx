import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { useUser } from '../../context/user-context';
import { OperButton } from '../../component/buttons/oper_button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../../component/header';
import { VerificationList } from '../../component/inputs/varification-input-list';

interface IVerificationCode {
	firstN: string;
	secondN: string;
	thirdN: string;
	fourthN: string;
}

export const VerificationPage = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { user, sendCode, sendPhNumber } = useUser();
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
	const [code, setCode] = useState<IVerificationCode>({
		firstN: '',
		secondN: '',
		thirdN: '',
		fourthN: '',
	});
	const phNumber = sessionStorage.getItem('phone');

	// send OTP code to phone number

	const handleClick = () => {
		if (phNumber) {
			setIsButtonDisabled(true);
			sendPhNumber(user && user.phNumber ? user.phNumber : phNumber);
		}
	};

	// seind user OTP input

	useEffect(() => {
		if (code.firstN && code.secondN && code.thirdN && code.fourthN) {
			const result = Object.values(code).join('');
			sendCode(result);
		}
	}, [code.firstN, code.secondN, code.thirdN, code.fourthN]);

	// check OTP verification

	useEffect(() => {
		console.log('this is user token', user.token);
		if (user.token === 'success') {
			navigate('/home');
		} else if (user.token === 'error') {
			setCode({
				firstN: '',
				secondN: '',
				thirdN: '',
				fourthN: '',
			});
			toast({
				containerStyle: {
					marginTop: 'none',
					width: '100vw',
				},
				position: 'top',
				title: 'Ошибка',
				variant: 'subtle',
				description: 'Неверный код',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		}
	}, [user.token]);

	// disabled button timer use effect

	useEffect(() => {
		if (isButtonDisabled) {
			setTimeout(() => {
				setIsButtonDisabled(false);
			}, 50000);
		}
	}, [isButtonDisabled]);

	return (
		<Box h="100vh">
			<Header
				fontSize="28px"
				fontWeight="800"
				label="Авторизация"
				flexPos="flex-start"
				paddingLeft="16px"
			/>
			<Flex
				h="93%"
				flexDirection="column"
				justifyContent="space-between"
				alignItems="flex-start"
				pt="50px"
				pl="16px"
				pr="16px"
			>
				<Box>
					<Text fontSize="20px" fontWeight="700">
						Введите код из СМС
					</Text>
					<Text fontSize="15px" color="#C7C7CB" fontWeight="500" mb="30px">
						Код направлен на {user.phNumber ? user.phNumber : phNumber}
					</Text>

					<VerificationList code={code} setCode={setCode} />

					<Text fontSize="15px" color="#C7C7CB" fontWeight="500" mt="30px">
						Если код не придет, можно получить новый через 50 сек.
					</Text>
				</Box>
				<Box w="100%" pl="12px" pr="12px">
					<OperButton
						title="Получить код"
						onClick={handleClick}
						disabled={isButtonDisabled}
					/>
				</Box>
			</Flex>
		</Box>
	);
};
