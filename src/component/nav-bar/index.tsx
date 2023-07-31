import { Button, Flex } from '@chakra-ui/react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/list');
	};

	return (
		<>
			<Flex h="12%" w="100%" bg="white" pl="16px" pr="16px" alignItems="center">
				<Flex justifyContent="center" w="100%">
					<Button
						justifyContent="flex-start"
						leftIcon={<FaMagnifyingGlass />}
						w="100%"
						h="36px"
						onClick={handleClick}
						bgColor="#EBEBEC"
						color="#828286"
						borderRadius="8px"
					>
						Поиск
					</Button>
				</Flex>
			</Flex>
		</>
	);
};
