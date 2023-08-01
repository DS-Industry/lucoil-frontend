import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from '@chakra-ui/react';

export const CustomAlert = () => {
	return (
		<>
			<Alert
				w="100vw"
				justifyContent="center"
				flexDir="column"
				status="error"
				ml="16px"
				mr="16px"
				borderRadius="16px"
			>
				<AlertIcon boxSize="40px" mr={0} />
				<AlertTitle fontSize="18px" mt="10px" mr={0}>
					Кажется что-то пошло не так
				</AlertTitle>
				<AlertDescription
					mr={0}
					fontSize="18px"
					fontWeight="500"
					textAlign="center"
				>
					На сервере ведутся работы, приходите позже
				</AlertDescription>
			</Alert>
		</>
	);
};
