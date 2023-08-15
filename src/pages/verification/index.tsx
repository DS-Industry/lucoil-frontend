import { Box, Flex, Text } from '@chakra-ui/react';
import { useUser } from '../../context/user-context';
import { OperButton } from '../../component/buttons/oper_button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../../component/header';
import { CustomDrawer } from '../../component/drawer';
import { PersonalData } from '../../component/personal-data';
import { VerificationList } from '../../component/inputs/varification-input-list';

interface IVerificationCode {
	firstN: string;
	secondN: string;
	thirdN: string;
	fourthN: string;
}

export const VerificationPage = () => {
	const navigate = useNavigate();
	const { user, sendCode, sendPhNumber } = useUser();
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [code, setCode] = useState<IVerificationCode>({
		firstN: '',
		secondN: '',
		thirdN: '',
		fourthN: '',
	});
	const phNumber = sessionStorage.getItem('phone');

	const handleClick = () => {
		if (phNumber) {
			setIsDisabled(true);
			sendPhNumber(user && user.phNumber ? user.phNumber : phNumber);
		}
	};

	const hadnleRegistrationClick = () => {
		const result = Object.values(code).join('');
		sendCode(result);
		console.log('here');
		if (phNumber) {
			navigate('/home');
		}
	};

	/* 	useEffect(() => {
		if (user.verification) {
			console.log('here');
			setCode({
				firstN: '',
				secondN: '',
				thirdN: '',
				fourthN: '',
			});
			 			if (user.verification) {
				navigate('/home');
			} 
		}
	}, [user.verification]); */

	useEffect(() => {
		if (isDisabled) {
			setTimeout(() => {
				setIsDisabled(false);
			}, 50000);
		}
	}, [isDisabled]);

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
				pb="64px"
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
						disabled={isDisabled}
					/>
				</Box>

				<CustomDrawer
					isOpen={
						code.firstN && code.secondN && code.thirdN && code.fourthN
							? true
							: false
					}
					isConf={false}
					isCloseOnOverlayClick={true}
					onClose={() => {
						setCode({
							firstN: '',
							secondN: '',
							thirdN: '',
							fourthN: '',
						});
					}}
				>
					<PersonalData hadnleRegistrationClick={hadnleRegistrationClick} />
				</CustomDrawer>
			</Flex>
		</Box>
	);
};
