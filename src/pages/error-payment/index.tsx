import { WarningIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { Header } from '../../component/header';

export const ErrorPaymentPage: React.FC = () => {
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
