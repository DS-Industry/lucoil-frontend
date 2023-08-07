import { Flex, Text } from '@chakra-ui/react';

interface IHeader {
	label: string;
	fontSize?: string;
	fontWeight?: string;
	flexPos?: string;
}

export const Header: React.FC<IHeader> = ({
	label,
	fontSize = '15px',
	fontWeight = '600',
	flexPos = 'center',
}) => {
	return (
		<Flex
			h="7vh"
			w="100%"
			bgColor="#F8F8F8"
			justifyContent={flexPos}
			alignItems="center"
		>
			<Text fontSize={fontSize} fontWeight={fontWeight} lineHeight="20px">
				{label}
			</Text>
		</Flex>
	);
};
