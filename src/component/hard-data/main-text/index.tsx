import { Box, Text } from '@chakra-ui/react';

export const MainText: React.FC = () => {
	return (
		<Box textAlign="center" mt="50px">
			<Text color="colors.BLACK" fontSize="22px" fontWeight="500">
				Мойте автомобиль с выгодой на МОЙ-КА!DS и получайте
			</Text>
			<Text color="colors.PRIMARY_RED" fontSize="22px" fontWeight="500">
				10% кешбэк
			</Text>
			<Text color="colors.BLACK" fontSize="22px" fontWeight="500">
				баллами на вашу карту Лукойла.
			</Text>
		</Box>
	);
};
