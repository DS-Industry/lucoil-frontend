import { Flex, Text } from '@chakra-ui/react';

interface IHeader {
	label: string;
}

export const Header: React.FC<IHeader> = ({ label }) => {
	return (
		<Flex h="7vh" bgColor="#F8F8F8" justifyContent="center" alignItems="center">
			<Text fontSize="15px" fontWeight="600" lineHeight="20px">
				{label}
			</Text>
		</Flex>
	);
};
