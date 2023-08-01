import { CarWashMap } from '../../component/car-wash/car-wash-map-item';
import { useOrder } from '../../context/order-context';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { useCarWash } from '../../context/carwash-context';
import { TagInfo } from '../../component/tag-info';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const OrderPage: React.FC = () => {
	const navigate = useNavigate();
	const { store } = useOrder();
	const { store: carWashStore } = useCarWash();

	const handleClick = () => {
		console.log(store);
	};

	useEffect(() => {
		if (!carWashStore.carWash) {
			navigate('/home');
		}
	}, []);

	return (
		<Flex
			boxSizing="border-box"
			flexDirection="column"
			justifyContent="space-between"
			h="100vh"
			w="100vw"
			p="28px"
		>
			<Flex flexDirection="column">
				<CarWashMap
					id={String(store.sum)}
					title={carWashStore.carWash ? carWashStore.carWash.name : ''}
					openTime="24часа"
					address={carWashStore.carWash ? carWashStore.carWash.address : ''}
					distance={carWashStore.carWash ? carWashStore.carWash.distance : ''}
					isDisabled={true}
				/>
				<Text pt="30px" fontSize="15px" fontWeight="700">
					Пост
				</Text>
				<Box w="30%">
					<TagInfo
						label={String(store.bayNumber) ? String(store.bayNumber) : '1'}
						bgColor="colors.PRIMARY_RED"
						color="colors.WHITE"
						fontSize="14px"
						height="20px"
					/>
				</Box>
				<Text pt="30px" fontSize="15px" fontWeight="700">
					Кэшбек на карту Лукойл
				</Text>
				<Box w="30%">
					<TagInfo
						label="10 %"
						bgColor="colors.PRIMARY_RED"
						color="colors.WHITE"
						fontSize="14px"
						height="20px"
					/>
				</Box>
				<HStack w="80vw">
					<Text pt="36px" fontSize="15px" fontWeight="400">
						Карта программы лояльности
						<Text
							as="span"
							color="colors.PRIMARY_RED"
							ml="5px"
							fontSize="15px"
							fontWeight="700"
							letterSpacing="2px"
						>
							ЛУКОЙЛ
						</Text>
						:
					</Text>
				</HStack>
				<Box mt="11px" fontWeight="500">
					<TagInfo
						label={store.partnerCard ? store.partnerCard : 'partner card'}
						bgColor="colors.WHITE_GRAY"
						color="colors.BLACK"
						fontSize="14px"
						height="20px"
						fontWeight="500"
					/>
				</Box>
			</Flex>
			<Flex flexDirection="inherit" justifyContent="center">
				<Text w="100%" textAlign="center" fontSize="48px" fontWeight="700">
					{store.sum} ₽
				</Text>
				<OperButton
					title="Оплатить"
					onClick={handleClick}
					disabled={false}
					isOper={false}
				/>
			</Flex>
		</Flex>
	);
};
