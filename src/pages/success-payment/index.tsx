import { MdError } from 'react-icons/md';
import { Flex, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Header } from '../../component/header';

export const SuccessPaymentPage = () => {
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
				<CheckCircleIcon boxSize="80px" color="green.500" mb="20px" />
				<Text fontSize="22px" fontWeight="600">
					Оплата произведена успешно!
				</Text>
			</Flex>
		</>
	);
};
