import { WarningIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { Header } from '../../component/header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../context/order-context';

export const ErrorPaymentPage: React.FC = () => {
	const navigate = useNavigate();
	const { updateStore } = useOrder();
	useEffect(() => {
		updateStore({
			paymentId: null,
			paymentTocken: null,
			carWashId: null,
			bayNumber: null,
			sum: null,
		});
		sessionStorage.removeItem('carWash');
		setTimeout(() => {
			navigate('/home');
		}, 3000);
	}, []);
	return (
		<>
			<Header label="Статус оплаты" />
			<Flex
				w="100vw"
				h="80vh"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<WarningIcon boxSize="80px" color="red.500" mb="20px" />
				<Text fontSize="22px" fontWeight="600">
					Что-то пошло не так...
				</Text>
			</Flex>
		</>
	);
};
