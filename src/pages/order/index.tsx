import { useEffect } from 'react';
import { CarWashMap } from '../../component/car-wash/car-wash-map-item';
import { useOrder } from '../../context/order-context';
import { Flex, Text } from '@chakra-ui/react';
import { OperButton } from '../../component/buttons/oper_button';
import { useCarWash } from '../../context/carwash-context';

export const OrderPage: React.FC = () => {
	const { store } = useOrder();
	const { store: carWashStore } = useCarWash();
	useEffect(() => {}, []);

	const handleClick = () => {
		console.log(store);
	};

	return (
		<>
			{' '}
			<Flex
				flexDirection="column"
				justifyContent="space-between"
				h="100vh"
				p="28px"
			>
				<CarWashMap
					id={String(store.sum)}
					title={carWashStore.carWash.name ? carWashStore.carWash.name : ''}
					openTime="24часа"
					address={
						carWashStore.carWash.address ? carWashStore.carWash.address : ''
					}
					distance={100}
					isDisabled={true}
				/>
				<></>
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
		</>
	);
};
